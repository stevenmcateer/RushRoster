import React, {Component} from 'react';
import AddRushee from "./AddRushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Card from "semantic-ui-react/dist/commonjs/views/Card/Card";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Rushee from "./Rushee";
import SearchRushee from "./SearchRushee";
import {getAll} from "../scripts";


export default class Voting extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        },
    }

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }
        this.refreshData = this.refreshData.bind(this)
        this.refreshData()
    }

    // fetch all bids from db into state, forcing re-render
    refreshData() {
        // getAll().then(res => {
        //     this.setState({rows: JSON.parse(res.getBody())})
        // })
    }

    render() {
        return (
            <Container id={"ContainerDiv"} className={"ContainerDiv"}>
                <Grid doubling columns={3} padded>
                    <Grid.Column>
                        <SearchRushee />
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
                    </Grid.Column>
                    <Grid.Column>
                        <SearchRushee />
                        <Card>
                            <Card.Content>
                                <Card.Header>Round 2</Card.Header>
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
                    </Grid.Column>
                    <Grid.Column>
                        <SearchRushee />
                        <Card>
                            <Card.Content>
                                <Card.Header>Round 3</Card.Header>
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
                    </Grid.Column>
                </Grid>
                <Button positive>Save Round Results</Button>
            </Container>
        )
    }
}