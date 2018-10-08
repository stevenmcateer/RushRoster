import React, { Component } from 'react';
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";


export default class Header extends Component{

    render(){
        return (
            <div id={'appHeader'}>
                <Grid columns={3}>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <h1 align="center">Rush Roster</h1>
                    </Grid.Column>
                    <Grid.Column>
                        <Button inverted color={'white'}>Log out</Button>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}