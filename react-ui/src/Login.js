// src/LoginForm.js
import React, { Component } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import {getAuthentication, submitNewUser} from './scripts';
import {bake_cookie, show_cookies} from './cookies';
import './index.css';
import SignUpForm from './signup';
import {AES} from 'crypto-js';
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
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  //Handle submit
  signIn(e) {
    let obj = {
        'email': this.state.email,
        'password': encrypt(this.state.password, this.state.email),
    };
    getAuthentication(obj).then((res) => {
      // console.log("Response")
      var user = JSON.parse(res.body);
      user = user[0];
      console.log(user);
      // eat_cookies();
      bake_cookie(user);
      show_cookies();
      checkAuthentication();
    })
  }

  // Login Functions
  handleEmailChange(e) {this.setState({email: e.target.value});};
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  };

  toggleSignUp() {
      var div = document.getElementById('signupdiv');
      console.log(div);
      if (div.style.display !== 'none') {
          div.style.display = 'none';
      } else {
          div.style.display = 'block';
      }
  };

  handleSignUp(){
    var name = document.getElementById('form-input-control-full-name').value;
    var password = document.getElementById('form-input-control-password').value;
    var organization = '123';
    var email = document.getElementById('form-input-control-email').value;

    let obj = {
      "username":name,
      'email': email,
      'passw': password,
      'organizationid': organization
    };

    console.log(obj);

    submitNewUser(obj)
    console.log("handling signup");
  }



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
          <Grid textAlign='center' style={{ height: '100%' }} verticalalign='middle'>
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
      <div id="signupdiv" style={{ display: 'None', marginTop: '60px'  }} verticalalign='middle'>
        <div className="ui center aligned middle aligned grid">
          <Message>
          <SignUpForm callback={this.handleSignUp}/>
          <Message><Button id='goback' color='teal' fluid size='large' onClick={this.masterToggle}> Go Back </Button></Message>
          </Message>
        </div>
      </div>
    </div>
    );
  }
});

function checkAuthentication(){
  if(cookies.get('isAuthenticated') === '1'){
    console.log("Authenticated " + cookies.get('username') + " Successfully")
    var authenticatedUser = {
      'username': cookies.get('username'),
      'permissionslevel': cookies.get('permission'),
      'authenticated': cookies.get('isAuthenticated')
    }
    ReactDOM.render(<App user={authenticatedUser} />, document.getElementById('root'));
  };
};
// // Nodejs encryption with CT
// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

function encrypt(value, key){
  var text = buffer(value);
  var cipher = crypto.createCipher(algorithm, key);
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  console.log(crypted);
  return crypted;
}

function buffer(str){
  var curLen = str.length;
  var desired = (36 - curLen);
  console.log("current string length: " + curLen);
  for (var i = curLen; i < desired; i++) {
    // console.log("Buffered String: "+ str);
    str += "*";
  };
  // console.log("Final Buffered String: "+str);
  return str;
}

export function dealWithSignup(){
  console.log(this)
  this.handleSignUp;
}
