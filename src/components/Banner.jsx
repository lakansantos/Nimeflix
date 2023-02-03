import React from "react";
import Navbar from "./Navbar";

import requests from "../assets/Requests";
import { useState, useEffect, useCallback } from "react";

const Banner = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchTrending = useCallback(() => {
        fetch(requests.trendingData)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => setError(error));
            console.log(data)
    }, [])

    useEffect(() => {
        
        fetchTrending();

    }, [fetchTrending])


    return (
        <div className="banner">
            <Navbar />
            <h1>This is a banner</h1>
        </div>
    )
}


export default Banner;
