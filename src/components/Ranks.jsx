import React, { Component } from 'react';

export class Ranks extends Component {
    render() {
        let ranks = this.props.ranks;
        let view = this.props.viewer;
        return (
            <div>
                { view === 0 ?
                    ranks.map((team)=>
                    <div key={team.competitor.id} to={`/teams/`+team.competitor.id}>
                        <h1>{team.competitor.name}</h1>
                        <p>Score: {team.records[0].matchWin}/{team.records[0].matchDraw}/{team.records[0].matchLoss}</p>
                        <img src={team.competitor.logo} alt="teamlogo"/>
                    </div>)
                    : {}
            }
            </div>
        );
    }

}