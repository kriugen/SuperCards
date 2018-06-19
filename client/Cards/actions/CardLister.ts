import ProgressRequest from './ProgressRequest'
import { getCards } from '../../db'
import { Card } from '../../../types/Card'
import { cardList, gotoUrl } from './common'

export default class CardLister extends ProgressRequest {
    filter?: string
    constructor(filter?: string) {
        super()
        this.filter = filter
    }

    request() {
        let filter = (this.filter == undefined)
        ? this.state.cards.filter
        : this.filter 
        return getCards(filter)
    }

    success(result: { cards: Array<Card>, filter: string }) {
        const { cards, filter } = result
        this.dispatch(cardList(cards, filter))
        let url = '/cards' + (filter && `/${filter}`)
        gotoUrl(url)
    }
}