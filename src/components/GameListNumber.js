import React from 'react'

class GameListNumber extends React.Component {
    constructor(props) {
        super(props)
        this.handleNumberChange = this.handleNumberChange.bind(this)
    }

    handleNumberChange(e) {
        console.log(e.target.value)
        this.props.handleNumber(e.target.value)
    }

    render() {
        return (
            <div class='range-wrap'>
                <input type="range" min="40" max="100" step="10"
                    value={this.props.listNumber}
                    onChange={this.handleNumberChange}
                ></input>
                <div>{this.props.listNumber} games on the page</div>
            </div>
        )
    }
}

export default GameListNumber