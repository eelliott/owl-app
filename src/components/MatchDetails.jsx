import React, { Component } from 'react';

export class MatchDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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
            this.setState({
                isLoading: false,
                id: id,
                teams: data.competitors,
                scores: data.scores,
                winner: data.winner,
                games: data.games
            });
        })
        .catch(e => {
            console.error("error fetching team data",e);
        });
    }

    render() {
        console.log(this.state.teams[0]);
        return(
            <div>
                {this.state.isLoading ? <p>loading...</p> : 
                    <div>
                        {this.state.teams[0].name} {this.state.scores[0].value} - {this.state.teams[1].name} {this.state.scores[1].value}    
                        <div>
                            {this.state.games.map((game) => 
                                <div key={game.id}>
                                    {}
                                </div>    
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}
