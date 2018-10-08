import React, {Component} from "react";
import {Card, Image, Icon, Modal, Form, TextArea} from "semantic-ui-react";
import Header from "./Header";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";

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


    handleEditClick() {
        this.setState({userIsEditing: true});
    }

    handleSubmitClick() {
        this.setState({userIsEditing: false});
    }
    handleDeleteClick () {

    }

    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.state = {userIsEditing: false};
    }

    render() {
        let currentUI;
        const userIsEditing = this.state.userIsEditing;

        if (userIsEditing === false) {
            currentUI = <Modal trigger={
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
                </div>} closeIcon>
                <Modal.Header>
                    <Grid doubling columns={3}>
                        <Grid.Column>
                            {this.props.rushee.name}
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            <Button onClick={this.handleEditClick}>Edit Info</Button>
                            <Button negative onClick={this.handleDeleteClick}>Delete Rushee</Button>
                        </Grid.Column>
                    </Grid>
                </Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                    <Modal.Description>
                        <h4>Name</h4>
                        <p> {this.props.rushee.name}</p>

                        <h4>Major</h4>
                        <p> {this.props.rushee.major}</p>

                        <h4>Description</h4>
                        <p> {this.props.rushee.description}</p>

                        <h4>Graduation Year</h4>
                        <p> {this.props.rushee.graduationyear}</p>

                        <h4>Hometown</h4>
                        <p> {this.props.rushee.hometown}</p>

                        <h4>Dorm</h4>
                        <p> {this.props.rushee.dorm}</p>

                        <h4>Phone Number</h4>
                        <p> {this.props.rushee.phonenumber}</p>

                        <h4>Grades</h4>
                        <p> {this.props.rushee.grades}</p>

                    </Modal.Description>
                </Modal.Content>
            </Modal>

        } else if (userIsEditing === true) {
            currentUI = <Modal trigger={
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
                </div>} closeIcon>
                <Modal.Header>{this.props.rushee.name}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                    <Modal.Description>
                        <Form id="form">
                            <Form.Field>
                                <label>Name</label>
                                <input id="first" placeholder='First Last' value={this.state.name}
                                       onChange={this.handleNameChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Major</label>
                                <input id="major" placeholder='CS' value={this.state.major}
                                       onChange={this.handleMajorChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <TextArea id={"description"} placeholder='Bio' value={this.state.description}
                                          onChange={this.handleDescriptionChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Graduation Year</label>
                                <input id="graduationyear" placeholder='YYYY' value={this.state.graduationyear}
                                       onChange={this.handleGradYearChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Hometown</label>
                                <input id="hometown" placeholder='Boston' value={this.state.hometown}
                                       onChange={this.handleHometownChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Dorm</label>
                                <input id="dorm" placeholder='D3' value={this.state.dorm}
                                       onChange={this.handleDormChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Phone Number</label>
                                <input id="phonenumber" placeholder='774-278-8517' value={this.state.phonenumber}
                                       onChange={this.handlePhoneNumberChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Grades</label>
                                <input id="grades" placeholder='AAB or GPA' value={this.state.grades}
                                       onChange={this.handleGradesChange}/>
                            </Form.Field>
                            <Button type={"submit"} onClick={this.handleSubmitClick}>Submit</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        }
        return (
            <div>
                {currentUI}
            </div>

        );
    }
}

