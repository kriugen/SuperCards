import { connect } from 'react-redux'
import EditComponent, { StateProps, DispatchProps } from './EditComponent'
import { saveCard, getDataForCard, editCard, cardList } from './actions'
import { State } from '../../types/State'

const mapStateToProps = (state: State): StateProps => {
    return { card: state.cards.card }
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        saveCard: card => dispatch(saveCard(card)),
        getDataForCard: card => dispatch(getDataForCard(card)),
        editCard: id => dispatch(editCard(id)),
        cardList: () => dispatch(cardList()),
    }
}

var EditContainer = connect(mapStateToProps, mapDispatchToProps)(EditComponent)

export default EditContainer