import React, { Component } from 'react';


export default class UserManagement extends Component{

    static defaultProps = {
        user: {
            'username': 'test',
            'PermissionsLevel': 0,
            'userid': 'test',
            'organizationId': 0
        }
    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <p>user managemnt</p>
        )
    }
}