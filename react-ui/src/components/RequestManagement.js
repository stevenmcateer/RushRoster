import React, {Component} from 'react';
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import {getAll, getEditedPNMs} from "../scripts";
import Rushee from "./Rushee";

export default class RequestManagement extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            rushees: [],
            edited: []
        }
        this.refreshData = this.refreshData.bind(this)
        this.refreshData()
    }

    // fetch all PNMs from db into state, forcing re-render
    refreshData() {
        console.log("Refreshing data")
        getAll().then(res => {
            console.log(JSON.parse(res.getBody()))
            this.setState({rushees: JSON.parse(res.getBody())})
        })
        getEditedPNMs().then(res => {
            console.log(JSON.parse(res.getBody()))
            this.setState({edited: JSON.parse(res.getBody())})

        })
    }

    render() {
        return (
            <Container>
                <h3>Rushee Edit Requests</h3>
                <Grid columns={2}>
                    <Grid.Column>
                        <h4>Current Rushee Data</h4>
                        <Grid doubling columns={1} padded>
                            {this.state.rushees.map((row) => {
                                return (
                                    <Grid.Column>
                                        <Rushee rushee={row}/>
                                    </Grid.Column>
                                )
                            })}
                        </Grid>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>New Rushee Data</h4>
                        <Grid doubling columns={1} padded>
                            {this.state.edited.map((edits) => {
                                return (
                                    <Grid.Column>
                                        <Rushee rushee={edits}/>
                                    </Grid.Column>
                                )
                            })}
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}