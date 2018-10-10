import React, { Component } from 'react';
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import {eat_cookies, validate_cookie} from './../cookies';


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
                        <Button inverted color={'white'} onClick={logOff}>Log out</Button>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

function logOff(){
  eat_cookies();
  validate_cookie();
}
