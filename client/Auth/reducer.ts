import { AuthState } from '../../types/Auth'
import { Action } from './actions'
const initState: AuthState = { user: null }

const auth = (state: AuthState = initState, action: Action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            {
                return Object.assign({}, state, { user: action.user })
            }
        case 'USER_LOGGED_OUT':
            {
                return initState
            }
        default:
            ((x: never) => x)(action)
            return state
    }
}

export default auth