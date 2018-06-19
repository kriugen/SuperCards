import * as React from 'react'
import { Card } from '../../types/Card'

export interface DispatchProps {
    deleteCard: (card: Card) => void,
    hideModal: () => Function,
}

export interface StateProps {
    modalType: string,
    modalProps: any,
}

type Props = StateProps & DispatchProps

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        const { modalType, modalProps, deleteCard, hideModal } = this.props

        if (!modalType) return null

        return (
            <div id="modal" style={{ width: '100%', border: '1px solid', backgroundColor: 'yellow', display: 'table' }}>
                <div style={{ verticalAlign: 'middle', fontSize: 'x-large', textAlign: 'center', display: 'table-cell', width: 'auto' }}>Delete card?</div>
                <div style={{ display: 'table-cell', width: '10%', padding: 10 }}>
                    <a id="modal-ok" role="button" className="btn red"
                        onClick={() => {
                            deleteCard(modalProps.card)
                            hideModal()
                        }}>OK
                </a>
                </div>
                <div style={{ display: 'table-cell', width: '10%' }}>
                    <a id="modal-cancel" role="button" className="btn-flat"
                        onClick={() => hideModal()} >CANCEL
                    </a>
                </div>
            </div>)
    }
}

export default Component
