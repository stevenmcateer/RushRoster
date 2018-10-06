import React, {Component} from 'react';
import AddRushee from "./AddRushee";
import Cards from "./Cards";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";
import "../App.css"


export default class Rushees extends Component {

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }
    }

    refreshData() {
        console.log("Refreshing data")
        //getRows(this.updateState)
    }

    render() {
        return (

            <Container className='ui page grid'>
                <div className='three column row'>
                    <div className="column">
                        <div className='ui text vertical menu'>
                            <div className='header item'> Sort By</div>
                            <a className='active item'>Bid</a>
                            <a className='item'>Interviewed </a>
                            <a className='item'>Not Interview</a>
                            <a className='item'>No Bid</a>
                        </div>
                    </div>
                    <div className="column main-div">
                        <AddRushee onAdd={this.refreshData}/>
                    </div>
                    <div className="column">
                    </div>
                    {/*<Cards cards={this.state.cards} onDbCall={this.refreshData.bind(this)}/>*/}
                </div>
            </Container>

        )
    }
}

