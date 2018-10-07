import React, { Component } from 'react';


export default class Header extends Component{

    render(){
        return (
            <div id={'appHeader'}>
                <h1 align="center">Recruitment Larry</h1>
                <a align="right">Log Out</a>
            </div>
        )
    }
}