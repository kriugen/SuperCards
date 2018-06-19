import * as db from '../database/util'
import { Card } from '../types/Card'
import { addDays } from '../database/common'

export async function run() {
    console.log('[repeat_cards]')
    try {
        let cards = await db.query('SELECT * FROM cards WHERE dt_learned IS NOT NULL') as Card[]
        for (let i = 0; i < cards.length; ++i) {
            let card = cards[i]
            let next = card.p1 + card.p2

            let nextDate = addDays(new Date(card.dt_learned), next)
            let now = new Date()
            if (nextDate < now) {
                let query = `UPDATE cards SET p1 = p2, p2 = ${next}, dt_learned=null 
                WHERE id=${card.id}`
                await db.query(query)
            }
        }
    } catch (e) {
        console.error(e)
    }

    console.log('[/repeat_cards]')
}

