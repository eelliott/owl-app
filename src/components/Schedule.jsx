import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Match } from './Match';

export class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            curr_stage: 1,
            stages: [
                {
                    id: 0,
                    name: "Stage 1",
                    matches: [],
                    weeks: []
                },
                {
                    id: 1,
                    name: "Stage 2",
                    matches: [],
                    weeks: []
                },
                {
                    id: 2,
                    name: "Stage 3",
                    matches: [],
                    weeks: []
                },
                {
                    id: 3,
                    name: "Stage 4",
                    matches: [],
                    weeks: []
                }
            ],
            playoff_matches: []
        };
    }
    
    componentDidMount() {
        fetch('https://api.overwatchleague.com/schedule')
        .then(res => res.json())
        .then(data => {
            this.setState({
                isLoading: false,
                stages: data.data.stages,

            });
        })
        .catch(e => console.error("Error fetching schedule data,",e));
    }

    changeStage(e) {
        this.setState({
            curr_stage: parseInt(e.target.id),
            playoff_matches: this.state.stages[parseInt(e.target.id)].matches
                            .filter(match => match.tournament.type === "PLAYOFFS" && match.status === "CONCLUDED")
        });
    }

    render() {
        return (
            <div>
                {this.isLoading ? <p>loading...</p> : 
                    <div>
                        <div>
                            <button id="0" onClick={this.changeStage.bind(this)}>Stage 1</button>
                            <button id="1" onClick={this.changeStage.bind(this)}>Stage 2</button>
                            <button id="2" onClick={this.changeStage.bind(this)}>Stage 3</button>
                            <button id="3" onClick={this.changeStage.bind(this)}>Stage 4</button>
                        </div>
                        <h2>{this.state.stages[this.state.curr_stage].name}</h2>
                            {this.state.stages[this.state.curr_stage].weeks.map(week => (
                                <div key={week.id}>
                                    <h5>{week.name}</h5>
                                    {week.matches.map(match =>
                                        <Link key ={match.id} to={`/matches/${match.id}`}>
                                            <Match 
                                                id={match.id} 
                                                teams={match.competitors}
                                                scores={match.scores}
                                                winner={match.winner}
                                                games={match.games}
                                                wins={match.wins}
                                                tournament={match.tournament}
                                            />
                                        </Link>
                                    )}
                                </div>
                            ))}    
                        <h5>Playoffs</h5>
                        {this.state.playoff_matches.length <= 0 ? <div>TBD</div> : this.state.playoff_matches.map(match => 
                            <div key={match.id}>
                                <Link key ={match.id} to={`/matches/${match.id}`}>
                                    <Match 
                                        id={match.id} 
                                        teams={match.competitors}
                                        scores={match.scores}
                                        winner={match.winner}
                                        games={match.games}
                                        wins={match.wins}
                                        tournament={match.tournament}
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }
}
