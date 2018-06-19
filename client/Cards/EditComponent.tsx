import * as React from 'react'
import ImageUpload from './ImageUpload'
import { Card } from '../../types/Card'
import { Size } from '../../types'
import { MaxImageWidth, MaxImageHeight } from '../config'

export type StateProps = {
    card: Card,
}

export type DispatchProps = {
    saveCard: (card: Card) => Function,
    getDataForCard: (card: Card) => Function,
    editCard: (id: number) => Function,
    cardList: () => Function,
}

export type ParamProps = {
    params: { id: number },
}

type Props = StateProps & DispatchProps & ParamProps

class EditComponent extends React.Component<Props, Card> {
    constructor(props: Props) {
        super(props)

        if (props.card)
            this.populateState(props)

        this.imageChanged = this.imageChanged.bind(this)
        this.imageUrlChanged = this.imageUrlChanged.bind(this)
    }

    populateState(props: Props) {
        this.state = Object.assign({}, Card.nullToEmpty(props.card))
    }

    componentWillMount() {
        if (this.props.card
            && this.props.card.id == this.props.params.id)
            return

        this.props.editCard(this.props.params.id)
    }

    componentWillReceiveProps(props: Props) {
        if (!this.state)
            this.populateState(props)
    }

    getLimitedImageSize(img: HTMLImageElement): Size {
        var height = img.height
        var width = img.width

        if (img.height > img.width) {
            if (img.height > MaxImageHeight) {
                let ratio = MaxImageHeight / img.height
                height = MaxImageHeight
                width *= ratio
            }
        } else {
            if (img.width > MaxImageWidth) {
                let ratio = MaxImageWidth / img.width
                width = MaxImageWidth
                height *= ratio
            }
        }

        return { width, height }
    }

    imageChanged(input: HTMLInputElement) {
        if (input.files && input.files[0]) {
            var reader = new FileReader()

            var img = document.createElement("img")
            var canvas = document.createElement("canvas")
            var ctx = canvas.getContext("2d")

            reader.onload = () => {
                img.onload = () => {
                    const { width, height } = this.getLimitedImageSize(img)

                    canvas.height = height
                    canvas.width = width

                    ctx.drawImage(img, 0, 0, width, height)

                    var dataurl = canvas.toDataURL("image/jpeg")
                    this.setState({ image: dataurl })
                }

                img.src = reader.result
            }

            reader.readAsDataURL(input.files[0])
        }
    }

    imageUrlChanged(url: string) {
        if (url) {
            this.setState({ image: url })
        }
    }

    render() {
        const { saveCard, cardList, getDataForCard } = this.props
        if (!this.state) return null

        return (
            <form onSubmit={e => { e.preventDefault(); saveCard(this.state) }}>
                <div className="center">
                    <button id="save-card-button" className="btn waves-effect waves-light" type="submit">
                        Save Card
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <a role="button" className="btn-flat" onClick={() => cardList()}>CANCEL</a>
                    {this.state.word
                        && <a role="button" id="fill-button"
                            className="btn-flat" onClick={() => { getDataForCard(this.state) }}>Fill</a>
                    }
                </div>
                <div className="input-field">
                    <input value={this.state.word} id="word" placeholder="Enter the word" type="text" onChange={(e) => this.setState({ word: e.target.value })} />
                    <label className="active" htmlFor="word">Word</label>
                </div>
                <div className="input-field">
                    <input value={this.state.transcription} id="transcription" placeholder="Enter transcription" type="text" onChange={(e) => this.setState({ transcription: e.target.value })} />
                    <label className="active" htmlFor="transcription">Transcription</label>
                </div>
                <div style={{ marginBottom: 10 }}>
                    <ImageUpload maxWidth={MaxImageWidth} maxHeight={MaxImageHeight} image={this.state.image} onImageSelected={this.imageChanged} />
                </div>
                {this.state.word && <a className="btn waves-effect waves-light" href={`http://images.google.com/search?tbm=isch&q=${this.state.word}`} target="_blank">Search</a>}
                <div className="input-field">
                    <input id="imageUrl" value='' placeholder="Paste image Url" type="text" onChange={(e) => this.imageUrlChanged(e.target.value)} />
                    <label className="active" htmlFor="imageUrl">And paste image Url</label>
                </div>
                <audio id="sound" controls src={this.state.sound} />
                <div className="input-field">
                    <textarea className="materialize-textarea" value={this.state.translation} id="translation" placeholder="Enter translation" onChange={(e) => this.setState({ translation: e.target.value })} />
                    <label className="active" htmlFor="translation">Translation</label>
                </div>
                <div className="input-field">
                    <textarea className="materialize-textarea" value={this.state.samples} id="samples" placeholder="Enter samples" onChange={(e) => this.setState({ samples: e.target.value })} />
                    <label className="active" htmlFor="samples">Samples</label>
                </div>
            </form>
        )
    }
}

export default EditComponent