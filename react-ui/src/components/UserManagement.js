import React, {Component} from 'react';
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import List from "semantic-ui-react/dist/commonjs/elements/List/List";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";


const options = [
    {key: 0, text: 'Basic User', value: 0},
    {key: 1, text: 'Rush Chair', value: 1},
    {key: 2, text: 'Head Rush Chair', value: 2},
    {key: 3, text: 'Site Admin', value: 3},
];

export default class UserManagement extends Component {
    constructor(props) {
        super();

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
                    {this.defaultProps.awaitingUsers.map(awaitingUser => {
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
                                        <Dropdown text='Admin' options={options} simple item/>
                                    </Menu>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <Button positive>Accept</Button>
                                </Grid.Column>
                                <Grid.Column className={"two wide column"}>
                                    <Button negative>Decline</Button>
                                </Grid.Column>
                            </Grid>
                        </List.Item>
                    })}
                </List>
                <h2 align="center">All Brothers</h2>
                <List role='list' className='ui list'>
                    {this.defaultProps.allUsers.map(allUser => {
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
                                    <Button negative>Delete User</Button>
                                </Grid.Column>
                            </Grid>
                        </List.Item>
                    })}
                </List>
            </Container>
        )
    }
}