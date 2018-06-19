import ProgressRequest from './ProgressRequest'
import { getCard } from '../../db'
import { Card } from '../../../types/Card'
import { viewCard, gotoUrl } from './common'

export default class CardFetcher extends ProgressRequest {
    id: number
    constructor(id: number) {
        super()
        this.id = id
    }

    before() {
        var currentCard = this.state.cards.card
        if (currentCard && currentCard.id == this.id) {
            gotoUrl(`/cards/view/${this.id}`)
            return false
        }

        if (this.chained)
            return true

        return super.before()
    }

    request() {
        return getCard(this.id)
    }

    success(card: Card) {
        this.dispatch(viewCard(card))
        gotoUrl('/cards/view/' + card.id)
    }
}