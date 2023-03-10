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
    }, [])

    useEffect(() => {

        fetchTrending();
    }, [fetchTrending])

    let resultsData = []

    if(data){
        let getResults = data.results.map(result => result)

        for(let i = 0; i < getResults.length; i++){
            resultsData.push(getResults[i])
        }

        //just to check the title length
        // let countsDesc = []
        // for(let i = 0; i < resultsData.length; i++){
        //     countsDesc.push(resultsData[i].description.length)
        // }

        // console.log(Math.min(...countsDesc))

    }
    

    useEffect(() => {

        const intervalId = setInterval(() => {
            changeIndex(currentIndex + 1);
        }, 20000);

        if(currentIndex >= resultsData.length){
            changeIndex(0)
        }


        return () => clearInterval(intervalId)
    }, [currentIndex])


    return data && resultsData.length > 0 ?(
        <div id="banner"
        className="banner h-[70vh] sm:h-[70vh]  flex flex-col  justify-between" 
        style={{
            background: `url(${resultsData[currentIndex] ? resultsData[currentIndex].cover :null}) center/cover no-repeat rgba(0,0,0, .6)`,
            backgroundBlendMode: 'multiply'
        }
        
        }>
            <Navbar />
            <div className="title-description-container text-white h-[100%] z-[99] sm:h-[60vh] flex flex-col justify-center sm:justify-center">
                <div>
                <p className="text-4xl text-white font-bold mb-5 ml-5 h-fit flex justify-center items-center sm:block sm:h-fit max-h-50  text-center sm:text-left w-[90%] tracking-widest">{resultsData[currentIndex] ? resultsData[currentIndex].title.english  ? resultsData[currentIndex].title.english : resultsData[currentIndex].title.romaji : '' }</p>
                <p className="w-[90%] ml-5 sm:w-1/2 h-fit text-justify  mb-5">{resultsData[currentIndex] ? resultsData[currentIndex].description.replace(/<br>/g, '').slice(0, 170) + '...': 'No description'} <a href="" className="underline underline-offset-1">See more</a> </p>
                </div>
                <div className="w-[90%] ml-5 flex flex-row justify-center gap-[20px] sm:justify-start">   
                    <button className="bg-white text-black font-bold p-[10px] w-[100px] hover:bg-hoverGray ">Play</button>
                    <button className="bg-grayish p-[10px] w-[100px] hover:bg-darkGray text-white  font-bold">More info</button>
                </div>
            </div>
            <div className="banner-fadeBottom"></div>
        </div>
        
    ) : (
        <div className="banner flex justify-center items-center flex-col h-[50vh] sm:h-[70vh]">
            <div className="loading"></div>
        </div>  
    )
}


export default Banner;
