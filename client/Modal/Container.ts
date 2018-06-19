import { connect } from 'react-redux'

import Component, { DispatchProps } from './Component'

import { deleteCard } from '../Cards/actions'
import { hideModal } from './actions'

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        deleteCard: card => dispatch(deleteCard(card)),
        hideModal: () => dispatch(hideModal()),
    }
}

export default connect(
    state => state.modal,
    mapDispatchToProps
)(Component)