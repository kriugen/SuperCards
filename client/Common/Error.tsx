import * as React from 'react'
import { connect } from 'react-redux'
import { State } from '../../types/State'
import { Error } from '../../types/Common'
type Props = {
    error: Error,
}

const Error = (props: Props) => {
    if (!props.error)
        return null

    return <div id="error" style={{ color: 'red', margin: 10 }}>
        {props.error.message && <div id="error-message">{props.error.message}</div>}
        {props.error.errors &&
            <ul>
                {props.error.errors.map((e: string) => <li key={e}>{e}</li>)}
            </ul>}
    </div>
}

export default connect(
    (state: State) => {
        return {
            error: state.common.error,
        }
    })(Error)
