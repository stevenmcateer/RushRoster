import React, {Component} from 'react';
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";
import List from "semantic-ui-react/dist/commonjs/elements/List/List";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Card from "semantic-ui-react/dist/commonjs/views/Card/Card";


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
        post: {
            users: [
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
        },
    };


    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        }
    }


    render(){
        return (
            <Container>

                <Card>
                    <h2 align="center">Awaiting Approval</h2>
                    <List role='list' className='ui list'>
                        <div className={"ui page grid"}>
                            {this.defaultProps.post.users.map(user => {
                                return <List.Item role='listitem' className='item'>
                                    <div className={"five column row"}>
                                        <div className={"column"}>
                                            <Image
                                                src='https://react.semantic-ui.com/images/avatar/small/rachel.png'
                                                className='ui avatar image'
                                            />
                                        </div>
                                        <div className={"column"}>
                                            <List.Header className='content'>
                                                <a className='header'>{user.username}</a>
                                            </List.Header>
                                        </div>
                                        <div className={"column"}>
                                            <List.Description>
                                                <p>{user.email}</p>
                                            </List.Description>
                                        </div>
                                        <div className={"column"}>
                                            <Menu compact>
                                                <Dropdown text='Admin' options={options} simple item/>
                                            </Menu>
                                        </div>
                                        <div className={"column"}>
                                            <Button positive>Accept</Button>
                                        </div>
                                        <div className={"column"}>
                                            <Button negative>Decline</Button>
                                        </div>
                                    </div>
                                </List.Item>

                            })}
                        </div>
                    </List>
                </Card>
                <Card className={"column"}>
                    <h2 align="center">All Brothers </h2>
                </Card>
            </Container>
        )
    }
}