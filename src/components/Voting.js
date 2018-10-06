import React, { Component } from 'react';
import AddRushee from "./AddRushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Card from "semantic-ui-react/dist/commonjs/views/Card/Card";


export default class Voting extends Component{

    render(){
        return (
            <Container className='ui page grid'>
                <div className='three column row'>

                    {/*<Cards cards={this.state.cards} onDbCall={this.refreshData.bind(this)}/>*/}
                </div>
            </Container>
        )
    }
}