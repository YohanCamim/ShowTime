import React from "react"
import DisplayShows from "../components/DisplayShows"


class Home extends React.Component{

    render(){
        return (<div>
            <h1>Our Latests Shows:</h1>
            <DisplayShows order="reverse"/>
            </div>
        )
    }
}

export default Home