import _ from 'lodash'
import React, { Component } from 'react'
import {getAll, getPnms} from "../scripts"
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import Rushee from "./Rushee";
import Container from "semantic-ui-react/dist/commonjs/elements/Container/Container";



export default class SearchRushee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }
        this.refreshData = this.refreshData.bind(this)
        this.refreshData()
    }

    // fetch all PNMs from db into state, forcing re-render
    refreshData() {
        console.log("Refreshing data")
        getAll().then(res => {
            this.setState({rows: JSON.parse(res.getBody())})
        })
    }

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.name })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i' )
            const isMatch = result => re.test(result.name)

            this.setState({
                isLoading: false,
                results: _.filter(this.state.rows, isMatch),
            })
        }, 300)
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
                <Search id={"searchBar"}
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
                    results={results}
                    value={value}
                    {...this.props}
                />
        )
    }
}