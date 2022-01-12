import React from 'react'
import SECRET from "../secret"
import FlashMessage from "react-flash-message"
import ReactModal from 'react-modal'

class ShowsPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: '',
            successMessage: false,
            isShowed: false,
            name: '',
            description: '',
            city: '',
            price: ''
        }
        this.handleName = this.handleName.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.handleCity = this.handleCity.bind(this)
        this.handlePrice = this.handlePrice.bind(this)
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

    handleCity(e) {
        this.setState({
            city: e.target.value,
        })
    }

    handlePrice(e) {
        this.setState({
            price: e.target.value,
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        fetch(SECRET.API_URL + "/concerts/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + SECRET.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                city: this.state.city,
                price: this.state.price
            })
        })
            .then(res => res.json())
            .then(data => {
                this.fetchAPIShows()
                this.toggleModale()})
    }

    componentDidMount() {
        this.fetchAPIShows()
    }

    fetchAPIShows() {
        fetch(SECRET.API_URL + "/concerts/")
            .then(response => response.json())
            .then(data => this.setState({
                items: data.concerts
            }))
    }

    deleteShows(id) {
        fetch(SECRET.API_URL + "/concerts/" + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    successMessage: true
                })
                this.fetchAPIShows()
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
                <h3>Shows Panel</h3>
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

                        <label className="label panel">City:</label>
                        <input
                            onChange={this.handleCity}
                            className="input"
                            value={this.state.city}
                            type="text"
                        />

                        <label className="label panel">Price:</label>
                        <input
                            onChange={this.handlePrice}
                            className="input"
                            value={this.state.price}
                            type="text"
                        />
                        <button onClick={this.handleSubmit} className="btn" type="submit">
                            Submit
                        </button>
                    </form></ReactModal>
                <ul className='cards-users'>
                    {this.state.successMessage && <FlashMessage duration={1000}><p className='alert'>Show has been removed !</p></FlashMessage>}
                    {Object.entries(this.state.items).map(([key, value]) => {
                        return (
                            <li className="card-user" key={key}>
                                <span className="Name">Name:</span>
                                <span className="Value"> {value.name}</span>
                                <span className="Price">Price:</span>
                                <span className="Value">{value.price}$</span>
                                <span className="city">City:</span>
                                <span className="Value">{value.city}</span>
                                <button onClick={() => this.deleteShows(value._id)}>DELETE</button>
                            </li>

                        )
                    })}</ul>
                <button className="button-add" onClick={() => this.toggleModale()}>New Show</button>
            </div>
        )
    }
}

export default ShowsPanel