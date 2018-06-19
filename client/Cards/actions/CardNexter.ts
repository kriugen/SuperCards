import ProgressRequest from './ProgressRequest'
import { getCards } from '../../db'
import { Card } from '../../../types/Card'
import { CallbackDone } from '../../../types'

export default class CardNexter extends ProgressRequest {
    done: CallbackDone
    fetchCard: Function
    nextCardId: number

    constructor(fetchCard: Function) {
        super()
        this.fetchCard = fetchCard
    }

    request() {
        return getCards('new')
    }

    after(success: boolean) {
        if (!success) {
            super.after(false)
            return
        }

        if (this.nextCardId)
            this.dispatch(this.fetchCard(this.nextCardId, true, this.done))
        else 
            super.after(true)
    }

    success(result: { cards: Array<Card>, filter: string }) {
        const { cards } = result
        if (!cards) return
            
        let currentCard = this.state.cards.card

        var indexOfCurrentCard = cards.findIndex(card => card.id == currentCard.id)
        if (indexOfCurrentCard > -1) {
            cards.splice(indexOfCurrentCard, 1)
        }

        if (cards.length == 0) {
            return
        }

        var nextCardIndex = Math.floor(Math.random() * cards.length)
        this.nextCardId = cards[nextCardIndex].id
    }
}