import React, { Component } from 'react';
import { Ranks } from './Ranks';

export class Standings extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            isLoading: true,
            viewer: 0,
            owl_divisions: {},
            season:{},
            stages:[]
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
        this.setState(
            {
                viewer:parseInt(e.target.id)
            }
        );
    }

    render() {
        let ranks = this.state.ranks;
        return (
            <div>
                <div>
                    <button id="0" onClick={this.changeView.bind(this)}>Ranks</button>
                    <button id="1" onClick={this.changeView.bind(this)}>Stages</button>
                    <button id="2" onClick={this.changeView.bind(this)}>Season</button>
                </div>
                {this.state.isLoading ? <p>loading...</p> : 
                    <Ranks ranks={this.state.ranks} viewer={this.state.viewer}/>
                }
            </div>
        );
    }
}