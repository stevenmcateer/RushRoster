// src/LoginForm.js
import React, { Component } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';
import {getAuthentication} from './scripts';

const cookies = new Cookies();

export default (class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password:  '',
    }

    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  //Handle submit
  signIn(e) {
    e.preventDefault();
    let obj = {
        'email': this.state.email,
        'password': this.state.password,
    };

    getAuthentication(obj).then((res) => {
      console.log(res);
      eat_cookies();
      bake_cookie(res);
      show_cookies();
      checkAuthentication();
    })
  }

  // Login Functions
  handleEmailChange(e) {this.setState({email: e.target.value});}
  handlePasswordChange(e) {this.setState({password: e.target.value});}

  //
  render() {
    return(
      <div className='login-form'>
          {}
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
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={this.state.email} onChange={this.handleEmailChange}/>
                  <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' value={this.state.password} onChange={this.handlePasswordChange}/>
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

function checkAuthentication(){
  console.log("Check Auth: " + cookies.get('isAuthenticated'))
  if(cookies.get('isAuthenticated')){
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}

// Cookie Functions
function bake_cookie(response){
  console.log('Baking cookies...');
  cookies.set('username', response['username'], { expires: new Date(Date.now() + 3600), path: '/' });
  cookies.set('organization', response['organization'], { expires: new Date(Date.now() + 3600), path: '/' });
  cookies.set('permission', response['permission'], { expires: new Date(Date.now() + 3600),  path: '/' });
  cookies.set('isAuthenticated', response['isAuthenticated'], { expires: new Date(Date.now() + 3600),  path: '/' });
  console.log('Done!');
}

function show_cookies(){
  console.log('------ Current Cookies ------');
  console.log('Username: ' + cookies.get('username'));
  console.log('Organization: ' + cookies.get('organization'));
  console.log('Permission Level: ' + cookies.get('permission'));
  console.log('isAuthenticated: ' + cookies.get('isAuthenticated'));
}

function eat_cookies(){
  console.log("Nom Nom Nom")
  cookies.remove('username');
  cookies.remove('organization');
  cookies.remove('permission');
  cookies.remove('isAuthenticated');
  console.log("Removed all cookies")
}
