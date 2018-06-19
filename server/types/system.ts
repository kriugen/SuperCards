import * as express from 'express'

export interface Session {
    destroy: () => void,
}

export interface Request<S = Session> extends express.Request {
    body: Object,
    session?: S,
}

export interface Response extends express.Response {
}

type Callback = (req: Request, res: Response) => void
type Verb = (url: string, cb: Callback) => void
export interface Server {
    get: Verb,
    post: Verb,
    delete: Verb,
}