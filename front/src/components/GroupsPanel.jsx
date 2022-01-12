import React from 'react'
import SECRET from "../secret"
import FlashMessage from "react-flash-message"
import ReactModal from 'react-modal'

class GroupsPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: '',
            successMessage: false,
            isShowed: false,
            name: '',
            description: ''
        }
        this.handleName = this.handleName.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleName(e) {
        this.setState({
            name: e.target.value,
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value,
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        fetch(SECRET.API_URL + "/groups/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + SECRET.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description
            })
        })
            .then(res => res.json())
            .then(data => {
                this.fetchAPIGroups()
                this.toggleModale()})
    }
    componentDidMount() {
        this.fetchAPIGroups()
    }

    fetchAPIGroups() {
        fetch(SECRET.API_URL + "/groups/")
            .then(response => response.json())
            .then(data => this.setState({
                items: data.groups
            }))
    }

    deleteGroups(id) {
        fetch(SECRET.API_URL + "/groups/" + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    successMessage: true
                })
                this.fetchAPIGroups()
            })
        setTimeout(this.setState({ successMessage: false }), 1000)
    }
    toggleModale() {
        this.setState({
            isShowed: !this.state.isShowed
        })
    }

    render() {
        return (
            <div className="grid-account-items">
                <h3>Groups Panel</h3>
                <ReactModal
                    isOpen={this.state.isShowed}
                    ariaHideApp={false}
                ><button onClick={() => this.toggleModale()}>Close</button>
                    <form>
                        <label className="label panel">Name:</label>
                        <input
                            onChange={this.handleName}
                            className="input"
                            value={this.state.name}
                            type="text"
                        />

                        <label className="label panel">Description:</label>
                        <input
                            onChange={this.handleDescription}
                            className="input"
                            value={this.state.description}
                            type="text"
                        />
                        <button onClick={this.handleSubmit} className="btn" type="submit">
                            Submit
                        </button>
                    </form>
                </ReactModal>
                <ul className='cards-users'>
                    {this.state.successMessage && <FlashMessage duration={1000}><p className='alert'>Group has been removed !</p></FlashMessage>}

                    {Object.entries(this.state.items).map(([key, value]) => {
                        return (
                            <li className="card-user" key={key}>
                                <span className="Name">Name:</span>
                                <span className="Value"> {value.name}</span>
                                <span className="Price">Description:</span>
                                <span className="Value">{value.description}</span>
                                <button onClick={() => this.deleteGroups(value._id)}>DELETE</button>
                            </li>

                        )
                    })}</ul>
                <button className="button-add" onClick={() => this.toggleModale()}>New Group</button>
            </div>
        )
    }
}

export default GroupsPanel