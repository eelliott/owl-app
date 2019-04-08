import React, { Component } from 'react';
import { connect } from 'react-redux';

class TeamList extends Component {
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
                {this.props.teams.map(team=>(
                    <div key={team.competitor.name}>
                        <h3>{team.competitor.name}</h3>
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
    console.log(state.teams);
    return {
        teams:state.teams.competitors
    }
}

export const ConnectedTeamList = connect(mapStateToProps)(TeamList);