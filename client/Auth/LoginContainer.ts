import { connect } from 'react-redux'
import LoginComponent, { Props } from './LoginComponent'
import { login } from './actions'

const mapDispatchToProps = (dispatch: Function): Props => {
    return {
        login: loginInfo => dispatch(login(loginInfo)),
    }
}

var LoginContainer = connect(null, mapDispatchToProps)(LoginComponent)

export default LoginContainer