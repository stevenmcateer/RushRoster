import React, {Component} from "react";
import {Card, Image, Icon, Modal, Form, TextArea} from "semantic-ui-react";
import Header from "./Header";
import {editPNM} from '../scripts';
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
    static edits = {


    }


    handleEditClick() {
        this.setState({userIsEditing: true});

    }

    handleSubmitClick() {
        if(this.state.changes){
          var name = (this.state.nameChange ? this.state.name : "")
          var major = (this.state.majorChange ? this.state.major : "")
          var description = (this.state.descriptionChange ? this.state.description : "")
          var graduationyear = (this.state.graduationyearChange ? this.state.graduationyear : "")
          var hometown = (this.state.hometownChange ? this.state.hometown : "")
          var dorm = (this.state.dormChange ? this.state.dorm : "")
          var phonenumber = (this.state.phonenumberChange ? this.state.phonenumber : "")
          var grades = (this.state.gradesChange ? this.state.grades: "" )

          let obj = {
                  "pnmid": this.props.rushee.pnmid,
                  "organizationid" : this.props.rushee.organizationid,
                  "name" : name,
                  "major": major,
                  "description": description,
                  "graduationyear": graduationyear,
                  "hometown": hometown,
                  "dorm": dorm,
                  "phonenumber": phonenumber,
                  "grades": grades
            }
          console.log(obj)
          editPNM(obj).then((res) => {
              // Refresh cards in Rushees
              console.log(res)
              this.props.refreshData()
          })
          console.log("SUBMITTED DATA")

        }

        this.setState({userIsEditing: false});
        this.setState({changes: false});
        this.setState({nameChange: false})
        this.setState({majorChange: false})
        this.setState({descriptionChange: false})
        this.setState({graduationyearChange: false})
        this.setState({hometownChange: false})
        this.setState({dormChange: false})
        this.setState({phonenumberChange: false})
        this.setState({gradesChange: false})

    }
    handleDeleteClick () {

    }

    handleNameChange(e){
      this.setState({changes: true})

      this.setState({nameChange: true})
      this.setState({name: e.target.value})


    }
    handleMajorChange(e){
      this.setState({changes: true})

      this.setState({majorChange: true})
      this.setState({major: e.target.value})


    }
    handleDescriptionChange(e){
      this.setState({changes: true})
      this.setState({descriptionChange: true})
      this.setState({description: e.target.value})

    }

    handleHometownChange(e){
      this.setState({changes: true})

      this.setState({hometownChange: true})
      this.setState({hometown: e.target.value})


    }
    handleGraduationYearChange(e){
      this.setState({changes: true})

        this.setState({graduationyearChange: true})
        this.setState({graduationyear: e.target.value})

    }
    handleGradesChange(e){
      this.setState({changes: true})
      this.setState({gradesChange: true})
      this.setState({grades: e.target.value})
    }

    handleDormChange(e){
      this.setState({changes: true})
      this.setState({dormChange: true})
      this.setState({dorm: e.target.value})


    }
    handlePhoneNumberChange(e){
      this.setState({changes: true})
      this.setState({phonenumberChange: true})
      this.setState({phonenumber: e.target.value})


    }

    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleHometownChange = this.handleHometownChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleGraduationYearChagne = this.handleGraduationYearChange.bind(this);
        this.handleHometownChange = this.handleHometownChange.bind(this);
        this.handleDormChange = this.handleDormChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleGradesChange = this.handleGradesChange.bind(this);
        this.state = {userIsEditing: false};


        this.state.name = this.props.rushee.name;
        this.state.major = this.props.rushee.major;
        this.state.description = this.props.rushee.description;
        this.state.graduationyear = this.props.rushee.graduationyear;
        this.state.hometown = this.props.rushee.hometown;
        this.state.dorm = this.props.rushee.dorm;
        this.state.phonenumber = this.props.rushee.phonenumber;
        this.state.grades = this.props.rushee.grades;

    }

    render() {
        let currentUI;
        const userIsEditing = this.state.userIsEditing;

        if (userIsEditing === false) {
            currentUI = <Modal trigger={
                <div id={"ContainerDiv"} className={"ContainerDiv"}>
                    <Card>
                        <Image src={this.props.rushee.photo}/>
                        <Card.Content>
                            <Card.Header>{this.state.name}</Card.Header>
                            <Card.Meta>
                                <span
                                    className='date'>{this.state.major + " '" + this.state.graduationyear}</span>
                            </Card.Meta>
                            <Card.Description>{this.state.description}</Card.Description>
                        </Card.Content>
                    </Card>
                </div>} closeIcon>
                <Modal.Header>
                    <Grid doubling columns={3}>
                        <Grid.Column>
                            {this.state.name}
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
                    <Image wrapped size='medium' src={this.props.rushee.photo}/>
                    <Modal.Description>
                        <h4>Name</h4>
                        <p> {this.state.name}</p>

                        <h4>Major</h4>
                        <p> {this.state.major}</p>

                        <h4>Description</h4>
                        <p> {this.state.description}</p>

                        <h4>Graduation Year</h4>
                        <p> {this.state.graduationyear}</p>

                        <h4>Hometown</h4>
                        <p> {this.state.hometown}</p>

                        <h4>Dorm</h4>
                        <p> {this.state.dorm}</p>

                        <h4>Phone Number</h4>
                        <p> {this.state.phonenumber}</p>

                        <h4>Grades</h4>
                        <p> {this.state.grades}</p>

                    </Modal.Description>
                </Modal.Content>
            </Modal>

        } else if (userIsEditing === true) {
            currentUI = <Modal trigger={
                <div id={"ContainerDiv"} className={"ContainerDiv"}>
                    <Card>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
                        <Card.Content>
                            <Card.Header>{this.state.name}</Card.Header>
                            <Card.Meta>
                                <span
                                    className='date'>{this.state.major + " '" + this.state.graduationyear}</span>
                            </Card.Meta>
                            <Card.Description>{this.state.description}</Card.Description>
                        </Card.Content>
                    </Card>
                </div>} closeIcon>
                <Modal.Header>{this.state.name}</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={this.props.rushee.photo}/>
                    <Modal.Description>
                        <Form id="form" editable="true">
                            <Form.Field>
                                <label>Name</label>
                                <input id="first" placeholder="First Last" value={this.state.name}
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
                                       onChange={this.handleGraduationYearChagne}/>
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
