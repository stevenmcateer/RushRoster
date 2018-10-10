import React, {Component} from "react";
import {getComments} from "../scripts";
import { Button, Comment, Form, Header } from 'semantic-ui-react'


export default class Comments extends Component{

    static defaultProps = {
        pnmid: '',
    }

    constructor(props){
        super(props)
        this.state ={
            comments : [],
            user: {}
        }
        this.refreshComments = this.refreshComments.bind(this)

        this.refreshComments()
    }

    refreshComments(){
        getComments(this.props.pnmid).then(comments => {
            this.setState({comments: comments})
        })
    }

    getUser(userid){

    }

    render(){
        return(
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            <Comment>
                <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>How artistic!</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        </Comment.Group>
        )
    }
}