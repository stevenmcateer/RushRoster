// src/LoginForm.js
import React, { Component } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import {getAuthentication} from './scripts';
import {bake_cookie, show_cookies, eat_cookies} from './cookies';
import './index.css';
import SignUpForm from './signup';
const cookies = new Cookies();

export default (class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password:  '',
    }

    this.signIn = this.signIn.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.masterToggle = this.masterToggle.bind(this);
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
      let fake_response = {
        'username' : 'Sam Coache',
        'organization' : 'TKE',
        'permission' : '3',
        'isAuthenticated' : 1,
      }
      console.log(fake_response);
      eat_cookies();
      bake_cookie(fake_response);
      show_cookies();
      checkAuthentication();
    })
  }

  // Login Functions
  handleEmailChange(e) {this.setState({email: e.target.value});}
  handlePasswordChange(e) {this.setState({password: e.target.value});}

  toggleSignUp() {
      var div = document.getElementById('signupdiv');
      console.log(div);
      if (div.style.display !== 'none') {
          div.style.display = 'none';
      } else {
          div.style.display = 'block';
      }
  };

  toggleLogin() {
      var div = document.getElementById('logindiv');
      if (div.style.display !== 'none') {
          div.style.display = 'none';
      } else {
          div.style.display = 'block';
      }
  };

  masterToggle() {
    this.toggleLogin();
    this.toggleSignUp();
  };

  //
  render() {
    return(
    <div>
      <div id="logindiv" className='login-form'>
          {}
          <style>{` body > div, body > div > div, body > div > div > div.login-form { height: 100%; } `}</style>
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
                <Button color='teal' fluid size='large' onClick={this.masterToggle}> Sign Up </Button>
              </Message>
            </Grid.Column>
          </Grid>
      </div>
      <div id="signupdiv" style={{ display: 'None' }}>
        <div className="ui center aligned middle aligned grid"><SignUpForm /></div>
        <Message>
          <Button color='teal' fluid size='large' onClick={this.masterToggle}> Go Back </Button>
        </Message>
      </div>
    </div>
    );
  }
});

function checkAuthentication(){
  var wtf = cookies.get('isAuthenticated');
  console.log(wtf);
  if(cookies.get('isAuthenticated') == 1){
    console.log("Authenticated " + cookies.get('username') + " Successfully")
    ReactDOM.render(<App />, document.getElementById('root'));
  } else {
    alert("Invalid Username/Password Entered!");
    eat_cookies();
  };
}
