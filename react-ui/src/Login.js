// src/LoginForm.js
import React, { Component } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default(class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      email: '',
      password: ''
    }

    this.signIn = this.signIn.bind(this);
    this.handleemailChange = this.handleemailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  //Handle submit
  signIn(e) {
    e.preventDefault();
    let obj = {
        'email': this.state.email,
        'password': this.state.password,
    };
    // Call server
    console.log(obj)
    getAuthentication(obj).then((res) => {
        console.log("You did it: " + res)
        //this.setState({isAuthenticated: true});
        // this.props.refreshData()
    })
    checkAuthentication(this.state.isAuthenticated);
  }

  //
  handleemailChange(e) {
    this.setState({email: e.target.value});
  }

  //
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }


  //
  render() {
    return(
      <div className='login-form'>
          {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>Log-In to your account</Header>
              <Form size='large' onSubmit={this.signIn}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.email}
                    onChange={this.handleemailChange}
                  />
                  <Button color='teal' fluid size='large' type="submit">Login</Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='#'>Sign Up</a> //TODO
              </Message>
            </Grid.Column>
          </Grid>
      </div>
    );
  }
});

function checkAuthentication(isAuthenticated){
  if(isAuthenticated){
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}

/**
 * @param pnm : JSON Object
 * @returns Promise : Nothing
 */
const BASE_URL = window.location.href + 'api/';
var requestify = require('requestify');
function getAuthentication(pnm) {
    return requestify.post(BASE_URL + 'login', {
        body: JSON.stringify(pnm)
    })
}
