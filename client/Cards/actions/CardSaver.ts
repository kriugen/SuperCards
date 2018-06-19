import ProgressRequest from './ProgressRequest'
import { saveCard } from '../../db'
import { Card } from '../../../types/Card'
import { viewCard, gotoUrl } from './common'

export default class CardSaver extends ProgressRequest {
    card: Card
    constructor(card: Card) {
        super()
        this.card = card
    }

    request() {
        return saveCard(this.card)
    }

    success(card: Card) {
        this.dispatch({ type: 'CARD_SAVED', card })
        this.dispatch(viewCard(card))
        gotoUrl(`/cards/view/${card.id}`)
    }
}