import React, {Component} from "react";
import {Card} from "semantic-ui-react";

export default class Post extends Component {


    constructor(props) {
        super(props);
    }

    static defaultProps = {
        round: {
            name: 'John'

        },
    };


    render() {
        return (
            <div id={"ContainerDiv"} className={"ContainerDiv"}>
                <Card>
                    <Card.Content>
                        <Card.Header>Round</Card.Header>
                        <Card.Meta>
                            <span className='date'>Date of Voting</span>
                        </Card.Meta>
                    </Card.Content>
                </Card>
            </div>
        );
    }

}
