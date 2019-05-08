import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: this.props.teams,
            id: this.props.id,
            scores: this.props.scores,
        }
    }

    render() {
        return (
            <div>
                {this.state.teams[0].abbreviatedName} {this.state.scores[0].value} - {this.state.scores[1].value} {this.state.teams[1].abbreviatedName + '\t'}
                <Link to={`/matches/${this.state.id}`}>Details</Link> 
            </div>
        );
    }
}