import React from "react";
import SECRET from'../secret'

import { useDispatch, useSelector } from 'react-redux'
import { set } from '../redux/token/tokenSlice'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            error: false,
            submitted: false,
            errorText: ""

        }
        this.handlefirstName = this.handlefirstName.bind(this)
        this.handlelastName = this.handlelastName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handlefirstName(e) {
        this.setState({
            firstName: e.target.value,
            submitted: false
        })
    }
    handlelastName(e) {
        this.setState({
            lastName: e.target.value,
            submitted: false
        })
    }
    handleEmail(e) {
        this.setState({
            email: e.target.value,
            submitted: false
        })
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value,
            submitted: false
        })
    }
    handlePasswordConfirmation(e) {
        this.setState({
            passwordConfirmation: e.target.value,
            submitted: false
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.password !== this.state.passwordConfirmation) {
            this.setState({
                error: true,
                errorText: "The passwords doesn't match!"
            })
        } else {
            if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '') {
                this.setState({
                    error: true,
                    errorText: "Please enter all the fields"
                })
            } else {
                this.setState({
                    submitted: true,
                    error: false
                })
                fetch(SECRET.API_URL + '/auth/register', {
                    headers: {
                        'Content-Type':'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    })
                })
                .then(res => res.json())
                .then(data => {
                    useDispatch(set,data.token)
                    console.log(data.token)
                    console.log(useSelector((state) => state.token.value))
                }  )
            }
        }
    }

    successMessage() {
        return (<div
            className="success"
            style={{
                display: this.state.submitted ? '' : 'none',
            }}>
            <h1>{this.state.firstName} {this.state.lastName} successfully registered!</h1>
        </div>)
    }

    errorMessage() {
        return (<div
            className="error"
            style={{
                display: this.state.error ? '' : 'none',
            }}>
            <h1>{this.state.errorText}</h1>
        </div>)
    }
    render() {
        return (
            <div className="registerForm">
                    <h1>Register</h1>
                <form>
                    {/* Labels and inputs for form data */}
                    <label className="label">First Name:</label>
                    <input
                        onChange={this.handlefirstName}
                        className="input"
                        value={this.state.firstName}
                        type="text"
                    />

                    <label className="label">Last Name:</label>
                    <input
                        onChange={this.handlelastName}
                        className="input"
                        value={this.state.lastName}
                        type="text"
                    />

                    <label className="label">Email</label>
                    <input
                        onChange={this.handleEmail}
                        className="input"
                        value={this.state.email}
                        type="email"
                    />

                    <label className="label">Password</label>
                    <input
                        onChange={this.handlePassword}
                        className="input"
                        value={this.state.password}
                        type="password"
                    />
                    <label className="label">Password Confirmation</label>
                    <input
                        onChange={this.handlePasswordConfirmation}
                        className="input"
                        value={this.state.passwordConfirmation}
                        type="password"
                    />

                    <button onClick={this.handleSubmit} className="btn" type="submit">
                        Submit
                    </button>
                </form>
                <div className="messages">
                    {this.errorMessage()}
                    {this.successMessage()}
                </div>
            </div>
        );
    }
}

export default Register;
