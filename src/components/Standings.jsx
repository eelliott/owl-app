import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Standings extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            isLoading: true,
            viewer: '0',
            stageNum: '0',
            owl_divisions: {},
            season:{},
            stages:[], 
            ranks: []
        }
    }   

    componentDidMount() {
        fetch('https://api.overwatchleague.com/standings').then(res => res.json())
        .then(data => {
            let ranks = [];
            for (let team in data.ranks.content) {
                ranks.push(data.ranks.content[team]);
            }

            this.setState({
                isLoading: false,
                owl_divisions: data.owl_divisions,
                season: data.seasons,
                stages:data.stages,
                ranks: ranks
            });
        })
        .catch(e => {
            console.error("error fetching standings",e);
        });
    }

    changeView(e) {
        this.setState({
            // ranks = 0, stages = 1, season = 2
            viewer:e.target.id
        });
    }

    changeStage(e) {
        this.setState({
            stageNum: e.target.id
        })
    }

    render() {
        let component = <div>undefined standings</div>;
        switch (this.state.viewer) {
            case "1":
                let stages = this.state.stages;
                component = ( 
                    <div>
                        <div>
                            <button id="0" onClick={this.changeStage.bind(this)}>Stage 1</button>
                            <button id="1" onClick={this.changeStage.bind(this)}>Stage 2</button>
                            <button id="2" onClick={this.changeStage.bind(this)}>Stage 3</button>
                            <button id="2" onClick={this.changeStage.bind(this)}>Stage 4</button>
                        </div>
                        {stages[parseInt(this.state.stageNum)].teams.map((team)=> 
                            <div key={team.id}>
                                <Link  to={`/teams/${team.id}`}>
                                    <h1>{team.name}</h1>
                                </Link>
                                <div>
                                    Standings:
                                    <div>Wins:{team.standings.wins}</div>
                                    <div>Losses:{team.standings.losses}</div>
                                    <div>Points:{team.standings.points}</div>
                                </div>
                            </div>
                        )}
                    </div> 
                );
                break;
            case "2":
                
                break;
            default:
                let ranks = this.state.ranks;
                component = ( 
                    <div>
                        {ranks.map((team)=>
                            <div key={team.competitor.id}>
                                <Link to={`/teams/${team.competitor.id}`}>
                                    <h1>{team.competitor.name}</h1>
                                </Link>
                                <div>Match Score: {team.records[0].matchWin}-{team.records[0].matchLoss}</div>
                                <div>Map Score: {team.records[0].gameWin}/{team.records[0].gameTie}/{team.records[0].gameLoss}</div>
                            </div>
                        )}
                    </div> 
                );
            
        }
        return (
            <div>
                <div>
                    <button id="0" onClick={this.changeView.bind(this)}>Ranks</button>
                    <button id="1" onClick={this.changeView.bind(this)}>Stages</button>
                    <button id="2" onClick={this.changeView.bind(this)}>Season</button>
                </div>
                { this.state.isLoading ? <p>loading...</p> : component }
            </div>
        );
    }
}