
import {React} from "react";
import requests from "../assets/Requests";
import Rows from "./Rows";

const Animes = () => {  

    return (
        <div className="animes h-full">
            <Rows title={'Trending Now'} fetchURL={requests.trendingData}/>
            <Rows title={'Popular'} fetchURL={requests.popularData}/>
            <Rows title={'New Releases'} fetchURL={requests.recentlyAdded}/>
        </div>
    )
}


export default Animes;