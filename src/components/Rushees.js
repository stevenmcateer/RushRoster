import React, { Component } from 'react';
import AddRushee from "./AddRushee";
import Cards from "./Cards";


export default class Rushees extends Component{

    refreshData() {
        console.log("Refreshing data")
        //getRows(this.updateState)
    }

    render() {
        return(
            <AddRushee onAdd={this.refreshData}/>
            //<Cards cards={this.state.cards} onDbCall={this.refreshData.bind(this)}/>

        )
    }
}

