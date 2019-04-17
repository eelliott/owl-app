import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Match extends Component {
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
        console.log(this.props.teams["0"])
        return (
            <div>
                {this.props.id}
            </div>
        );
    }
}