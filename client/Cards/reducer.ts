import { CardState, Card } from '../../types/Card'
import { Action } from './actions/types'

const initState: CardState = {
    card: null,
    cards: null,
    filter: '',
    playing: false,
}

const cards = (state: CardState = initState, action: Action): CardState => {
    switch (action.type) {
        case 'ADD_CARD':
            {
                return Object.assign({}, state, { card: new Card() })
            }
        case 'VIEW_CARD':
            {
                return Object.assign({}, state, { card: Object.assign({}, action.card) })
            }
        case 'EDIT_CARD':
            {
                return Object.assign({}, state, { card: Object.assign({}, action.card) })
            }
        case 'CARD_LIST':
            return Object.assign({}, state, {
                cards: sort(action.cards),
                filter: action.filter,
            })
        case 'DELETE_CARD':
            {
                var index = state.cards.findIndex((card: Card) => card.id == action.id)
                if (index == -1) return state
                state.cards.splice(index, 1)
                return Object.assign({}, state, { cards: sort(state.cards) })
            }
        case 'CARD_SAVED':
            {
                var card = action.card
                var index = state.cards.findIndex((c: Card) => c.id == card.id)
                if (index > -1) {
                    state.cards.splice(index, 1)
                }

                state.cards.push(card)
                return Object.assign({}, state, { cards: sort(state.cards) })
            }
        case 'GOT_DATA_FOR_WORD':
            {
                return Object.assign({}, state, { card: action.card })
            }
        case 'PLAY':
            {
                return Object.assign({}, state, { playing: action.on })
            }
        case 'ROUTE_CHANGE': {
            if (action.path.match(/\/cards\/view/))
                return state
            return Object.assign({}, state, { playing: false })
        }
        default:
            ((x: never) => x)(action)
            return state
    }
}

var sort = (cards: Array<Card>) =>
    cards.sort((a: Card, b: Card) => strcmp(a.word, b.word))

var strcmp = (a: string, b: string) => a < b ? -1 : +(a > b)

export default cards