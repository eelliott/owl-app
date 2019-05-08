import React, { Component } from "react";
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';


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

    componentDidMount() {
        fetch('https://api.overwatchleague.com/live-match')
        .then(res=>res.json())
        .then(data => {
            this.setState({
                isLoading: false,
                isLive: data.data.liveMatch.length < 0,
                live_match: data.data.liveMatch,
                next_match: data.data.nextMatch
            });
        })
        .catch(e => {
            console.error('Error when fetching live-match data,', e);
        });
    }

    render() {
        let component = null;
        if (!this.state.isLive) {
            component = (
                <div>
                    No matches today, click <Link to='/schedule'>Here</Link> for the schedule. 
                </div>
            );
        } else {
            let team1 = this.state.live_match.competitors[0];
            let team2 = this.state.live_match.competitors[1];
            component = (
                <div>
                    <Link to={`/teams/${team1.id}`}>{team1.name}</Link> vs. <Link to={`/team/${team2.id}`}>{team2.name}</Link>
                    <Link to={`matches/${this.state.live_match.id}`}>Match Details</Link>
                </div>
            );
        }
        return(
            <div>
                <ReactPlayer url="https://twitch.tv/overwatchleague" playing/>
                {this.state.isLoading ? <p>loading...</p> : component }
            </div>
        );
    }
}
