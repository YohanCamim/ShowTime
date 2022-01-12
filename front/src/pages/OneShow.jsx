import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import SECRET from "../secret"
import QRCode from "react-qr-code"

function OneShow(props) {
    const { id } = useParams()
    const [show, setShow] = useState([])
    const [showGroups, setShowGroups] = useState([])
    const [showGenres, setShowGenres] = useState([])
    const [showId, setShowId] = useState()
    const [isCode, setIsCode] = useState(false)
    const [QRvalue, setQRvalue] = useState('')

    const toggleCode = (props) => {
        setQRvalue(Math.random().toString().substring(2, 5))
        setIsCode(!isCode)
    }


    const addFavorite = (props) => {
        fetch(SECRET.API_URL + '/users/wishlist/'+ SECRET.id, {
            method: 'POST',
            body: JSON.stringify({
                id: showId
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
    useEffect(() => {
        fetch(SECRET.API_URL + "/concerts/" + id)
            .then(response => response.json())
            .then(data => {
                setShow(data.concert)
                setShowId(data.concert._id)
                setShowGroups(data.concert.groups)
            })
    }, [])

    return (<div>
        {Object.entries({ show }).map(([key, value]) => {
            return (<div className="container-card"><h1>{value.name}</h1>

                <div className="single-card" key={key}>

                    <p id="location"><img src="https://img.icons8.com/material-outlined/16/000000/city.png"alt="City" /> City : {value.city}</p>
                    <div className="container-cg">
                        <p id="capacity">Capacity : {value.capacity} <img src="https://img.icons8.com/material-outlined/16/000000/user--v1.png"alt="capacity" /></p>
                        <span id="group">Groups : <ul>{showGroups.map((element, key) => (<li key={element}>-{element}</li>))}</ul></span>
                    </div>
                    <p id="genre">Genres : {value.genres}</p>
                    <p id="description">{value.description}</p>
                    <a onClick={addFavorite} id="wishlist"><img src="https://img.icons8.com/fluency-systems-filled/24/000000/like.png"/>Add to wishlist</a>
                    <div className="buttonqr">
                    <button onClick={toggleCode} id="button">Book now for : {value.price}$</button>
                {isCode ? <QRCode value={QRvalue}/> : null }
                </div>
                </div>
            </div>
            ) 
        })}

    </div>)
}

export default OneShow