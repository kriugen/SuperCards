import { Id } from './'
import { SmallText, LargeText } from '../server/meta'
import * as Meta from '../server/meta'

export class Card implements Id {
    id: number
    word: string = ''
    transcription: string = ''
    translation: string = ''
    samples: string = ''
    image: string = ''
    sound: string = ''

    user_id: number
    url: string
    dt_learned: any
    p1: number
    p2: number

    [prop: string]: string | number | boolean | Function

    static meta = {
            word: { length: SmallText, required: true },
            transcription: { length: SmallText },
            translation: { length: LargeText },
            samples: { length: LargeText },
            image: { length: LargeText },
            sound: { length: LargeText },
    }

    //required for react controlled form inputs
    static nullToEmpty(card: Card) {
        if (!card) return null
        for (var prop in Card.meta) {
            if (!card[prop]) {
                card[prop] = ''
            }
        }

        return card
    }

    static validate(card: Card): string[] {
        return Meta.validate(card, Card.meta)
    }
}

export interface CardState {
    card: Card,
    cards: Array<Card>,
    filter: string,
    playing: boolean,
}
