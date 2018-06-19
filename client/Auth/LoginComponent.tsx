import * as React from 'react'
import { Link } from 'react-router'
import { Login } from '../../types/Auth'

export type Props = {
    login: (login: Login) => void
}

class LoginComponent extends React.Component<Props, Login> {
    constructor(props: Props) {
        super(props)
        this.state = {
            name: '',
            password: '',
        }
    }

    render() {
        const { login } = this.props
        return (
            <div>
                <form onSubmit={e => { e.preventDefault(); login(this.state) }}>
                    <div className="input-field">
                        <input value={this.state.name} id="name" placeholder="Username" type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="input-field">
                        <input value={this.state.password} id="password" placeholder="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                    </div>
                    <button id="login-button" className="btn waves-effect waves-light" type="submit">
                        Login
                </button>
                    <Link role="button" id="signup-link" style={{ marginLeft: 10 }} to='/signup'>SIGNUP</Link>
                </form>
                <p style={{ color: 'green', margin: 10 }}>Hint: see instructional video by clicking '?' in the top right corner</p>
            </div>

        )
    }
}

export default LoginComponent