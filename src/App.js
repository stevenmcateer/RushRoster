import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import './App.css';
import Rushees from "./components/Rushees";
import Voting from "./components/Voting";
import UserManagement from "./components/UserManagement";
import RequestManagement from "./components/RequestManagement";

const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}><Rushees/></Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}><Voting/></Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}><UserManagement/></Tab.Pane> },
    { menuItem: 'Tab 4', render: () => <Tab.Pane attached={false}><RequestManagement/></Tab.Pane> },
]

class App extends Component {
  render() {
    return (
      <div className="App">
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </div>
    );
  }
}

export default App;
