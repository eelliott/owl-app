import React, { Component } from 'react';

export class MatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            showPlayers1: false,
            showPlayers2: false,
            id: null,
            teams: [
                {},
                {}
            ],
            scores: [],
            winner: {},
            games: []
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`https://api.overwatchleague.com/matches/${id}`)
        .then(res=>res.json())
        .then(data => {
            let games = data.games;
            games.forEach(games => {
                games.showPlayers = false;
            });
            this.setState({
                isLoading: false,
                id: id,
                teams: data.competitors,
                scores: data.scores,
                winner: data.winner,
                games: games
            });
        })
        .catch(e => {
            console.error("error fetching team data",e);
        });
    }

    toggleTeamPlayers(e) {
        if (e.target.id === "0") {
            this.setState({
                showPlayers1: !this.state.showPlayers1
            });
        } else {
            this.setState({
                showPlayers2: !this.state.showPlayers2
            });
        }
    }

    toggleGamePlayers(e) {
        e.persist();
        let games = this.state.games.filter(g => g.number.toString() !== e.target.id);
        let game = this.state.games.filter(g => g.number.toString() === e.target.id);
        this.setState({
            games: [...games, {
                ...game, 
                showPlayers: !game.showPlayers
            }]
        });
    }

    render() {
        return(
            <div>
                {this.state.isLoading ? <p>loading...</p> : 
                    <div>
                        <span id="0" onClick={this.toggleTeamPlayers.bind(this)}>{this.state.teams[0].name} {this.state.scores[0].value}</span> - <span id="1" onClick={this.toggleTeamPlayers.bind(this)}>{this.state.teams[1].name} {this.state.scores[1].value}</span>
                        {!this.state.showPlayers1 ? <div></div> : 
                            <div>
                                {this.state.teams[0].players.map((player) => 
                                    <div key={player.player.id}>{player.player.name}</div>
                                )}
                            </div>
                        }
                        {!this.state.showPlayers2 ? <div></div> : 
                            <div>
                                {this.state.teams[1].players.map((player) => 
                                    <div key={player.player.id}>{player.player.name}</div>
                                )}
                            </div>
                        }
                        <div>
                            {this.state.games.map((game) => 
                                <div key={game.id} id={game.number} onClick={this.toggleGamePlayers.bind(this)}>
                                    Map {game.number}: 
                                    {game.points[0]} - {game.points[1]}
                                    
                                </div>    
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
