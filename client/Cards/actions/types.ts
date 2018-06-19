import { State } from '../../../types/State'
import { Card } from '../../../types/Card'
import * as common from '../../Common/actions'

export type Action = { type: 'ADD_CARD' }
    | { type: 'EDIT_CARD', card: Card }
    | { type: 'DELETE_CARD', id: number }
    | { type: 'CARD_SAVED', card: Card }
    | { type: 'VIEW_CARD', card: Card }
    | { type: 'CARD_LIST', cards: Array<Card>, filter?: string }
    | { type: 'GOT_DATA_FOR_WORD', card: Card }
    | { type: 'PLAY', on: boolean }
    | { type: 'ROUTE_CHANGE', path: string }

export type Dispatch = (param: Action | Dispatch | common.Action
    , getState?: () => State) => any