import { connect } from 'react-redux'
import Component, { StateProps, DispatchProps } from './Component'

import { search } from './actions'

import { State } from '../../types/State'

const mapStateToProps = (state: State): StateProps => {
    return state.search
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => {
    return {
        search: (word: string) => dispatch(search(word)),
    }
}

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default Container