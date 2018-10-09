import React, { Component } from 'react';
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";

export default class RequestManagement extends Component{

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
        return(
            <Container>
                <h3>Rushee Edit Requests</h3>
                <Grid columns={2}>
                    <Grid.Column>
                        <h4>Current Rushee Data</h4>

                    </Grid.Column>
                    <Grid.Column>
                        <h4>New Rushee Data</h4>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}