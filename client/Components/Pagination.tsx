import * as React from 'react'
import { CardsPerPage } from '../config'

type Item = { id: number }
type Props = {
    items: Array<Item>,
    click: (id: number) => any,
    itemElement: (props: { item: Item, click: (id: number) => any }) => JSX.Element
}

class Pagination extends React.Component<Props> {
    state: {
        pageId: number
    }

    constructor(props: Props) {
        super(props)

        this.state = { pageId: 1 }
    }

    range(num: number) {
        var arr = []
        for (var i = 1; i <= num; ++i) {
            arr.push(i)
        }

        return arr
    }

    leftLink(pageId: number) {
        const icon = <i className="material-icons">chevron_left</i>
        if (pageId > 1) {
            return <a role="button" onClick={() => this.setState({ pageId: pageId - 1 })}>{icon}</a>
        }

        return <a>{icon}</a>
    }

    rightLink(pagesCount: number, pageId: number) {
        const icon = <i className="material-icons">chevron_right</i>
        if (pageId < pagesCount) {
            let nextPageId = pageId + 1
            return <a role="button" onClick={() => this.setState({ pageId: nextPageId })}>{icon}</a>
        }

        return <a>{icon}</a>
    }

    render() {
        const { items, click } = this.props
        const { pageId } = this.state
        const ItemElement = this.props.itemElement

        var startIndex = (this.state.pageId - 1) * CardsPerPage
        var endIndex = this.state.pageId * CardsPerPage
        var pagesCount = Math.ceil(items.length / CardsPerPage)

        return <div>
            <ul className="pagination">
                <li>{this.leftLink(pageId)}</li>
                {
                    this.range(pagesCount).map((i) =>
                        <li key={i} className={'waves-effect ' + (i == pageId ? 'active' : '')}>
                            <a role="button" onClick={() => this.setState({ pageId: i })}>{i}</a>
                        </li>)
                }
                <li className="waves-effect">{this.rightLink(pagesCount, pageId)}</li>
            </ul>
            <ul id="item-list" className="collection">
                {
                    items.slice(startIndex, endIndex)
                        .map(item => <ItemElement key={item.id} item={item} click={ click } />)
                }
            </ul>
        </div>
    }
}

export default Pagination