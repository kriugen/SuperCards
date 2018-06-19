import { combineReducers } from 'redux'
import cards from './Cards/reducer'
import modal from './Modal/reducer'
import auth from './Auth/reducer'
import search from './Search/reducer'
import common from './Common/reducer'
import profile from './Profile/reducer'

const reducers = combineReducers({
    cards,
    modal,
    auth,
    search,
    common,
    profile,
})

export default reducers