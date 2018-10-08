import React, { Component } from 'react';

export default class RequestManagement extends Component{

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
        return(
            <div>
                <pre>{JSON.stringify(this.props.user)}</pre>
            <p>request management</p>
            </div>
        )
    }
}