import React, {Component} from "react";
import {getComments, getUser, addComment} from "../scripts";
import {Button, Comment, Container, Form, Header} from 'semantic-ui-react'
import Async from "react-promise";


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
    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.loading && nextState.commentReply === this.state.commentReply
    }

    refreshComments() {
        this.setState({loading: true})
        getComments(this.props.pnmid).then(comments => {
            this.setState({comments: JSON.parse(comments.body)}, () => {
                this.setState({loading: false})
            })
        })
    }

    handleCommentChange(e) {
        this.setState({commentReply: e.target.value})
    }

    handleSubmitComment() {
        // Fetch comment data
        const comment = {
            'pnmid': this.props.pnmid,
            'userid': this.props.user.userid,
            'commentbody': this.state.commentReply
        }

        // Post comment to db, re-render comments
        addComment(comment).then((res) => {
            this.refreshComments()
        })
    }

    getUserName(userid) {
        return getUser(userid).then(user => {
            return JSON.parse(user.body).username
        })
    }

    render() {
        return (
            <Comment.Group>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {this.state.comments && this.state.comments.map(comment => {
                    const uname = this.getUserName(comment.userid)
                    return (
                        <Comment>
                            <Comment.Content>
                                <Comment.Author as='a'>
                                    {
                                        <Async promise={uname} then={(val) => {
                                            return val
                                        }}/>
                                    }
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment.commenttime}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.commentbody}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    )
                })
                }
                <Form reply>
                    <Form.TextArea onChange={this.handleCommentChange}/>
                    <Button id={'addReply'} onClick={this.handleSubmitComment} content='Add Reply' labelPosition='left' icon='edit'
                            primary/>
                </Form>
            </Comment.Group>
        )
    }
}