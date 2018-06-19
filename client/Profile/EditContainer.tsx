import { connect } from 'react-redux'
import EditComponent, { StateProps, DispatchProps } from './EditComponent'
import { saveProfile } from './actions'
import { State } from '../../types/State'

const mapStateToProps = (state: State): StateProps => {
    return { profile: state.profile }
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        saveProfile: profile => dispatch(saveProfile(profile)),
    }
}

var EditContainer = connect(mapStateToProps, mapDispatchToProps)(EditComponent)

export default EditContainer