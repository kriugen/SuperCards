import * as React from 'react'
import { browserHistory } from 'react-router'

import { Card } from '../../types/Card'

export interface StateProps {
    word: string,
    cards: Array<Card>,
}

export interface DispatchProps {
    search: (word: string) => Function,
}

type Props = StateProps & DispatchProps

type SearchParams = {
    word: string,
}

class Component extends React.Component<Props, SearchParams> {
    constructor(props: Props) {
        super(props)

        this.state = { word: this.props.word }
    }

    render() {
        const { cards, search } = this.props
        return <div>
            <a id="back-button" role="button" className="btn" onClick={() => browserHistory.goBack()}>Back</a>
            <form onSubmit={e => { e.preventDefault(); search(this.state.word) }}>
                <input value={this.state.word} id="word" type="search" onChange={(e) => this.setState({ word: e.target.value })} />

                <button id="search-button" className="btn waves-effect waves-light orange" type="submit">
                    Search
                </button>
                <button style={{ float: 'right' }} id="clear-search-button"
                    className="btn waves-effect waves-light"
                    onClick={e => { e.preventDefault(); this.setState({ word: '' }) }}>
                    Clear
                </button>
            </form>
            {
                cards &&
                <ul id="search-results" className="collection">
                    {cards.map(card => {
                        return (<li className="collection-item" key={card.id}
                            onClick={() => browserHistory.push(`/cards/view/${card.id}`)}>
                            {card.translation || card.word}
                            <span style={{ float: 'right' }}>{card._taken_count}</span>
                        </li>)
                    })}
                </ul>
            }
        </div >
    }
}

export default Component