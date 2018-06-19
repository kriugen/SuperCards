import { Dispatch } from './types'
import { State } from '../../../types/State'
import * as common from '../../Common/actions'
import { CallbackDone } from '../../../types'

export default abstract class ProgressRequest {
    dispatch: Dispatch
    state: State
    chained: boolean
    done: CallbackDone

    before() {
        if (this.chained)
            return true

        if (this.state.common.executing)
            return false

        this.dispatch({ type: 'FETCH_START' })
        setTimeout(() => { this.dispatch({ type: 'FETCH_PROGRESS' }) }, 500)

        return true
    }

    abstract request(): Promise<any>
    abstract success(res: any): void

    after(success: boolean) {
        this.dispatch({ type: 'FETCH_END' })
        this.done(success)
    }

    execute(dispatch: Dispatch, state: State
            , chained = false
            , done: CallbackDone = () => {}): Promise<any> {
        this.dispatch = dispatch
        this.state = state
        this.chained = chained
        this.done = done

        if (!this.before()) return null

        return this.request()
            .then((res: any) => {
                this.success(res)
                this.after(true)
            })
            .catch(e => {
                this.dispatch(common.error(e))
                this.after(false)
            })
    }
}