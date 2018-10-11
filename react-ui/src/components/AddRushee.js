import React, {Component} from 'react'
import {Accordion, Icon, Form, TextArea, Button, Input, Message} from 'semantic-ui-react'
import "../App.css"
import {addPNM, getSignedRequest, printPhoto} from "../scripts";
import ImageUploader from 'react-images-upload';
import {validateEmail, validateName} from './../formValidation';

export default class AddRushee extends Component {

    static defaultProps = {
        refreshData: () => {
        }
    }

    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.state = {major: ''};
        this.state = {description: ''};
        this.state = {graduationyear: ''};
        this.state = {dorm: ''};
        this.state = {phonenumber: ''};
        this.state = {hometown: ''};
        this.state = {grades: ''};
        this.state = {activeIndex: 1};
        this.state = {pictures: []};
        this.state = {photo: ''};
        this.onDrop = this.onDrop.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleGradYearChange = this.handleGradYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDormChange = this.handleDormChange.bind(this);
        this.handleHometownChange = this.handleHometownChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleGradesChange = this.handleGradesChange.bind(this);
    }

    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index
        this.setState({activeIndex: newIndex})
    };

    render() {
        const {activeIndex} = this.state

        return (
            <Accordion styled>
                <Accordion.Title active={activeIndex === 0} index={0}
                                 onClick={this.handleClick}>
                    Add Rushee
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <Form id="form">
                        <Form.Field
                          required
                          id='first'
                          control={Input}
                          label='Name'
                          onChange={this.handleNameChange}
                          value={this.state.name}
                          placeholder='Full Name'
                        />
                        <Form.Field
                          id='second'
                          control={Input}
                          label='Major'
                          onChange={this.handleMajorChange}
                          value={this.state.major}
                          placeholder='CS'
                        />
                        <Form.Field
                          id='third'
                          control={Input}
                          label='Description'
                          onChange={this.handleDescriptionChange}
                          value={this.state.description}
                          placeholder='Bio'
                        />
                        <Form.Field
                          required
                          id='graduationyear'
                          control={Input}
                          label='Description'
                          onChange={this.handleGradYearChange}
                          value={this.state.graduationyear}
                          placeholder='YYYY'
                        />
                        <Form.Field
                          id='hometown'
                          control={Input}
                          label='Hometown'
                          onChange={this.handleHometownChange}
                          value={this.state.hometown}
                          placeholder='Boston'
                        />
                        <Form.Field
                          id='dorm'
                          control={Input}
                          label='Dorm'
                          onChange={this.handleDormChange}
                          value={this.state.dorm}
                          placeholder='D3'
                        />
                        <Form.Field
                          id='phonenumber'
                          control={Input}
                          label='Phone Number'
                          onChange={this.handlePhoneNumberChange}
                          value={this.state.phonenumber}
                          placeholder='774-278-8517'
                        />
                        <Form.Field
                          id='grades'
                          control={Input}
                          label='Grades'
                          onChange={this.handleGradesChange}
                          value={this.state.grades}
                          placeholder='AAB or GPA'
                        />
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose image'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={5242880}
                        />
                        <Form success>
                          <Message success id="sucessDiv" style={{ display: 'None'}} header='Form Completed' content='Successfully submitted a new Rushee' />
                          <Form.Field id='signup-form-submit' control={Button} content='Submit' onClick={this.handleSubmit} />
                        </Form>
                    </Form>
                </Accordion.Content>
            </Accordion>
        )
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleMajorChange(e) {
        this.setState({major: e.target.value});
    }

    handleDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    handleGradYearChange(e) {
        this.setState({graduationyear: e.target.value});
    }

    onDrop(picture) {
        console.log("PICTURE");
        const pic = picture[0];

        console.log(picture[0]);
        console.log("NAME "+picture[0].name);

        console.log("SIZE" + picture[0].size);

        console.log(picture[0]);


        this.setState({
            pictures: picture[0]
        }, ()=>{
          getSignedRequest(this.state.pictures);
        });

        // console.log("done uploading")
        this.setState({photo: "https://s3.us-east-2.amazonaws.com/herokurushroster/" + picture[0].name}, ()=>{
          console.log(this.state.photo)
        });
    }

    handleDormChange(e) {
        this.setState({dorm: e.target.value});
    }

    handlePhoneNumberChange(e) {
        this.setState({phonenumber: e.target.value})
    }

    handleGradesChange(e) {
        this.setState({grades: e.target.value})
    }

    handleHometownChange(e) {
        this.setState({hometown: e.target.value})
    }

    //@TODO: Add picture to DB
    handleSubmit() {

      var photo = this.state.photo;
      console.log("PHOTO IS " + photo)
      if(this.state.photo === ""){
        photo = 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
      }
        let obj = {
            'name': this.state.name,
            'major': this.state.major,
            'description': this.state.description,
            'graduationyear': this.state.graduationyear,
            'photo': photo,
            'dorm': this.state.dorm,
            'hometown': this.state.hometown,
            'grades': this.state.grades,
            'organizationid': '123',
            'phonenumber': this.state.phonenumber
        };

        // Call server
        console.log(obj.name);
        this.state.name = '';
        this.state.major = '';
        this.state.description = '';
        this.state.graduationyear = '';
        this.state.dorm = '';
        this.state.hometown = '';
        this.state.grades = '';
        this.state.phonenumber = '';
        var div = document.getElementById('sucessDiv');
        div.style.display = 'block'
        addPNM(obj).then((res) => {
            console.log(res)
            this.props.refreshData()
        });
        console.log("SUBMITTED DATA");
    }
}
