import * as React from 'react'
import { connect } from 'react-redux'
import { State } from '../../types/State'

type Props = {
    progress: boolean,
}

const Progress = (props: Props) => {
    if (!props.progress) return null
    return <div id="progress"><img src='/img/ajax-loader.gif' /></div>
}

export default connect(
    (state: State): Props => {
        return {
            progress: state.common.progress,
        }
    })(Progress)
