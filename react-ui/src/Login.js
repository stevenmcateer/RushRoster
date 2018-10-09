// src/LoginForm.js
import React, { Component } from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';
import {getAuthentication} from './scripts';
import {bake_cookie, show_cookies, eat_cookies} from './cookies';
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
  var cake = cookies.get('isAuthenticated');
  if(cake == 1){
    console.log("Authenticated " + cookies.get('username') + " Successfully")
    ReactDOM.render(<App />, document.getElementById('root'));
  } else if(cake == 0){
    alert("Invalid Username/Password Entered!");
    eat_cookies();
  };
}
