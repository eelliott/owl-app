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

    // https://api.overwatchleague.com/matches/{gameId}
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
            component = (
                <div>
                    
                    
                </div>
            );
        }
        return(
            <div>
                <ReactPlayer url="https://twitch.tv/overwatchleague"/>
                {this.state.isLoading ? <p>loading...</p> : component }
            </div>
        );
    }
}
