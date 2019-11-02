import React, { Component } from 'react';

export default class SideBar extends Component {

    constructor() {
        super()
        this.state = {
            query: '',
            venues: []
        }
        this.list = []
    }

    handleChange = e => {

        this.list = [];

        const sideBarList = (inputItem) => {
            if (!this.list.filter(item => item.id === inputItem.id).length > 0) {
                this.list.push(inputItem)
            }
            return this.list;
        }

        this.setState({query: e.target.value})
        const markers = this.props.venues.map((venue, id) => {
            const isWatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase())
            const marker = this.props.markers.find(marker => marker.id === venue.id)
            isWatched ? marker.isVisible = true : marker.isVisible = false

            if (marker.isVisible === true) {
                const selected = this.props.venues.filter(res => res.id === marker.id)
                sideBarList(selected[0])
            }

        return marker;
        })

    this.props.updateSuperState(markers)

    }

    render() {
        if (!this.list.length) {this.list = this.props.venues}
        return (
            <div className="sideBar">
                <input type={"search"} id={"search"} placeholder={"Filter results"} onChange={this.handleChange} />
                <ol role="menu">
                {this.list.map((result, id) => (
                    <li key={result.id}>
                        <button role="link" onClick={() => this.props.handleListClick(result)}>{result.name}</button>
                    </li>
                ))}
                </ol>
            </div>
        )
    }

}