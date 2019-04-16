import React, { Component } from "react";
import { Link } from 'react-router-dom';

export class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            curr_stage: "stage2",
            stage1: {},
            stage2: {},
            stage3: {},
            stage4: {}
        };
    }
    
    componentDidMount() {
        fetch('https://api.overwatchleague.com/schedule')
        .then(res => res.json())
        .then(data => {
            this.setState({
                isLoading: false,
                stage1: data.data.stages[0],
                stage2: data.data.stages[1],
                stage3: data.data.stages[2],
                stage4: data.data.stages[3]
            });
        })
        .catch(e => console.error("Error fetching schedule data,",e));
    }

    render() {
        return (
            <div>
                {this.isLoading ? <p>loading...</p> : 
                    <div>
                        <h2>{this.state[this.state.curr_stage].name}</h2>
                        {this.state[this.state.curr_stage].matches.map(match => (
                            <Match 
                                id={match.id} 
                                teams={match.teams}
                                scores={match.scores}
                                winner={match.winner}
                                games={match.games}
                                wins={match.wins}
                                tournament={match.tournament}
                            />
                        ))}
                    </div>
                }
            </div>
        );
    }
}

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: this.props.teams,
            id: this.props.id,
            scores: this.props.scores,
            winner: this.props.winner,
            games: this.props.games,
            wins: this.props.wins,
            tournament: this.props.tournament
        }
    }

    render() {
        return (
            <div>
                {this.state.id}
            </div>
        );
    }
}