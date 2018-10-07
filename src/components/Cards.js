import React, {Component} from "react";
import {Container} from "semantic-ui-react";
import Rushee from "./Rushee.js";

export default class Posts extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        },
        rushees: []
    }

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    {this.props.rushees.map(rushee => {
                        return <Rushee rushee={rushee}/>
                    })}
                </Container>
            </div>
        );
    }
}