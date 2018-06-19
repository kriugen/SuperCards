import ProgressRequest from './ProgressRequest'
import { cardLearned } from '../../db'
import { Card } from '../../../types/Card'
import { CallbackDone } from '../../../types'
import { viewCard } from './common'
type ActionCall = (chained?: boolean, done?: CallbackDone) => any

export default class CardLearner extends ProgressRequest {
    learned: boolean
    cardNext: ActionCall
    card: Card

    constructor(learned: boolean, cardNext: ActionCall) {
        super()
        this.learned = learned
        this.cardNext = cardNext
    }

    request() {
        this.card = this.state.cards.card
        return cardLearned(this.card.id, this.learned)
    }

    after(success: boolean) {
        if (!success) {
            super.after(false)
            return
        }

        if (this.learned) {
            this.dispatch(this.cardNext(true))
            return
        }
        
        this.dispatch(viewCard(this.card))
        super.after(true)
    }

    success(res: { dt_learned: string }) {
        this.card.dt_learned = res.dt_learned
    }
}