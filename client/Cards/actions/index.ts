import { Card } from '../../../types/Card'
import { Action, Dispatch } from './types'
import { State } from '../../../types/State'
import { CallbackDone } from '../../../types'

export const addCard = (): Action => {
    return {
        type: 'ADD_CARD',
    }
}

import WordDataGetter from './WordDataGetter'
export const getDataForCard = (card: Card) => execute(new WordDataGetter(card))

export const play = (on: boolean) => {
    return (dispatch: Dispatch, getState: Function) => {
        dispatch({ type: 'PLAY', on })
        if (on)
            playNext(dispatch, getState)
    }
}

function playNext(dispatch: Dispatch, getState: Function) {
    setTimeout(() => {
        let state: State = getState()
        if (!state.cards.playing)
            return

        dispatch(cardNext(false, (success: boolean) => {
            if (success)
                playNext(dispatch, getState)
        }))
    }, 1000)
}

import CardNexter from './CardNexter'
export const cardNext = (chained?: boolean, done?: CallbackDone) =>
    execute(new CardNexter(fetchCard), chained, done)

import CardLearner from './CardLearner'
export const cardLearned = (learned: boolean) => execute(new CardLearner(learned, cardNext))

import CardDeleter from './CardDeleter'
export const deleteCard = (card: Card) => execute(new CardDeleter(card))

import CardSaver from './CardSaver'
export const saveCard = (card: Card) => execute(new CardSaver(card))

import CardFetcher from './CardFetcher'
export const fetchCard = (id: number, chained?: boolean, done?: CallbackDone) =>
    execute(new CardFetcher(id), chained, done)

import CardEditor from './CardEditor'
export const editCard = (id: number) => execute(new CardEditor(id))

import CardLister from './CardLister'
export const cardList = (filter?: string) => execute(new CardLister(filter))

import ProgressRequest from './ProgressRequest'
export const execute = (request: ProgressRequest
    , chained = false
    , done = (success: boolean) => { success }) => {
    return (dispatch: Dispatch, getState: Function) => {
        return request.execute(dispatch, getState(), chained, done)
    }
}
