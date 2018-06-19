import { Request, Response } from '../types/custom'
import { Card } from '../../types/Card'
import { User } from '../../types/Auth'
import { Profile } from '../../types/Profile'

import * as db from '../db'
import { toInt } from '../utils'
import { handle, AppError } from '../utils/error'

export const search = (req: Request, res: Response) => {
    var sql = `SELECT id, word, translation
                FROM cards WHERE user_id=${req.session.user_id} 
                AND word=` + db.escape(req.params.word)
    db.select(sql)
        .then((data: Array<Card>) => {
            send(res, data)
        })
        .catch((e: any) => handle(res, e))
}

var addFilter = (filter: string, sql: string) => {
    if (filter) {
        sql += ` AND dt_learned is` + (filter == 'learned' ? ' not ' : ' ') + 'null'
    }

    return sql
}

export const getCards = (req: Request, res: Response) => {
    var user_id = db.escape(req.session.user_id)
    var filter = req.params.filter
    var sql = addFilter(filter, `
                SELECT cards.id, cards.word FROM cards
                WHERE user_id=${user_id}`)

    db.select(sql)
        .then((rows: Array<Card>) => send(res, rows))
        .catch((e: any) => handle(res, e))
}

export const cardLearned = (req: Request, res: Response) => {
    var card_id = toInt(req.params.id)
    var user_id = req.session.user_id
    var learned = req.params.learned

    var dt_learned: string = null
    if (learned == 'true') {
        var dateTime = new Date().toISOString()
        dt_learned = db.escape(dateTime, 'dt_learned')
    }

    var sql = `UPDATE cards SET dt_learned= ${dt_learned} 
                WHERE id= ${card_id} AND user_id= ${user_id}`

    db.query(sql)
        .then(() => {
            send(res, { dt_learned })
        })
        .catch((e: any) => handle(res, e))
}

export const saveCard = (req: Request, res: Response) => {
    var card = req.body as Card
    try {
        if (card.id && (card.user_id != req.session.user_id))
            throw new AppError('Access denied. Card is owned by somebody else.')
        var errors = Card.validate(card)
        if (errors.length > 0)
            throw new AppError(`Errors while validating Card`, errors)

        if (card.id) {
            db.update('cards', card)
                .then(() => send(res, card))
                .catch(e => handle(res, e))
            return
        }

        card.user_id = req.session.user_id
        db.insert('cards', card)
            .then((id: number) => {
                card.id = id
                send(res, card)
            })
            .catch(e => handle(res, e))

    } catch (e) {
        handle(res, e)
    }
}

export const getCard = (req: Request, res: Response) => {
    var card_id = toInt(req.params.id)
    var sql = `SELECT *
    FROM cards WHERE id=${card_id} 
    AND user_id=${req.session.user_id}`
    db.selectOne(sql)
        .then((card: Card) => {
            send(res, card)
        })
        .catch((e: any) => handle(res, e))
}

export const getUser = (req: Request, res: Response) => {
    db.selectOne('SELECT id, name FROM users WHERE id='
        + db.escape(req.session.user_id))
        .then((user: User) => send(res, user))
        .catch((e: any) => handle(res, e))
}

export const saveProfile = (req: Request, res: Response) => {
    var profile = req.body as Profile
    
    db.update('users', profile)
    .then(() => send(res, 'ok'))
    .catch(e => handle(res, e))
}

export const getProfile = (req: Request, res: Response) => {
    var user_id = db.escape(req.session.user_id)
    db.selectOne(`SELECT id, name, email FROM users WHERE id= ${user_id} `)
        .then((profile: Profile) => {
            send(res, profile)
        })
        .catch((e: any) => handle(res, e))
}

export const deleteCard = (req: Request, res: Response) => {
    let id = toInt(req.params.id)
    db.query(`DELETE FROM cards WHERE id=${id} AND user_id=${req.session.user_id}`)
        .then(() => send(res, id))
        .catch((e: any) => handle(res, e))
}

import * as parser from '../utils/cambridge'
export const getDataForWord = (req: Request, res: Response) => {
    parser.getData(req.params.word)
        .then((card: Card) => {
            send(res, card)
        })
        .catch((e: any) => handle(res, e))
}

var send = (res: Response, data: any) => {
    //setTimeout(() => res.json(data), 1000)
    res.json(data)
}