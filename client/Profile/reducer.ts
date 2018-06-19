import { Profile } from '../../types/Profile'
import { Action } from './actions'

const profile = (state: Profile = null, action: Action) => {
    if (action.type == 'GET_PROFILE')
        return Object.assign({}, state, { ...action.profile })
    return state
}

export default profile