import React, {Component} from "react";
import {Card, Image, Icon, Modal, Form, TextArea} from "semantic-ui-react";
import Header from "./Header";
import {deletePNM, editPNM, getAll} from '../scripts';
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";

export default class Request extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        },
        edited: [],
        rushees: []
    }

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            rusheeEdits: []
        }
        // this.getAllNPMS = this.getAllNPMS.bind(this)
        // getAll().then(res => {
        //     console.log("all rushees")
        //     let rushees = JSON.parse(res.getBody())
        //     console.log("type: " + typeof rushees)
        //     console.log("rushees: " + rushees)
        //     console.log("stringify: " + JSON.stringify(rushees))
        //
        //     this.setState({rushees: rushees}, this.createMerged())
        // })
    }


    createMerged () {
        let rusheeEdits = {
            pnmid: "",
            organizationid: "",
            name: "",
            major: "",
            description: "",
            graduationyear: "",
            hometown: "",
            dorm: "",
            phonenumber: "",
            grades: "",
            editRequests: []
        }
        console.log("current state before mapping props: " + JSON.stringify(this.state))

        this.props.edited.map((edit) => {
            console.log("mapping through props:edited")
            console.log(edit)
            console.log("state while mapping through props:edited -> "+JSON.stringify(this.state))
            this.props.rushees.map((rushee) => {
                console.log("rushee")
                console.log(rushee)
                if (edit.pnmid === rushee.pnmid) {
                    console.log("equal")
                    rusheeEdits.pnmid = rushee.pnmid
                    rusheeEdits.organizationid = rushee.organizationid
                    rusheeEdits.name = rushee.name
                    rusheeEdits.major = rushee.major
                    rusheeEdits.description = rushee.description
                    rusheeEdits.graduationyear = rushee.graduationyear
                    rusheeEdits.hometown = rushee.hometown
                    rusheeEdits.dorm = rushee.dorm
                    rusheeEdits.phonenumber = rushee.phonenumber
                    rusheeEdits.grades = rushee.grades
                    rusheeEdits.editRequests.append(edit)
                }
            })
        })
        this.setState({rusheeEdits: rusheeEdits})
        console.log("rusheeEdit being added: " + JSON.stringify(rusheeEdits))
    }

    wow = () => this.setState({show: false}, () => console.log("closing"))
    show = () => this.setState({show: true}, () => console.log("show true"))


    render() {
        return (

            <Modal
                open={this.state.show}
                onClose={this.wow}
                trigger={
                    <div id={"ContainerDiv"} className={"ContainerDiv"}>
                        <Card onClick={this.show}>
                            {/*<Image src={this.state.rushees.photo}/>*/}
                            <Card.Content>
                                <Card.Header>{this.state.rusheeEdits.name}</Card.Header>
                                <Card.Meta>
                                <span
                                    className='date'>{this.state.rusheeEdits.major + " '" + this.state.rusheeEdits.graduationyear}</span>
                                </Card.Meta>
                                <Card.Description>{this.state.rusheeEdits.description}</Card.Description>
                            </Card.Content>
                        </Card>
                    </div>} closeIcon>
                {/*end of trigger*/}
                <Modal.Header>
                    {this.state.rusheeEdits.name}
                </Modal.Header>

                <Modal.Content image>
                    <Grid columns={2}>
                        <Grid.Column>
                            <h3>Current Info</h3>
                            {/*<Image wrapped size='medium' src={this.props.rushee.photo}/>*/}

                            <Modal.Description>
                                <h4>Name</h4>
                                <p> {this.state.rusheeEdits.name}</p>

                                <h4>Major</h4>
                                <p> {this.state.rusheeEdits.major}</p>

                                <h4>Description</h4>
                                <p> {this.state.rusheeEdits.description}</p>

                                <h4>Graduation Year</h4>
                                <p> {this.state.rusheeEdits.graduationyear}</p>

                                <h4>Hometown</h4>
                                <p> {this.state.rusheeEdits.hometown}</p>

                                <h4>Dorm</h4>
                                <p> {this.state.rusheeEdits.dorm}</p>

                                <h4>Phone Number</h4>
                                <p> {this.state.rusheeEdits.phonenumber}</p>

                                <h4>Grades</h4>
                                <p> {this.state.rusheeEdits.grades}</p>

                            </Modal.Description>

                        </Grid.Column>
                        <Grid.Column>
                            <h3>New Info</h3>
                            {/*<Image wrapped size='medium' src={this.props.rushee.photo}/>*/}

                            <Modal.Description>
                                <h4>Name</h4>
                                <p> {this.props.edited.name}</p>

                                <h4>Major</h4>
                                <p> {this.props.edited.major}</p>

                                <h4>Description</h4>
                                <p> {this.props.edited.description}</p>

                                <h4>Graduation Year</h4>
                                <p> {this.props.edited.graduationyear}</p>

                                <h4>Hometown</h4>
                                <p> {this.props.edited.hometown}</p>

                                <h4>Dorm</h4>
                                <p> {this.props.edited.dorm}</p>

                                <h4>Phone Number</h4>
                                <p> {this.props.edited.phonenumber}</p>

                                <h4>Grades</h4>
                                <p> {this.props.edited.grades}</p>

                            </Modal.Description>

                        </Grid.Column>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={this.wow}
                        positive
                        labelPosition='right'
                        icon='checkmark'
                        content='Yes'
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}