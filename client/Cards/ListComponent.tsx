import * as React from 'react'
import { connect } from 'react-redux'
import Pagination from '../Components/Pagination'
import { addCard, fetchCard, cardList } from '../Cards/actions'
import * as types from '../../types/State'

import { browserHistory } from 'react-router'

import { Card } from '../../types/Card'

type StateProps = {
    cards: Array<Card>,
    filter: string,
    executing: boolean,
    isError: boolean,
}

type DispatchProps = {
    cardList: Function,
    addCard: Function,
    fetchCard: (id: number) => any,
}

type ParamProps = { params: { filter: string } }

type Props = StateProps & DispatchProps & ParamProps

const ItemElement = (props: { item: Card, click: (id: number) => any }) => {
    var item = props.item
    return (<li className="collection-item card" key={item.id}
        onClick={() => props.click(item.id)}>
        {item.word}
    </li>)
}

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    fetch(props: Props) {
        let filter = props.params.filter || ''
        if (props.cards
            && props.filter == filter
            || props.executing
            || props.isError)
            return
        props.cardList(props.params.filter || '')
    }

    componentWillMount() {
        this.fetch(this.props)
    }

    render() {
        const { cards, fetchCard, cardList } = this.props
        if (!cards) return null
        return (
            <div style={{ position: 'relative' }}>
                <a id="add-card-button" role="button" onClick={() => browserHistory.push('/cards/add')} style={{ position: 'absolute', right: 10 }} className="btn-floating btn-large waves-effect waves-light green"><i className="material-icons">add</i></a>
                {cards.length
                    ? <Pagination items={cards} click={fetchCard} itemElement={ItemElement} />
                    : null}
                <a href="javascript:;" style={this.getStyle('')} onClick={() => cardList('')}>All</a>&nbsp;
                <a href="javascript:;" style={this.getStyle('new')} onClick={() => cardList('new')}>New</a>&nbsp;
                <a href="javascript:;" style={this.getStyle('learned')} onClick={() => cardList('learned')}>Learned</a>&nbsp;
            </div>
        )
    }

    getStyle(filter: string) {
        return filter == this.props.filter 
        ? { color: 'red' }
        : {}
    }
}

export default connect(
    (state: types.State): StateProps => {
        return {
            cards: state.cards.cards,
            filter: state.cards.filter,
            executing: state.common.executing,
            isError: !!state.common.error,
        }
    },
    (dispatch: Function): DispatchProps => {
        return {
            addCard: () => dispatch(addCard()),
            fetchCard: (id: number) => dispatch(fetchCard(id)),
            cardList: (filter: string) => dispatch(cardList(filter)),
        }
    }
)(Component)