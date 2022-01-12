import React from "react"
import SECRET from "../secret"
import { Link } from 'react-router-dom'

class DisplayShows extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: ''
        }
    }
    componentDidMount() {
        this.fetchAPI()
    }
    fetchAPI() {
        fetch(SECRET.API_URL + "/concerts/")
            .then(response => response.json())
            .then(data => this.setState({
                items: data.concerts
            }))
    }

    render() {
        if (this.props.order === 'reverse') {
            return (<ul className="cards">
                {Object.entries(this.state.items).reverse().map(([key, value]) => {
                    return (<Link to={"/shows/" + value._id} key={key}>
                        <li className="card">
                            <p id="location">{value.city}</p>
                            <p id="genre">{value.genres[0]}</p>
                            <p id="description">{value.description.substring(0, 100)}...</p>
                            <h4>{value.name}</h4>
                        </li>
                    </Link>
                    )
                })}
            </ul>)
        } else {
            return (
                <ul className="cards">
                    {Object.entries(this.state.items).map(([key, value]) => {
                        return (<Link to={"/shows/" + value._id} key={key}>
                            <li className="card">
                                <p id="location">{value.city}</p>
                                <p id="genre">{value.genres[0]}</p>
                                <p id="description">{value.description.substring(0, 100)}...</p>
                                <h4>{value.name}</h4>
                            </li>
                        </Link>
                        )
                    })}
                </ul>)
        }

    }
}

export default DisplayShows