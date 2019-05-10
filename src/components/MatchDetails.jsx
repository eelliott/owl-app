import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        const id = this.props.match.params.id;
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
        this.setState(state => {
            let tempState = state;
            tempState.games[parseInt(e.target.id)-1].showPlayers = !tempState.games[parseInt(e.target.id)-1].showPlayers;
            return tempState;
        });
    }

    render() {
        return(
            <div>
                {this.state.isLoading ? <p>loading...</p> : 
                    <div>
                        <span id="0" onClick={this.toggleTeamPlayers.bind(this)}>{this.state.teams[0].name} {this.state.scores[0].value}</span> - <span id="1" onClick={this.toggleTeamPlayers.bind(this)}>{this.state.teams[1].name} {this.state.scores[1].value}</span>
                        {this.state.showPlayers1 && players(this.state.teams[0])}
                        {this.state.showPlayers2 && players(this.state.teams[1])}
                        <div>
                            {this.state.games.map((game) => 
                                <div key={game.id}>
                                    <div id={game.number} onClick={this.toggleGamePlayers.bind(this)}>
                                        Map {game.number}: 
                                        {game.points[0]} - {game.points[1]}
                                    </div>
                                    {game.showPlayers && 
                                        <div>
                                            {playersFielded(this.state.teams[0], game)}
                                            {playersFielded(this.state.teams[1], game)}
                                        </div>
                                    }
                                </div>    
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function players(team) {
    return (
        <div>
            {team.players.map((player) => 
                <Link key={player.player.id} to={`/players/${player.player.id}`}>{player.player.name}</Link>
            )}
        </div>
    );
}

function playersFielded(team, game) {
    return (
        <div> {team.name}: 
            {game.players.filter(player => player.team.id === team.id).map(player => 
                <Link key={player.player.id} to={`/players/${player.player.id}`}> {player.player.name} </Link>
            )}
        </div>
    );
}
