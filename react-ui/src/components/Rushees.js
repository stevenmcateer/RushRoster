import React, {Component} from 'react';
import AddRushee from "./AddRushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import "../App.css"
import {getAll, getPnms} from "../scripts"
import Rushee from "./Rushee";
import {Grid} from "semantic-ui-react";
import SearchRushee from "./SearchRushee"; // DB calls


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
        this.refreshData = this.refreshData.bind(this)
        this.refreshData()
    }

    // fetch all PNMs from db into state, forcing re-render
    refreshData() {
        console.log("Refreshing data")
        getAll().then(res => {
            this.setState({rows: JSON.parse(res.getBody())})
        })
    }


    update = () => console.log("Updated")

    render() {
        return (

            <Container>
                <AddRushee refreshData={this.refreshData}/>
                <SearchRushee/>
                <Grid doubling columns={6} padded>
                    {this.state.rows.map((row) => {
                        return (
                            <Grid.Column>
                                <Rushee rushee={row} callback={this.refreshData}/>
                            </Grid.Column>
                        )
                    })}
                </Grid>
            </Container>

        )
    }
}
