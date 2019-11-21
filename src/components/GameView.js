import React from 'react'
import GameListCounter from './GameListCounter'

class GameView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data
        }

        this.imageLoad = this.imageLoad.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    imageLoad(e) {
        e.target.className += ' gameImage'
    }

    handleClick(e) {
        let subChange = this.props.subChange
        if (e.target.className === 'favorite-button') {
            if (localStorage.getItem(e.target.parentNode.id) !== null) {
                localStorage.removeItem(e.target.parentNode.id)
                e.target.innerHTML = 'Favorite'
                subChange()
            }
            else {
                localStorage.setItem(e.target.parentNode.id, e.target.parentNode.id)
                e.target.innerHTML = 'Unfollow'
                subChange()
            }
        }
    }

    render() {
        let gnumber = this.props.gameNumber

        let startPage = this.props.currentPage
        let arr = [] //fav

        let arr1 = this.state.data.filter(function (v) {
            if (localStorage.getItem(v.ID) !== null) {
                return true
            }
            else {
                arr.push(v)
                return false
            }
        })
        arr = arr1.concat(arr)
        let cat = this.props.category
        arr = arr.filter(function (x) {
            if (cat == 0) { return true } else
                if (cat == x.CategoryID[0] || cat == x.CategoryID[1]) { return true } else { return false }
        })
        let gameAmount = arr.length
        arr = arr.slice((startPage - 1) * gnumber, startPage * gnumber).map(function (v, i) {
            if (localStorage.getItem(v.ID) == null) {
                return (
                    <div className='game-info' key={v.ID} id={v.ID} category={v.CategoryID}>
                        <div className='game-name'> {v.Name.en}</div>
                        <img class='gameImage-preload' src={v.ImageFullPath} alt='#' />
                        <div class='start-button'>START</div>
                        <div class='favorite-button'>Favorite</div>
                    </div>
                )
            } else {
                return (
                    <div className='game-info' key={v.ID} id={v.ID} category={v.CategoryID}>
                        <div className='game-name'> {v.Name.en}</div>
                        <img class='gameImage-preload' src={v.ImageFullPath} alt='#' />
                        <div class='start-button'>START</div>
                        <div class='favorite-button'>Unfollow</div>
                    </div>)
            }
        })

        return (
            <div>
                <div
                    onLoad={this.imageLoad}
                    onClick={this.handleClick}
                    className='game-list'>
                    {arr}
                </div>


                <GameListCounter
                    gameAmount={gameAmount}
                    gameList={this.props.gameNumber}
                    handleButtonClick={this.props.handleButtonClick} />
            </div>
        )
    }
}

export default GameView