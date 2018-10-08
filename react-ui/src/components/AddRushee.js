import React, {Component} from 'react'
import {Accordion, Icon, Form, TextArea, Button} from 'semantic-ui-react'
import "../App.css"
import {addPNM} from "../scripts";
import ImageUploader from 'react-images-upload';


export default class AddRushee extends Component {

    static defaultProps = {
        refreshData : () => {}
    }


    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.state = {major: ''};
        this.state = {description: ''};
        this.state = {graduationyear: ''};
        this.state = {activeIndex: 1};
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMajorChange = this.handleMajorChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleGradYearChange = this.handleGradYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                <Accordion.Title className="accordion-button" active={activeIndex === 0} index={0}
                                 onClick={this.handleClick}>
                    Add Rushee
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
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
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose image'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.png']}
                            maxFileSize={5242880}
                        />
                        <Button onClick={this.handleSubmit} type='submit'>Add Rushee</Button>
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
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    //@TODO: Add picture to DB
    handleSubmit() {
        let obj = {
            'name': this.state.name,
            'major': this.state.major,
            'description': this.state.description,
            'graduationyear': this.state.graduationyear,
            'organizationid' : '123'
        };

        // Call server
        console.log(obj)
        addPNM(obj).then((res) => {
            // Refresh cards in Rushees
            console.log(res)
            this.props.refreshData()
        })
    }

}
