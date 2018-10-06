import React, {Component} from "react";
import {Container} from "semantic-ui-react";
import Round from "./Round";

export default class Posts extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    {this.props.cards.map(round => {
                        return <Round round={round} onDbCall={this.props.onDbCall}/>
                    })}
                </Container>
            </div>
        );
    }
}