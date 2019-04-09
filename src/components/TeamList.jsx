import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TeamList extends Component {
    render() {
        return (
            <div>
                {this.props.teams.map(team=>(
                    <Link to={`/team/${team.competitor.id}`} key={team.competitor.id}>
                        <h3>{team.competitor.name}</h3>
                        <img 
                            src={team.competitor.logo} 
                            alt={team.competitor.name+`'s Logo`}
                            width="50"
                            height="50"    
                        />
                    </Link>
                ))}
            </div>
        );
    }
}