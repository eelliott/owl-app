import React, { Component } from "react";

export class TeamDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            id: null,
            name: "",
            location: "",
            players: [],
            accounts: [],
            logo: "",
            placement: null,
            ranking: {}
        };
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        fetch(`https://api.overwatchleague.com/teams/${id}`)
        .then(res=>res.json())
        .then(data => {
            this.setState({
                isLoading: false,
                id: id,
                name: data.name,
                location: data.homeLocation,
                players: data.players,
                accounts: data.accounts,
                logo: data.logo,
                placement: data.placement,
                ranking: data.ranking
            });
        })
        .catch(e => {
            console.error("error fetching team data",e);
        });
    }
 // url for player stats = https://api.overwatchleague.com/players/8642?expand=stats
    render() {
        return(
            <div>
                {this.state.isLoading ? <div>loading...</div> : 
                    <div>
                        <div>
                            Socials: 
                            <a href={this.state.accounts[0].value}>
                                Twitter
                            </a>
                            <a href={this.state.accounts[1].value}>
                                FaceBook
                            </a>
                            <a href={this.state.accounts[2].value}>
                                Discord
                            </a>
                            <a href={this.state.accounts[3].value}>
                                YouTube
                            </a>
                        </div>
                        <h3>{this.state.name}</h3>
                        <div>Match Score: {this.state.ranking.matchWin}/{this.state.ranking.matchLoss}</div>
                        <div>Map Score: {this.state.ranking.gameWin}/{this.state.ranking.gameTie}/{this.state.ranking.gameLoss}</div>
                        <img src={this.state.logo} alt="team logo"/>
                        <div>
                            {this.state.players.map(player => 
                                <div key={player.id}>
                                    {player.name}
                                </div>
                            )}
                        </div>
                    </div>
                    
                }
            </div>
        );
    }
}
