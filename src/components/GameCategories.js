import React from 'react'

class GameCategories extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        if (e.target.tagName === 'A') { this.props.categoryChange(e.target) }
    }

    render() {
        let categories = this.props.gameCategories.map(v => <a class='category' key={v.ID} id={v.ID}>{v.Trans.en}</a>)
        return (
            <div class='categories-list'
                onClick={this.handleClick}>
                <a class='category active' id={0}>All</a>
                {categories}
            </div>
        )
    }
}

export default GameCategories