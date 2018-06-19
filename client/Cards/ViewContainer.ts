import { connect } from 'react-redux'
import ViewComponent, { StateProps, DispatchProps } from './ViewComponent'
import {
    cardLearned,
    cardNext,
    fetchCard,
    cardList,
    play,
} from './actions'
import { showModal, hideModal } from '../Modal/actions'
import { State } from '../../types/State'

const mapStateToProps = (state: State): StateProps => {
    return {
        playing: state.cards.playing,
        card: state.cards.card,
        user: state.auth.user,
        executing: state.common.executing,
        isError: !!state.common.error,
    }
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        showModal: (modalType, modalProps) => dispatch(showModal(modalType, modalProps)),
        hideModal: () => dispatch(hideModal()),
        cardLearned: (learned) => dispatch(cardLearned(learned)),
        cardNext: () => dispatch(cardNext()),
        fetchCard: (id: number) => dispatch(fetchCard(id)),
        cardList: () => dispatch(cardList()),
        play: (on: boolean) => dispatch(play(on)),
    }
}

var ViewContainer = connect(mapStateToProps, mapDispatchToProps)(ViewComponent)

export default ViewContainer