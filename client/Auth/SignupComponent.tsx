import * as React from 'react'
import { Signup } from '../../types/Auth'

export type Props = {
    signup: (user: Signup) => void,
}

class Component extends React.Component<Props, Signup> {
    constructor(props: Props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    render() {
        const { signup } = this.props
        return (
            <form onSubmit={e => { e.preventDefault(); signup(this.state) }}>
                <div className="input-field">
                    <input value={this.state.name} id="name" placeholder="Username" type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
                <div className="input-field">
                    <input value={this.state.email} id="email" placeholder="Email" type="text" onChange={(e) => this.setState({ email: e.target.value })} />
                </div>
                <div className="input-field">
                    <input value={this.state.password} id="password" placeholder="Password" type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <button id="signup-button" className="btn waves-effect waves-light" type="submit">
                    SignUp
                </button>
            </form>
        )
    }
}


export default Component