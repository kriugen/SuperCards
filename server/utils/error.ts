import { Response } from '../types/custom'
import log from '../logger'

export class AppError implements Error {
    name = 'AppError'
    message: string //server only info
    errors?: string[]
    stack?: string

    constructor(message: string, errors?: string[]) {
        this.message = message
        this.errors = errors
    }
}

export const handle = (res: Response, e: AppError) => {
    log.error(e)
    if (e.name == 'AppError') {
        res.status(400).json(e)
    } else {
        res.status(500).send('Error')
    }
}