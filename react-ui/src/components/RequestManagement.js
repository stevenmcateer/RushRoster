import React, {Component} from 'react';
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import {getAll, getEditedPNMs} from "../scripts";
import Rushee from "./Rushee";
import Request from "./Request";

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
            edited: [],
            rushees: []
        }
        this.refreshData = this.refreshData.bind(this)
        this.refreshData()
    }

    // fetch all PNMs from db into state, forcing re-render
    refreshData() {
        console.log("Refreshing data")

        getEditedPNMs().then(res => {
            console.log("edits")
            console.log(JSON.parse(res.getBody()))
            this.setState({edited: JSON.parse(res.getBody())})
        })
        getAll().then(res => {
            console.log("all rushees")
            let rushees = JSON.parse(res.getBody())
            console.log("type: " + typeof rushees)
            console.log("rushees: " + rushees)
            console.log("stringify: " + JSON.stringify(rushees))

            this.setState({rushees: rushees}, this.createMerged())
        })
    }


    render() {
        return (
            <Container>
                <h3>Rushee Edit Requests</h3>
                {this.state.edited.map((edit) => {
                    return (
                        <Request refreshData={this.refreshData} edited={this.state.edited} rushees={this.state.rushees}/>
                    )
                })}
            </Container>
        )
    }
}