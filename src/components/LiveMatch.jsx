import React, { Component } from "react";

export class LiveMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLive: false,
            live_match: {},
            next_match: {}
        }
    }

    // https://api.overwatchleague.com/matches/{gameId}
    componentDidMount() {
        fetch('https://api.overwatchleague.com/live-match')
        .then(res=>res.json())
        .then(data => {
            this.setState({
                isLoading: false,
                isLive: data.data.liveMatch !== {},
                live_match: data.data.liveMatch,
                next_match: data.data.nextMatch
            });
        })
        .catch(e => {
            console.error('Error when fetching live-match data,', e);
        });
    }

    render() {
        return(
            <div>
                {this.state.isLoading ? <p>loading...</p> :  <p>{this.state.isLive.toString()}</p> }
            </div>
        );
    }
}
