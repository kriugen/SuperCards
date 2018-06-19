import ProgressRequest from './ProgressRequest'
import { deleteCard } from '../../db'
import { Card } from '../../../types/Card'
import { gotoUrl } from './common'

export default class CardDeleter extends ProgressRequest {
    card: Card
    constructor(card: Card) {
        super()
        this.card = card
    }

    request() {
        return deleteCard(this.card)
    }

    success(id: number) {
        this.dispatch({ type: 'DELETE_CARD', id })
        let filter = this.state.cards.filter
        let url = '/cards' + (filter && `/${filter}`)
        gotoUrl(url)
    }
}