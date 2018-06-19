import { Login, Signup } from '../../types/Auth'
import { Request, Response } from '../types/custom'

import * as security from '../utils/security'

import * as db from '../db'
import { handle, AppError } from '../utils/error'
import { IncorrectCredentials } from '../res'

export const signup = (req: Request, res: Response) => {
    try {
    var signup = req.body as Signup

    var errors = Signup.validate(signup)
        if (errors.length > 0)
            throw new AppError(`Errors while validating signup information`, errors)

    const hashAndSalt = security.hashPassword(signup.password)
    Object.assign(signup, hashAndSalt)
    delete (signup.password)

    db.insert('users', signup)
        .then((id: number) => res.json({ id }))
        .catch((e: Error) => {
            let err = e
            if ((e as any).code == 'ER_DUP_ENTRY') {
                let message = 'Duplicate user data'
                if (e.message.indexOf('name_UNIQUE') > 0) {
                    message = 'User name already exists'
                } else if (e.message.indexOf('email_UNIQUE') > 0) {
                    message = 'Email is already used'
                }
                err = new AppError(message)
            }
            handle(res, err) })
    } catch (e) {

        handle(res, e)
    }
}

export const login = (req: Request, res: Response) => {
    try {
        var login = req.body as Login

        var errors = Login.validate(login)
        if (errors.length > 0)
            throw new AppError(`Errors while validating login information`, errors)

        db.select('SELECT id, password_hash, salt FROM users WHERE name='
            + db.escape(login.name))
            .then((users: Array<security.UserSecurityInfo>) => {
                if (users.length == 0) {
                    throw new AppError(IncorrectCredentials)
                }

                if (users.length > 1) {
                    throw `More then one user with name ${login.name} found`
                }

                var user = users[0]
                if (security.verifyPassword(user, login.password)) {
                    req.session.user_id = user.id
                    res.json({ id: user.id, name: login.name })
                } else {
                    throw new AppError(IncorrectCredentials)
                }
            })
            .catch((e: Error) => handle(res, e))
    } catch (e) {
        handle(res, e)
    }
}

export const logout = (req: Request, res: Response) => {
    req.session.destroy()
    res.json('ok')
}
