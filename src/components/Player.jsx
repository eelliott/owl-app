import React, { Component } from 'react';

export class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            id: null,
            name: null,
            homeLocation: null,
            accounts : [],
            attributes: {},
            nationality: null,
            familyName: null,
            givenName: null,
            img: null,
            teams: [],
            stats: {
                all: {},
                heroes: []
            }
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://api.overwatchleague.com/player/${id}?expand=stats`)
        .then(res => res.data)
        .then(data => {
            this.setState({
                isLoading: false,
                id: id,
                name: data.player.name,
            });
        })
        .catch(e => {
            console.error("error fetching player data");    
        });
    }

    render() {
        return (
            <div>
                {this.state.isLoading ? <p>loading...</p> : 
                    <div>
                        {this.state.name}
                    </div>
                }
            </div>
        );
    }
}