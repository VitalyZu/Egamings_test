import React from 'react'

class GameListCounter extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.props.handleButtonClick(e.target)
    }

    componentDidMount() {
        let a = document.getElementsByClassName('list-buttons')
        a[0].firstChild.classList.add('active')
    }

    render() {
        let count = this.props.gameAmount
        let gameList = this.props.gameList
        count = Math.ceil(count / gameList)
        let btns = []
        for (let i = 1; i <= count; i++) {
            btns.push(<a onClick={this.handleClick}>{i}</a>)
        }

        return (
            <div class='list-buttons'>
                {btns}
                <div class='total-games'>Total games in category: {this.props.gameAmount}</div>
            </div>
        )
    }
}

export default GameListCounter