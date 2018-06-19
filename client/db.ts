import * as request from 'superagent'
import { browserHistory } from 'react-router'
import { Login, Signup } from '../types/Auth'
import { Profile } from '../types/Profile'
import { Card } from '../types/Card'

var config = require('config')

const host = config.serverUrl
const api = `${host}/api`

export const login = (data: Login) => {
    return request
        .post(`${host}/login`)
        .send(data)
        .withCredentials()
        .then(res => {
            return res.body
        })
        .catch(e => handle(e))
}

export const signup = (data: Signup) => {
    return request
        .post(`${host}/signup`)
        .withCredentials()
        .send(data)
        .catch(e => handle(e))
}

export const logout = () => {
    return request
        .get(`${host}/logout`)
        .withCredentials()
        .catch(e => handle(e))
}

export const getUser = () => {
    return request
        .get(`${api}/user`)
        .withCredentials()
        .then(res => {
            return res.body
        })
        .catch(e => handle(e))
}

export const saveProfile = (profile: Profile) => {
    return request
    .post(`${api}/profile`)
    .send(profile)
    .withCredentials()
    .then(res => res.body)
    .catch(e => handle(e))
}

export const getProfile = () => {
    return request
        .get(`${api}/profile`)
        .withCredentials()
        .then(res => {
            return res.body
        })
        .catch(e => handle(e))
}


export const search = (word: string) => {
    return request
        .get(`${api}/search/${word}`)
        .withCredentials()
        .then(res => {
            return res.body
        })
        .catch(e => handle(e))
}

export const getDataForCard = (card: Card) => {
    return request
        .get(`${api}/data/${card.word}`)
        .withCredentials()
        .then(res => {
            return Object.assign(card, res.body)
        })
        .catch(e => handle(e))
}

export const getCard = (id: number) => {
    return request
        .get(`${api}/card/${id}`)
        .withCredentials()
        .then((res): Card => {
            return res.body
        })
        .catch(e => handle(e))
}

export const getCards = (filter: string) => {
    return request
        .get(`${api}/cards/${filter}`)
        .withCredentials()
        .then(res => {
            return { cards: res.body, filter }
        })
        .catch(e => {
            handle(e)
        })
}

export const cardTake = (card: Card, take: boolean) => {
    return request
        .get(`${api}/card/take/${card.id}/${take}`)
        .withCredentials()
        .then(res => {
            return res.body
        })
        .catch(e => handle(e))
}

export const cardLearned = (id: number, learned: boolean) => {
    var param = learned ? 'true' : 'false'
    return request
        .get(`${api}/card/learned/${id}/${param}`)
        .withCredentials()
        .then(res => {
            return res.body
        })
        .catch(e => handle(e))
}

export const saveCard = (card: Card) => {
    return request
        .post(`${api}/card`)
        .send(card)
        .withCredentials()
        .then(res => res.body)
        .catch(e => handle(e))
}

export const deleteCard = (card: Card) => {
    return request
        .delete(`${api}/card/${card.id}`)
        .withCredentials()
        .then(res => res.body)
        .catch(e => handle(e))
}

function handle(error: Response) {
    const Unauthorized = 401
    if (error.status == Unauthorized) {
        browserHistory.push('/login')
    }
    throw error
}
