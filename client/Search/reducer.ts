import { Action } from './actions'
import { Card } from '../../types/Card'

interface State {
    word: string,
    cards: Array<Card>,
}

const search = (state: State = {
    word: '',
    cards: [],
}, action: Action) => {
    return action.type == 'SEARCH'
        ? Object.assign({}, action.data)
        : state
}

export default search