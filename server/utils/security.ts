var crypto = require('crypto')

export interface UserSecurityInfo {
    id: number,
    password_hash: string,
    salt: string,
}

export const hashPassword = (password: string) => {
    const salt = generateSalt(16)
    const password_hash = createHash(password, salt)

    return {
        salt,
        password_hash,
    }
}

export const verifyPassword = (user: UserSecurityInfo, enteredPassword: string) => {
    const { password_hash, salt } = user
    return password_hash == createHash(enteredPassword, salt)
}

var generateSalt = (length: number) => {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
}

var createHash = (str: string, salt: string) => {
    var hash = crypto.createHmac('sha512', salt)
    hash.update(str)
    return hash.digest('hex')
}