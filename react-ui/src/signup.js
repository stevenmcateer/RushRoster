// src/LoginForm.js
import React, { Component } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import {getAuthentication} from './scripts';
import {bake_cookie, show_cookies, eat_cookies} from './cookies';
import './index.css';
const cookies = new Cookies();

export default (class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid:  '',
      email: '',
      username:  '',
      password:  '',
      organization:  '',
    }

    this.signUp = this.signUp.bind(this);

    // this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
  }

  //Handle submit
  signUp(e) {
    e.preventDefault();
    let obj = {
        'userid': this.state.userid,
        'email': this.state.email,
        'username': this.state.username,
        'password': this.state.password,
        'organization': this.state.organization,
    };

    serverFunction(obj).then((res) => {

    })
  }

  // Login Functions
  handleEmailChange(e) {this.setState({email: e.target.value});}
  handleUsernameChange(e) {this.setState({username: e.target.value});}
  handlePasswordChange(e) {this.setState({password: e.target.value});}

  //
  render() {
    return(
      <div class="ui equal width form">
  <div class="fields">
    <div class="field">
      <label>Username</label>
      <input type="text" placeholder="Username">
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password">
    </div>
  </div>
  <div class="fields">
    <div class="field">
      <label>First name</label>
      <input type="text" placeholder="First Name">
    </div>
    <div class="field">
      <label>Middle name</label>
      <input type="text" placeholder="Middle Name">
    </div>
    <div class="field">
      <label>Last name</label>
      <input type="text" placeholder="Last Name">
    </div>
  </div>
</div>

    );
  }
});
