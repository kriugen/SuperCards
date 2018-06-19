import ProgressRequest from './ProgressRequest'
import { getDataForCard } from '../../db'
import { Card } from '../../../types/Card'

export default class WordDataGetter extends ProgressRequest {
    card: Card
    constructor(card: Card) {
        super()
        this.card = card
    }

    request() {
        return getDataForCard(this.card)
    }

    success(card: Card) {
        this.dispatch({ type: 'GOT_DATA_FOR_WORD', card })
    }
}