import React from "react"


class Login extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            error: false,
            submitted: false

        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleEmail(e) {
        this.setState({
            email : e.target.value,
            submitted: false})
    }
    handlePassword(e) {
        this.setState({
            password : e.target.value,
            submitted: false})
    }

    handleSubmit(e) {
        e.preventDefault()
        if (this.state.email === '' || this.state.password === '') {
            this.setState({
                error: true})
        } else {
            this.setState({
                submitted: true,
                error: false
            })
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
            <h1>Please enter all the fields</h1>
        </div>)
    }
    render(){
        return (<div className="registerForm">
            <h1>Login</h1>

        <form>
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

            <button onClick={this.handleSubmit} className="btn" type="submit">
            Submit
            </button>
        </form>
        <div className="messages">
            {this.errorMessage()}
            {this.successMessage()}
        </div>
    </div>)
    }
}

export default Login