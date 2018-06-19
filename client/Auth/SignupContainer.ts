import { connect } from 'react-redux'
import Component, { Props } from './SignupComponent'
import { signup } from './actions'

const mapDispatchToProps = (dispatch: Function):Props => {
    return {
        signup: user => dispatch(signup(user)),
    }
}

export default connect(null, mapDispatchToProps)(Component)