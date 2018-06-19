import * as db from '../db'
import { Card } from '../../types/Card'
import * as common from '../Common/actions'

export type Action = {
    type: 'SEARCH',
    data: {
        word: string,
        cards: Array<Card>
    }
}

type Dispatch = (param: Action | Dispatch | common.Action) => any

export const search = (word: string) => {
    return (dispatch: Dispatch) => {
        db.search(word)
            .then(cards => {
                if (cards)
                    dispatch(searchAction(word, cards))
            })
            .catch(e => dispatch(common.error(e)))
    }
}

const searchAction = (word: string, cards: Array<Card>): Action => {
    return {
        type: 'SEARCH',
        data: { word, cards },
    }
}