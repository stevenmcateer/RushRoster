import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react'
import "../node_modules/semantic-ui-css/semantic.min.css";
import './App.css';
import Rushees from "./components/Rushees";
import Voting from "./components/Voting";
import UserManagement from "./components/UserManagement";
import RequestManagement from "./components/RequestManagement";
import Header from "./components/Header";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const panes = [
    {
        menuItem: 'Rushees', render: (props) =>
            <Tab.Pane attached={false}>
                <Rushees user={props.user}/>
            </Tab.Pane>
    },
    {
        menuItem: 'Voting', render: (props) =>
            <Tab.Pane attached={false}>
                <Voting user={props.user}/>
            </Tab.Pane>
    },
    {
        menuItem: 'Users', render: (props) =>
            <Tab.Pane attached={false}>
                <UserManagement user={props.user}/>
            </Tab.Pane>

    },
    // {
    //     menuItem: 'Requests', render: (props) =>
    //         <Tab.Pane attached={false}>
    //             <RequestManagement user={props.user}/>
    //         </Tab.Pane>
    // },
]

class App extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'permissionslevel': 0,
            'userid': 'Stove',
            'organizationid': 123
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            fetching: true,
            cards: [],
            user: {
                'username': cookies.get('username') || 'test',
                'permission': cookies.get('permission') || 0,
                'userid': cookies.get('userid') || null,
                'organizationid': cookies.get('organization') || 123
            }
        };
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div id={'menu'}>
                    <Tab menu={{secondary: true, pointing: true}} {...{user: this.state.user}}
                         panes={panes.filter(pane => {
                             return pane.menuItem === 'Rushees' ||
                                 pane.menuItem === 'Voting' ||
                                 this.state.user.permission > 0 && pane.menuItem === 'Users' ||
                                 this.state.user.permission > 0 && pane.menuItem === 'Requests'
                         })}/>
                </div>
            </div>
        );
    }

}

export default App;
