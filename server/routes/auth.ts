import { Server } from '../types/system'
import * as authHandlers from '../handlers/auth'

export const auth = (app: Server) => {
    app.post('/signup', authHandlers.signup)
    app.post('/login', authHandlers.login)
    app.get('/logout', authHandlers.logout)
}
