import React, { Component } from "react";

export class TeamDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.team.name,
            location:this.props.team.ComponenthomeLocation,
            players: this.props.team.players,
            logo: this.props.team.logo
        };
    }
    render() {
        return(
            <div>
                <h1>{this.state.name}</h1>
                <img src={this.state.logo} alt={this.state.name+`'s Logo`}/>
            </div>
        );
    }
}
