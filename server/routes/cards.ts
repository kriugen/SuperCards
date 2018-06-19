import { Server } from '../types/system'
import * as cardHandlers from '../handlers/cards'

export const cards = (app: Server) => {
    app.get('/card/:id', cardHandlers.getCard)
    app.get('/cards/:filter?', cardHandlers.getCards)
    app.post('/card', cardHandlers.saveCard)
    app.get('/card/learned/:id/:learned', cardHandlers.cardLearned)
    app.delete('/card/:id', cardHandlers.deleteCard)
    app.get('/data/:word', cardHandlers.getDataForWord)
    app.get('/user', cardHandlers.getUser)
    app.get('/profile', cardHandlers.getProfile)
    app.post('/profile', cardHandlers.saveProfile)
    app.get('/search/:word', cardHandlers.search)
}