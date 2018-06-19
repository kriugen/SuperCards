import { Card } from '../../../types/Card'
import { Action } from './types'
import { browserHistory } from 'react-router'

export const gotoUrl = (url: string) => {
    var loc = browserHistory.getCurrentLocation()
        if (loc.pathname != url)
            browserHistory.push(url)
}

export const viewCard = (card: Card): Action => {
    return {
        type: 'VIEW_CARD',
        card,
    }
}

export const cardList = (cards: Array<Card>, filter: string = ''): Action => {
    return {
        type: 'CARD_LIST',
        cards: cards.filter(card => card.word),
        filter,
    }
}
