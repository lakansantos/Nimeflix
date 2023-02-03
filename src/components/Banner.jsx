import React from "react";
import Navbar from "./Navbar";
import requests from "../assets/Requests";
import { useState, useEffect, useCallback } from "react";

const Banner = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    let [currentIndex, changeIndex] = useState(0)
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
        let getCoverImages = data.results.map(result => result.cover)

        for(let i = 0; i < getCoverImages.length; i++){
            coverImages.push(getCoverImages[i])
        }

       
    

    }
    useEffect(() => {
        setTimeout(() => {
            changeIndex((currentIndex + 1));
            
        }, 1000);

        if(currentIndex >= coverImages.length){
            changeIndex(0)
        }
    }, [currentIndex])
 



    return (
        <div className="banner" style={
            {
                backgroundImage: `url(${coverImages[currentIndex]})`,
                backgroundSize : 'cover',
                backgroundPosition: 'center',
                objectFit: 'fixed'   
            }
        }>
            <Navbar />
            <h1>This is a banner</h1>
            <p>Movie Title</p>
            <p>Movie description</p>
        </div>
    )
}


export default Banner;
