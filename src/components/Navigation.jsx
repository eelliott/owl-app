import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navigation extends Component {
    render () {
        return(
            <div>
                Home Teams Players Standings
            </div>
        );
    }
}

const mapStateToProps = (state) => state;

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);