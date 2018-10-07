import React, {Component} from 'react';
import AddRushee from "./AddRushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import "../App.css"
import {getPnms} from "../scripts"
import Rushee from "./Rushee";
import {Grid} from "semantic-ui-react"; // DB calls


export default class Rushees extends Component {

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
            rows: []
        }

        // fetch all PNMs from db into state
        getPnms().then(res => {
            this.setState({rows: res.rows})
        })
    }

    render() {
        return (

            <Container>
                <AddRushee/>
                <Grid doubling columns={6} padded>
                {this.state.rows.map(row => {
                    return (
                        <Grid.Column>
                        <Rushee rushee={row}/>
                        </Grid.Column>
                    )
                })}
                </Grid>
            </Container>

        )
    }
}

