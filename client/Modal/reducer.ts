import { Action } from './actions'

type State = {
    modalProps: any,
}

const initialState: State = {
    modalProps: {},
}

function modal(state = initialState, action: Action) {
    switch (action.type) {
    case 'SHOW_MODAL':
        return {
            modalType: action.modalType,
            modalProps: action.modalProps,
        }
    case 'HIDE_MODAL':
        return initialState
    default:
        ((x: never) => x)(action)
        return state
    }
}

export default modal