import React, { Component } from 'react';
import AddRushee from "./AddRushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Card from "semantic-ui-react/dist/commonjs/views/Card/Card";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import {getPnms} from "../scripts";
import {Grid} from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Rushee from "./Rushee";



export default class Voting extends Component{

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        },
    }

    constructor(props){
        super(props);
        this.state = {
            rows: []
        }

        // fetch all PNMs from db into state
        getPnms().then(res => {
            this.setState({rows: res.rows})
        })
    }

    render(){
        return (
            <Container id={"ContainerDiv"} className={"ContainerDiv"}>
                {this.state.rows.map(row => {

                })}
                <Card>
                    <Card.Content>
                        <Card.Header>Round 1</Card.Header>
                        <Card.Meta>
                            <span className='date'>Monday, Nov. 6th</span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content>
                        <div role='list' className='ui list'>
                            <div role='listitem' className='item'>
                                <img
                                    src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
                                    className='ui avatar image'
                                />
                                <div className='content'>
                                    <a className='header'>Bidee</a>
                                    <div className='description'>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
                <Button positive>Save Round Results</Button>
            </Container>
        )
    }
}