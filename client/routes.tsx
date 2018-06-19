import * as React from 'react'
import { Route } from 'react-router'
import { Store } from 'react-redux'

import App from './App'
import Profile from './Profile/Component'
import EditProfile from './Profile/EditContainer'
import Cards from './Cards/ListComponent'
import ViewCard from './Cards/ViewContainer'
import EditCard from './Cards/EditContainer'
import Login from './Auth/LoginContainer'
import Signup from './Auth/SignupContainer'
import Search from './Search/Container'
import About from './Components/About'
import { addCard } from './Cards/actions'
import { getProfile } from './Profile/actions'

const createRoutes = (store: Store<any>) => {
    return (
        <Route path="/" component={App}>
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="search" component={Search} />
            <Route path="/cards/add" component={EditCard}
                onEnter={() => store.dispatch(addCard())} />
            <Route path="/cards/edit/:id" component={EditCard} />
            <Route path="cards(/:filter)" component={Cards} />
            <Route path="/cards/view/:id" component={ViewCard} />
            <Route path="about" component={About} />
            <Route path="profile" component={Profile}
                onEnter={() => store.dispatch(getProfile())} />
            <Route path="/profile/edit" component={EditProfile} />
            <Route path="*" component={Cards} />
        </Route>
    )
}

export default createRoutes