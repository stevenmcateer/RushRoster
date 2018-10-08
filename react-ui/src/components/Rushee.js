import React, {Component} from "react";
import {Card, Image, Icon, Modal} from "semantic-ui-react";

export default class Rushee extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        },
        rushee: {},
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal trigger={
            <div id={"ContainerDiv"} className={"ContainerDiv"}>
                <Card>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                    <Card.Content>
                        <Card.Header>{this.props.rushee.name}</Card.Header>
                        <Card.Meta>
                            <span
                                className='date'>{this.props.rushee.major + " '" + this.props.rushee.graduationyear}</span>
                        </Card.Meta>
                        <Card.Description>{this.props.rushee.description}</Card.Description>
                    </Card.Content>
                </Card>
            </div>}>
                <Modal.Header>{this.props.rushee.name}</Modal.Header>
            </Modal>
        );
    }

}
