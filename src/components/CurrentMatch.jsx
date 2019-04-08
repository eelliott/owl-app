import React, { Component } from "react";
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

class CurrentMatch extends Component {
    render() {
        console.log(this.props.live_match);
        return(
            <div>
                CurrentMatch
                <button onClick={()=>(this.props.updateLiveMatch())}>Refresh</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        "live-match":state.live_match
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateLiveMatch() {
            dispatch(mutations.updateLiveMatch());
        }
    }
}

export const ConnectedCurrentMatch = connect(mapStateToProps,mapDispatchToProps)(CurrentMatch);