import React, { Component } from 'react';
import { connect } from 'react-redux';

class TeamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    // componentDidMount() {
    //     fetch("https://api.overwatchleague.com/teams")
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             this.setState({
    //                 teams: result.competitors
    //             });
    //         },
    //         (error) => {
    //             console.error("Fetch for teams failed", error);
    //         }
    //     )

    // }

    render() {
        return (
            <div>
            
                {this.state.teams.map(team=>(
                    <div key={team.name}>
                        <h3>{team.name}</h3>
                        <img 
                            src={team.competitor.logo} 
                            alt={team.competitor.name+`'s Logo`}
                            width="50"
                            height="50"    
                        />
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        teams:state.teams
    }
}

export const ConnectedTeamList = connect(mapStateToProps)(TeamList);