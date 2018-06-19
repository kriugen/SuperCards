import { Action } from './actions'
import { CommonState, Error } from '../../types/Common'

var initState: CommonState = {
    error: null,
    progress: false,
    executing: false,
}

type SuperagentError = {
    response: {
        type: string,
        text: string,
    }
}

type HttpError = {
    message: string,
}

const common = (state: CommonState = initState, action: Action): CommonState => {
    switch (action.type) {
        case 'ERROR': {
            var error: Error = { message: '' }
            if (action.error.response) {
                let errorObj: SuperagentError = action.error
                if (errorObj.response.type == 'application/json') {
                    error = JSON.parse(errorObj.response.text)
                } else
                    error.message = errorObj.response.text
            } else {
                let errorObj: HttpError = action.error
                error.message = errorObj.message
            }

            return Object.assign({}, state, { error })
        }
        case 'FETCH_START': {
            return Object.assign({}, state, { executing: true })
        }
        case 'FETCH_END': {
            return Object.assign({}, state, { progress: false, executing: false })
        }
        case 'FETCH_PROGRESS': {
            var progress = state.executing 
            return Object.assign({}, state, { progress })
        }
        case 'ROUTE_CHANGE': {
            return Object.assign({}, state, { error: null })
        }
        default:
            return Object.assign({}, state, { error: null })
    }
}

export default common