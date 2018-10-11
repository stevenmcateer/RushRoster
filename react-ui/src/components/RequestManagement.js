import React, {Component} from 'react';
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import Rushee from "./Rushee";
import Request from "./Request";
import Async from "react-promise";

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
        this.child = React.createRef();
        this.refreshData = this.refreshData.bind(this)
        this.refreshData()
    }

    // fetch all PNMs from db into state, forcing re-render

    refreshData(){

    }
    callChild() {
        this.child.current.createMerged();
    }


    render() {
        console.log("data ready")
        console.log(this.state.edited)
        console.log(this.state.rushees)

        return (
            <Container>
                <h3>Rushee Edit Requests</h3>
                        <Request  />
            </Container>
        )
    }
}
