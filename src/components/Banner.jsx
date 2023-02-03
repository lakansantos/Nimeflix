import React from "react";
import Navbar from "./Navbar";

import requests from "../assets/Requests";
import { useState, useEffect, useCallback } from "react";

const Banner = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchTrending = useCallback(() => {
        fetch(requests.popularData)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
            console.log(data)
    }, [])

    useEffect(() => {

        fetchTrending();

    }, [fetchTrending])

    let coverImages = []

    if(data){
        coverImages.push(data.results.map(result => result.cover))
        console.log(coverImages[0][0])
    }
    return (
        <div className="banner border border-solid border-white" style={
            {
                backgroundImage: `url(https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg)`,
                backgroundSize : 'cover',
                backgroundPosition: 'center',
                objectFit: 'fixed'
                
            }
        }>
            <Navbar />
            <h1>This is a banner</h1>
        </div>
    )
}


export default Banner;
