import React, {Component} from 'react';
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import List from "semantic-ui-react/dist/commonjs/elements/List/List";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";
import {getPendingUsers, getAllUsers, approveUser, deletePending, removeUser} from '../scripts'

const options = [
    {key: 0, text: 'Basic User', value: 0},
    {key: 1, text: 'Rush Chair', value: 1},
    {key: 2, text: 'Head Rush Chair', value: 2},
    {key: 3, text: 'Site Admin', value: 3},
];

export default class UserManagement extends Component {
    constructor(props) {
        super();
        this.state = {
            rows: [],
            totalUsers:[],
            option: 1
        }
        this.refreshData = this.refreshData.bind(this)
        this.handleApproveUser = this.handleApproveUser.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleDeletePending = this.handleDeletePending.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.refreshData()
    }

    handleOptionChange(e, {value}){
      e.persist();
      console.log(e.target.textContent)
      options.forEach(option=>{
        if(option.text === e.target.textContent){
            console.log(option.value)
            e.value = option.text;
            this.setState({userLevel: option.value})
        }
      })
    }
    handleApproveUser(e){

      console.log(e)
        let obj = {
          'userid': e.userid,
          'username': e.username,
          'email':e.email,
          'passw': e.passw,
          'organizationid': e.organizationid,
          'permissionslevel': this.state.userLevel

        }
        approveUser(obj).then(res=>{
          console.log(res)
          this.refreshData();
        })

    }

    handleDeletePending(e){
      console.log("deleting pending")
      let obj = {
        'userid': e.userid
      }
      console.log(obj);
      deletePending(obj).then(res=>{
        console.log("deleted")
        this.refreshData()
      })
    }

    handleDeleteUser(e){
      console.log("deleting user")
      let obj = {
        'userid': e.userid
      }
      console.log(obj);
      removeUser(obj).then(res=>{
        this.refreshData()
      })
    }

    refreshData() {
        console.log("Refreshing data")
        getPendingUsers().then(res => {
            this.setState({rows: JSON.parse(res.getBody())})
        })
        getAllUsers().then(res=>{
          this.setState({totalUsers: JSON.parse(res.getBody())})
        })
    }

    defaultProps = {
        awaitingUsers: [
            {
                username: "smcateer",
                email: "smcateer@wpi.edu",
                adminLevel: 3
            },
            {
                username: "paul",
                email: "pcshingles@wpi.edu",
                adminLevel: 3
            }],

        allUsers: [
            {
                username: "smcateer",
                email: "smcateer@wpi.edu",
                adminLevel: 3
            },
            {
                username: "paul",
                email: "pcshingles@wpi.edu",
                adminLevel: 3
            }]

    };


    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        }
    }


    render() {
        return (
            <Container>
                <h2 align="center">Awaiting Approval</h2>
                <List role='list' className='ui list'>
                    {this.state.rows.map(awaitingUser => {
                        return <List.Item role='listitem' className='item'>
                            <Grid padded>
                                <Grid.Column >
                                    <Image
                                        src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
                                        className='ui avatar image'
                                    />
                                </Grid.Column>
                                <Grid.Column >
                                    <List.Header className='content'>
                                        <a className='header'>{awaitingUser.username}</a>
                                    </List.Header>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <List.Description>
                                        <p>{awaitingUser.email}</p>
                                    </List.Description>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <Menu compact>
                                        <Dropdown id='dropdown' placeholder='Basic User' options={options} onChange={

                                              this.handleOptionChange

                                        } simple item/>
                                    </Menu>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <Button onClick={() => {
                                      this.handleApproveUser(awaitingUser)
                                    }
                                    } positive>Accept</Button>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <Button onClick={
                                        () =>{
                                          console.log("clicked");
                                          this.handleDeletePending(awaitingUser)
                                        }

                                    } negative>Decline</Button>
                                </Grid.Column>
                            </Grid>
                        </List.Item>
                    })}
                </List>
                <h2 align="center">All Brothers</h2>
                <List role='list' className='ui list'>
                    {this.state.totalUsers.map(allUser => {
                        return <List.Item role='listitem' className='item'>
                            <Grid padded>
                                <Grid.Column >
                                    <Image
                                        src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
                                        className='ui avatar image'
                                    />
                                </Grid.Column>
                                <Grid.Column >
                                    <List.Header className='content'>
                                        <a className='header'>{allUser.username}</a>
                                    </List.Header>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <List.Description>
                                        <p>{allUser.email}</p>
                                    </List.Description>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <Menu compact>
                                        <Dropdown text='Admin' options={options} simple item/>
                                    </Menu>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <Button onClick={
                                        () =>{
                                            this.handleDeleteUser(allUser)
                                        }

                                    }

                                     negative>Delete User</Button>
                                </Grid.Column>
                            </Grid>
                        </List.Item>
                    })}
                </List>
            </Container>
        )
    }
}
