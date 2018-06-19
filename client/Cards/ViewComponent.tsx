import * as React from 'react'
import Modal from '../Modal/Container'
import { Link } from 'react-router'

import { Card } from '../../types/Card'
import { User } from '../../types/Auth'

import { MaxImageWidth, MaxImageHeight } from '../config'

export type StateProps = {
    playing: boolean,
    card: Card,
    user: User,
    executing: boolean,
    isError: boolean,
}

export type DispatchProps = {
    showModal: (modalType: string, modalProps: any) => Function,
    hideModal: () => Function,

    cardLearned: (learned: boolean) => Function,
    cardNext: () => Function,
    cardList: () => Function,

    fetchCard: (id: number) => Function,
    play: (on: boolean) => Function,
}

type ParamProps = { params: { id: number } }
type Props = StateProps & DispatchProps & ParamProps

class ViewComponent extends React.Component<Props> {
    textareas: Array<HTMLTextAreaElement> = []

    constructor(props: Props) {
        super(props)
    }

    fetch(props: Props) {
        if (props.card
            && props.card.id == props.params.id
            || props.executing
            || props.isError)
            return
        props.fetchCard(props.params.id)
    }

    componentWillMount() {
        this.fetch(this.props)
    }

    componentWillReceiveProps(props: Props) {
        this.fetch(props)
    }

    resizeTextareas() {
        this.textareas.forEach(ta => {
            if (!ta) return

            var event = document.createEvent('Event');
            event.initEvent('autoresize', true, true);
            ta.dispatchEvent(event);
        })
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.card)
            this.resizeTextareas()
    }

    render() {
        const {
            user,
            card,
            cardLearned,
            cardNext,
            cardList,
            showModal,
            play,
            playing,
        } = this.props

        if (!user || !card) return null

        return (
            <div>
                <Modal />
                <a id="back-button" role="button" className="btn"
                    onClick={() => cardList()}>Back</a>

                <a id="play-card-button" role="button"
                    className="btn" onClick={() => play(!playing)}>
                        { playing? 'Stop' : 'Play' }</a>

                <a style={{ float: 'right' }} id="next-card-button" role="button"
                    className="btn" onClick={() => cardNext()}>Next</a>

                <div style={{ textAlign: 'center' }}>
                    <h3 id="card-word">{card.word}</h3>
                    <p id="card-transcription">{card.transcription}</p>
                    <img style={{ maxWidth: MaxImageWidth, maxHeight: MaxImageHeight }} src={card.image} />
                    {card.sound && <audio id="sound" autoPlay controls src={card.sound} />}
                    {card.translation && <textarea ref={c => { this.textareas.push(c) }} readOnly className="materialize-textarea" value={card.translation}></textarea>}
                    {card.samples && <textarea ref={c => { this.textareas.push(c) }} readOnly className="materialize-textarea" value={card.samples}></textarea>}
                </div>

                {card.dt_learned
                    ? <a id="repeat-card-button" role="button" className="btn" onClick={() => cardLearned(false)}>Repeat</a>
                    : <a id="learned-card-button" role="button" className="btn" onClick={() => cardLearned(true)}>Learned</a>
                }

                <div style={{ float: 'right' }}>
                    <Link to={'/cards/edit/' + card.id} id="edit-card-button" role="button">EDIT</Link>&nbsp;&nbsp;
                    <a href="#" id="delete-card-button" role="button" onClick={() => showModal('DELETE_CARD', { card })}>DELETE</a>
                </div>
            </div>
        )
    }
}

export default ViewComponent