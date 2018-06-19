import { Id } from './'
import * as Meta from '../server/meta'
import { SmallText } from '../server/meta'

export class Login {
    name: string
    password: string

    static meta = {
        name: { length: SmallText, required: true },
        password: { length: SmallText, required: true },
    }

    static validate(login: Login): string[] {
        return Meta.validate(login, Login.meta)
    }
}

export class Signup extends Login {
    email: string

    //better be named meta, but ts complains
    static signup_meta = {
        email: {
            length: SmallText, required: true, validator: (email: string) => {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(email)
            }
        }
    }

    static validate(signup: Signup): string[] {
        let errors = Meta.validate(signup, Login.meta)
        return errors.concat(Meta.validate(signup, Signup.signup_meta))
    }
}

export interface User extends Id {
    name: string,
    export_file_name: string,
}

export interface AuthState {
    user: User
}