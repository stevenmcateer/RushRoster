import React, { Component } from 'react';
import AddRushee from "./AddRushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Card from "semantic-ui-react/dist/commonjs/views/Card/Card";


export default class Voting extends Component{

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        }
    }

    constructor(props){
        super(props);
    }

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