import React from "react";

class Account extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            password_confirmation: '',
            oldEmail: "old email"
        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handlePassword_confirmation = this.handlePassword_confirmation.bind(this)
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value,
        })
    }
    handlePassword_confirmation(e) {
        this.setState({
            password_confirmation: e.target.value,
        })
    }
    render() {
        return (<div>
            <h1>My Account</h1>
            <div className="grid-account">
                <div className="grid-account-items">
                    <h3>Favorites</h3>

                </div>
                <div className="grid-account-items">
                    <h3>Wishlist</h3>
                </div>
                <div className="grid-account-items">
                    <h3>Bookings</h3>
                </div>
                <div className="grid-account-items">
                    <h3 >Account Settings</h3>
                    <div className="settings">
                        <label className="text">Email: {this.state.oldEmail}</label>
                        <input
                            onChange={this.handleEmail}
                            className="input"
                            value={this.state.email}
                            type="text"
                        />
                        <label className="text">Password:</label>
                        <input
                            onChange={this.handlePassword}
                            className="input"
                            value={this.state.password}
                            type="password"
                        />
                        <label className="text">Password confirmation:</label>
                        <input
                            onChange={this.handlePassword_confirmation}
                            className="input"
                            value={this.state.password_confirmation}
                            type="password"
                        />
                        <button>Update credentials</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Account;
