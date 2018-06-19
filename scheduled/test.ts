import * as db from '../database/util'
import * as repeat_cards from './repeat_cards'
import { dt_escape, addDays } from '../database/common'
import { Card } from '../types/Card'

export const test = async () => {
    console.log('[SCHEDULED TEST]')

    try {
        await db.cleanup()
        await repeat_cards_test()
    } catch (e) {
        console.error(e)
    }

    console.log('[/SCHEDULED TEST]')
}

async function repeat_cards_test() {
    await db.query("INSERT INTO users (name, email, password_hash, salt) VALUES ('test', 'email', '', '')")
    let date = new Date()
    let dt1 = dt_escape(date.toISOString())
    await db.query("INSERT INTO cards (user_id) VALUES ('1')")
    await db.query(`INSERT INTO cards (user_id, dt_learned) VALUES ('1', '${dt1}')`)
    
    let dt2 = dt_escape(addDays(date, -4).toISOString())

    await db.query(`INSERT INTO cards (user_id, dt_learned) VALUES ('1', '${dt2}')`)

    await repeat_cards.run()

    let cards = await db.query("SELECT * FROM cards") as Card[]
    let card1 = cards[0]
    console.log('unlearned card should not change')
    expect(null, card1.dt_learned)
    expect(1, card1.p1)
    expect(2, card1.p2)

    let card2 = cards[1]
    console.log('recently learned card should not change')
    expect(dt1, dt_escape(new Date(card2.dt_learned).toISOString()))
    expect(1, card2.p1)
    expect(2, card2.p2)

    let card3 = cards[2]
    console.log('old card should be reset to unlearned and counters updated to next fibo number')
    expect(null, card3.dt_learned)
    expect(2, card3.p1)
    expect(3, card3.p2)
}

function expect(exp: any, act: any) {
    let res = `expected: ${exp}  actual: ${act}`
    if (exp == act) {
        console.log('OK')
    } else {
        console.log('FAIL', res)
    }
}
