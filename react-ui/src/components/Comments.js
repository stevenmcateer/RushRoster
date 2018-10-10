import React, {Component} from "react";
import {getComments, getUser, addComment} from "../scripts";
import {Button, Comment, Form, Header} from 'semantic-ui-react'


export default class Comments extends Component {

    static defaultProps = {
        pnmid: '',
        user: {}
    }

    constructor(props) {
        super(props)
        this.state = {
            commentReply: '',
            comments: [],
            loading: true
        }
        this.handleCommentChange = this.handleCommentChange.bind(this)
        this.handleSubmitComment = this.handleSubmitComment.bind(this)
        this.refreshComments = this.refreshComments.bind(this)
        this.refreshComments()
    }

    // Load comments
    shouldComponentUpdate(nextProps, nextState){
        return !nextState.loading
    }

    refreshComments() {
        console.log("Refreshing comments.")
        this.setState({loading: true})
        getComments(this.props.pnmid).then(comments => {
            console.log("Setting comments to: " + JSON.stringify(comments.body))
            this.setState({comments: JSON.parse(comments.body)}, () => {this.setState({loading:false})})
        })
    }

    static getUser(userid) {
        console.log("user id to fetch: " + userid)
        getUser(userid).then(user => {
            console.log("type of user: " + typeof user)
            console.log("User: " + JSON.stringify(user))
            return user
        })
    }

    handleCommentChange(e) {
        this.setState({commentReply: e.target.value})
    }

    handleSubmitComment() {
        console.log("Attempting to add this comment to db: " + this.state.commentReply)

        // Fetch comment data
        const comment = {
            'pnmid': this.props.pnmid,
            'userid': this.props.user.userid,
            'commentbody': this.state.commentReply
        }

        console.log("Attempting to add this comment to db: " + JSON.stringify(comment))
        // Post comment to db, re-render comments
        addComment(comment).then((res) => {
            console.log("After post. Response: " + JSON.stringify(res))
            this.refreshComments()
        })
    }

    render() {

        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {console.log("Current comments on render: " + this.state.comments)}
                {console.log("isArray? : " + Array.isArray(this.state.comments))}
                {console.log("Type? : " + typeof this.state.comments)}

                {this.state.comments && this.state.comments.map(comment => {
                    return (
                        <Comment>
                            <Comment.Content>
                                <Comment.Author as='a'>{JSON.parse(Comments.getUser(comment.userid)).username}</Comment.Author>
                                <Comment.Metadata>
                                    <div>comment.commenttime</div>
                                </Comment.Metadata>
                                <Comment.Text>comment.commentbody</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    )
                })
                }
                <Form reply>
                    <Form.TextArea onChange={this.handleCommentChange}/>
                    <Button onClick={this.handleSubmitComment} content='Add Reply' labelPosition='left' icon='edit'
                            primary/>
                </Form>
            </Comment.Group>
        )
    }
}