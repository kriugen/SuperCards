import * as db from '../db'
import { Profile } from '../../types/Profile'
import * as common from '../Common/actions'
import { browserHistory } from 'react-router'

export type Action = { type: 'GET_PROFILE', profile: Profile }

type Dispatch = (parameter: Action | Dispatch | common.Action) => void

export const saveProfile = (profile: Profile) => {
    return (dispatch: Dispatch) => {

        db.saveProfile(profile)
            .then(() => {
                browserHistory.push('/profile')
            })
            .catch(e => dispatch(common.error(e)))
    }
}

export const getProfile = () => {
    return (dispatch: Dispatch) => {
        db.getProfile()
            .then((profile: Profile) => {
                if (profile) {
                    dispatch({ type: 'GET_PROFILE', profile })
                }
            })
            .catch(e => dispatch(common.error(e)))
    }
}