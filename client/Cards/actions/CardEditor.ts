import ProgressRequest from './ProgressRequest'
import { getCard } from '../../db'
import { Card } from '../../../types/Card'
import { viewCard, gotoUrl } from './common'

export default class CardEditor extends ProgressRequest {
    id: number
    constructor(id: number) {
        super()
        this.id = id
    }

    request() {
        return getCard(this.id)
    }

    success(card: Card) {
        this.dispatch(viewCard(card))
        gotoUrl('/cards/edit/' + card.id)
    }
}