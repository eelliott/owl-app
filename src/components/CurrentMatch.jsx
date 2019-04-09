import React, { Component } from "react";

export class CurrentMatch extends Component {
    render() {
        console.log(this.props.live_match);
        return(
            <div>
                CurrentMatch
                <button >Refresh</button>
            </div>
        );
    }
}
