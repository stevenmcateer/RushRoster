import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react'
import './App.css';
import Rushees from "./components/Rushees";
import Voting from "./components/Voting";
import UserManagement from "./components/UserManagement";
import RequestManagement from "./components/RequestManagement";
import Header from "./components/Header";

const panes = [
    {menuItem: 'Prospects', render: () => <Tab.Pane attached={false}><Rushees/></Tab.Pane>},
    {menuItem: 'Voting', render: () => <Tab.Pane attached={false}><Voting/></Tab.Pane>},
    {menuItem: 'User Management', render: () => <Tab.Pane attached={false}><UserManagement/></Tab.Pane>},
    {menuItem: 'Request Management', render: () => <Tab.Pane attached={false}><RequestManagement/></Tab.Pane>},
]

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            fetching: true,
            cards: []
        };
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div id={'menu'}>
                    <Tab menu={{secondary: true, pointing: true}} panes={panes}/>
                </div>
            </div>
        );
    }

}

export default App;
