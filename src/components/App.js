import React from 'react'
import data from '../data.js'
import GameView from './GameView'
import GameListNumber from './GameListNumber'
import GameCategories from './GameCategories'

/*
categories
games
merchants
countriesRestrictions
merchantsCurrencies
*/
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: data,
            sort: 'averse',
            page: 1,
            gameNumber: 40,
            sub: localStorage.length,
            category: 0,
        };

        this.getAllNextSiblings = function (element) {
            var out = []
            while (element.nextSibling) {
                out.push(element = element.nextSibling)
            }
            return out
        }

        this.getAllPreviousSiblings = function (element) {
            var out = [];
            while (element.previousSibling) {
                out.push(element = element.previousSibling)
            }

            return out;
        }

        this.reverseView = this.reverseView.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleNumber = this.handleNumber.bind(this)
        this.subChange = this.subChange.bind(this)
        this.categoryChange = this.categoryChange.bind(this)
        this.totalGame = this.totalGame.bind(this)
    }

    reverseView() {
        if (this.state.sort === 'averse') {
            this.setState(prevState => {
                return {
                    data: data,
                    sort: 'reverse',
                    page: 1,
                    gameNumber: prevState.gameNumber,
                    sub: localStorage.length,
                    category: prevState.category
                }
            })
        } else {
            this.setState(prevState => {
                return {
                    data: data,
                    sort: 'averse',
                    page: 1,
                    gameNumber: prevState.gameNumber,
                    sub: localStorage.length,
                    category: prevState.category
                }
            })
        }
    }

    handleButtonClick(e) {
        let getAllNextSiblings = this.getAllNextSiblings
        let getAllPreviousSiblings = this.getAllPreviousSiblings
        function getAllSiblings(e) {
            var out = getAllNextSiblings(e);
            out = out.concat(getAllPreviousSiblings(e))
            out.push(e)
            return out
        }
        getAllSiblings(e).forEach(x => x.classList.remove('active'))
        e.classList.add('active')
        this.setState(prevState => {
            return {
                data: data,
                sort: prevState.sort,
                page: e.innerHTML,
                gameNumber: prevState.gameNumber,
                sub: localStorage.length,
                category: prevState.category
            }
        })
    }

    handleNumber(e) {
        this.setState(prevState => {
            return {
                data: data,
                sort: prevState.sort,
                page: 1,
                gameNumber: e,
                sub: localStorage.length,
                category: prevState.category
            }
        });
    }

    subChange() {
        this.setState(prevState => {
            return {
                data: prevState.data,
                sort: prevState.sort,
                page: prevState.page,
                gameNumber: prevState.gameNumber,
                sub: localStorage.length,
                category: prevState.category
            }
        })
    }

    categoryChange(e) {
        let getAllNextSiblings = this.getAllNextSiblings
        let getAllPreviousSiblings = this.getAllPreviousSiblings
        function getAllSiblings(e) {
            var out = getAllNextSiblings(e)
            out = out.concat(getAllPreviousSiblings(e))
            out.push(e)
            return out
        }
        getAllSiblings(e).forEach(x => x.classList.remove('active'))
        e.classList.add('active')
        this.setState(prevState => {
            return {
                data: prevState.data,
                sort: prevState.sort,
                page: 1,
                gameNumber: prevState.gameNumber,
                sub: localStorage.length,
                category: e.id
            }
        })
    }

    totalGame(elem) {
        console.log(elem)
    }

    render() {
        if (this.state.sort === 'averse') {
            this.state.data.games.sort(function (a, b) {
                var nameA = a.Name.en.toUpperCase()
                var nameB = b.Name.en.toUpperCase()
                return nameA.localeCompare(nameB)
            })
        } else {
            this.state.data.games.sort(function (a, b) {
                var nameA = a.Name.en.toUpperCase()
                var nameB = b.Name.en.toUpperCase()
                return nameB.localeCompare(nameA)
            })
        }

        return (

            <fragment>
                <div class='menu-wrap'>

                    <a class='reverse-button' onClick={this.reverseView}>Reverse</a>
                    <GameListNumber
                        listNumber={this.state.gameNumber}
                        handleNumber={this.handleNumber} />
                    <p> You are subscribed to {this.state.sub} games.</p>
                    <GameCategories
                        gameCategories={this.state.data.categories}
                        categoryChange={this.categoryChange} />
                </div>
                <GameView
                    data={this.state.data.games}
                    category={this.state.category}
                    currentPage={this.state.page}
                    gameNumber={this.state.gameNumber}
                    handleButtonClick={this.handleButtonClick}
                    subChange={this.subChange}
                    totalGame={this.totalGame} />
            </fragment>)
    }
}

export default App