import * as React from 'react'
import { Profile } from '../../types/Profile'
import { browserHistory } from 'react-router'

export type StateProps = {
    profile: Profile
}

export type DispatchProps = {
    saveProfile: (profile: Profile) => Function,
    
}

type Props = StateProps & DispatchProps

class EditComponent extends React.Component<Props, Profile> {
    constructor(props: Props) {
        super(props)

        this.state = props.profile
    }

    render() {
        const { profile, saveProfile } = this.props
        if (!profile) return null

        return (
            <form onSubmit={e => { e.preventDefault(); saveProfile(this.state) }}>
                <div className="center">
                    <button id="save-card-button" className="btn waves-effect waves-light" type="submit">
                        Save Card
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <a role="button" className="btn-flat" 
                        onClick={ () => browserHistory.goBack() }>CANCEL</a>
                </div>
                <div className="input-field">
                    <input value={this.state.name} id="name" placeholder="Enter the name" type="text" onChange={(e) => this.setState({ name: e.target.value })} />
                    <label className="active" htmlFor="word">Name</label>
                </div>
                <div className="input-field">
                    <input value={this.state.email} id="email" placeholder="Enter email" type="text" onChange={(e) => this.setState({ email: e.target.value })} />
                    <label className="active" htmlFor="transcription">Email</label>
                </div>
            </form>
        )
    }
}

export default EditComponent