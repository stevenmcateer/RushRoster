import React, {Component} from "react";
import {Container} from "semantic-ui-react";
import Card from "./Card.js";

export default class Posts extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Container>
                    {this.props.cards.map(card => {
                        return <Card card={card} onDbCall={this.props.onDbCall}/>
                    })}
                </Container>
            </div>
        );
    }
}