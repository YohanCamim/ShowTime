import React from 'react'
import SECRET from "../secret"
import FlashMessage from "react-flash-message"

class UsersPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: '',
            successMessage: false
        }
    }

    componentDidMount() {
        this.fetchAPIUsers()
    }

    fetchAPIUsers() {
        fetch(SECRET.API_URL + "/users/", {
            headers: {
                "Authorization": "Bearer " + SECRET.token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({
                items: data.users
            }))
    }

    deleteUser(id) {
        fetch(SECRET.API_URL + "/users/" + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    successMessage: true
                })
                this.fetchAPIUsers()
                setTimeout(this.setState({ successMessage: false }), 1000)
            })
    }


    render() {
        return (
            <div className="grid-account-items">
                <h3>Users Panel</h3>
                <ul className='cards-users'>
                {this.state.successMessage &&<FlashMessage duration={1000}><p className='alert'>User has been removed !</p></FlashMessage>  }
                    {Object.entries(this.state.items).map(([key, value]) => {
                        return (
                            <li className="card-user" key={key}>
                                <span className="firstName">FirstName:</span>
                                <span className="Value"> {value.firstName}</span>
                                <span className="lastName">LastName:</span>
                                <span className="Value">{value.lastName}</span>
                                <span className="email">Email:</span>
                                <span className="Value">{value.email}</span>
                                <button onClick={() => this.deleteUser(value._id)}>DELETE</button>
                            </li>

                        )
                    })}</ul>
            </div>
        )
    }
}

export default UsersPanel