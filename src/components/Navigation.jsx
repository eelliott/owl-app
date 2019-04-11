import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navigation extends Component {
    render () {
        return(
            <div className="navigation">
                <Link to='/'>Home </Link> 
                <Link to='/'>Live Match </Link> 
                <Link to='/schedule'>Schedule </Link> 
                <Link to='/standings'>Standings</Link>
            </div>
        );
    }
}