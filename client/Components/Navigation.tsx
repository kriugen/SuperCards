import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logout, getUser } from '../Auth/actions'
import { cardList } from '../Cards/actions'
import { User } from '../../types/Auth'

type Props = {
    logout: () => void,
    getUser: () => void,
    cardList: () => void,
    user: User,
}

class Navigation extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    componentWillMount() {
        this.props.getUser()
    }

    render() {
        const { user, logout, cardList } = this.props
        return <nav className="row">
            <a href="javascript:;" role="button" id="cards-link" style={{ fontSize: 'x-large' }}
                className="col s2" onClick={() => cardList()}>Cards</a>
            {
                user
                    ? (<span>
                        <Link id="search-link" className="col offset-s3 s2" to="/search">
                            <i className="material-icons left">search</i>
                        </Link>
                        <Link id="username-button" to="/profile" className="col s2">
                            {user.name}
                        </Link>
                        <a id="logout-button" href="#" className="col s2" onClick={logout}>Logout</a></span>)
                    : <Link className="col offset-s7 s2" to="/login">Login</Link>
            }
            <a className="col s1" target="_blank" href="https://youtu.be/7vCFeunxRxk">?</a>
        </nav>
    }
}

export default connect(state => state.auth,
    dispatch => {
        return {
            logout: () => dispatch(logout()),
            getUser: () => dispatch(getUser()),
            cardList: () => dispatch(cardList('')),
        }
    })(Navigation)