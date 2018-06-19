import * as db from '../db'
import { browserHistory } from 'react-router'
import { Login, Signup, User } from '../../types/Auth'
import * as common from '../Common/actions'
import { cardList } from '../Cards/actions'
import * as cards from '../Cards/actions/types'

export type Action = { type: 'USER_LOGGED_IN', user: User }
    | { type: 'USER_LOGGED_OUT' }

type CardList = (dispatch: cards.Dispatch, getState: Function) => Promise<any>
type Dispatch = (parameter: Action | Dispatch | common.Action | CardList) => void

export const login = (data: Login) => {
    return (dispatch: Dispatch) => {
        db.login(data)
            .then((user: User) => {
                if (user) {
                    dispatch({
                        type: 'USER_LOGGED_IN',
                        user,
                    })

                    dispatch(cardList(''))
                }
            })
            .catch(e => dispatch(common.error(e)))
    }
}

export const signup = (data: Signup) => {
    return (dispatch: Dispatch) => {
        db.signup(data)
            .then(() => { 
                browserHistory.push('/login')
            })
            .catch(e => dispatch(common.error(e)))
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        db.logout()
            .then(() => {
                dispatch({ type: 'USER_LOGGED_OUT' })
                browserHistory.push('/login')
            })
            .catch(e => dispatch(common.error(e)))
    }
}

export const getUser = () => {
    return (dispatch: Dispatch) => {
        db.getUser()
            .then((user: User) => {
                if (user)
                    dispatch({ type: 'USER_LOGGED_IN', user })
            })
            .catch(e => dispatch(common.error(e)))
    }
}