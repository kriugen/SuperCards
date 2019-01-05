import * as React from 'react'
import Navigation from './Components/Navigation'
import Error from './Common/Error'
import Progress from './Common/Progress'
import { browserHistory } from 'react-router'
import * as History from 'history'
import { connect } from 'react-redux'
import { routeChange } from './Common/actions'
import Version from './Version'

type ReactProps = {
    children: any,
}

type StateProps = {}

type DispatchProps = {
    routeChange: (path: string) => Function,
}

type Props = StateProps & DispatchProps & ReactProps

export class App extends React.Component<Props> {
    constructor(props: Props) {
        super(props)

        browserHistory.listen((location: History.Location) => {
            this.props.routeChange(location.pathname)
        })
    }

    render() {
        return (
            <div style={{
                        display: 'flex', 
                        flexDirection: 'column',
                        minHeight: '100vh'}}>
                <Navigation />
                <Progress />
                <Error />
                <div style={{ flex: 1, margin: 10 }}>
                    {this.props.children}
                </div>
                <Version />
            </div>
        )
    }
}

export default connect(
    state => { return state },
    dispatch => {
        return {
            routeChange: location => dispatch(routeChange(location))
        }
    }
)(App)
