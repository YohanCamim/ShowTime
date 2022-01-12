import React from "react"
import { NavLink, Link} from "react-router-dom"
import logo from "../assets/LogoGIGMinime.png"


class Navbar extends React.Component {

    render() {
        return (<ul id="navbar">
            <div id="link">
            <Link onClick={this.forceUpdate} to="/">
            <img src={logo} alt="logo"/>
            </Link>
                <NavLink to="/">
                    <li>Home</li>
                </NavLink>
                <NavLink to="/AllShows">
                    <li>Shows</li>
                </NavLink>
                <NavLink to="/Register">
                    <li>Register</li>
                </NavLink>
                <NavLink to="/Login">
                    <li>Login</li>
                </NavLink>
                <NavLink to="/Account">
                    <li>Account</li>
                </NavLink></div>
            <Link onClick={this.forceUpdate} to="/" id="name">
                <h1>GIG MOTION</h1>
            </Link>
        </ul>)

    }
}

export default Navbar