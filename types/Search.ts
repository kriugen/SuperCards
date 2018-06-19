import { Card } from './Card'

export interface SearchState {
    word: string,
    cards: Array<Card>,
}