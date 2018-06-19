import * as React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Profile } from '../../types/Profile'
import { State } from '../../types/State'

type StateProps = {
    profile: Profile,
}

type DispatchProps = {
}

type Props = StateProps & DispatchProps

class ProfileComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        const { profile } = this.props
        
        if (!profile) return null
        return <div>
            <div style={{ float: 'right' }}>
                <Link to={'/profile/edit/'} id="edit-profile-button" role="button">EDIT</Link>
            </div>
            {profile.name}<br />
            {profile.email}
        </div>
    }
}

export default connect(
    (state: State): StateProps => {
        return {
            profile: state.profile,
        }
    })(ProfileComponent)