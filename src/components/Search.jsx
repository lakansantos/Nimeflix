import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import requests from '../assets/Requests';
import { useState, useCallback, useEffect, useRef} from 'react';

const Search = ({showInputSearch, setShowInputSearch}) => { 

    const [data, setData] = useState(null)
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [filteredData, setFilteredData] = useState([])

    const ref = useRef(null);
 
    useEffect(() => {
        if(query){
            setShowSearchResults(true)
        } else{
            setShowSearchResults(false)
        }
    }, [query])

    useEffect(() => {
        function handleClickOutside (event) {
            if(ref.current && !ref.current.contains(event.target)){
                setShowSearchResults(false)
                setShowInputSearch(false)
            } 
        }

        document.addEventListener('mousedown', handleClickOutside);

        return (() => {
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [ref])


    
    const handleSearch = (e) => {
        setQuery(e.target.value)    
    }   

   


    useEffect(() => {
        let timeoutId;
        setIsLoading(false);

        if(query !== ''){
            setIsLoading(true);
            timeoutId = setTimeout(async () => {
                try{
                    const response = await fetch(`https://api.consumet.org/meta/anilist/${query}`);
                    if(!response.ok){
                        throw new Error('Error response not okay')
                    }
                    const data = await response.json();

                    setFilteredData(data.results)
                } catch (error){
                    setFilteredData([]);
                    setError('Error Fetching Data');
                } finally {
                    setIsLoading(false);
                }
            }, 200)

            return () => clearTimeout(timeoutId);
            
        }
    }, [query]);

    
    

    useEffect(() => {
        if(data?.results){
            setFilteredData(data.results)
        }
    }, [data])

    return(

        <div className={`flex items-center justify-end relative  w-[100%] h-1/2 ${showSearchResults ? '' : 'overflow-hidden'}`} ref={ref} >
            <input type="text"
            placeholder="Search an anime title..."
            className={!showInputSearch ? "opacity-0" : "opacity-1 w-full  h-full indent-2"} 
            style={showInputSearch ? {animation: '.4s linear showInput'} : {}}
            onChange={(e) => handleSearch(e)}
            value={query}
           />

            <li>
                <AiOutlineSearch 
                fontSize={'2.5rem'} color={'white'} 
                className={`hover:cursor-pointer w-[60px] h-[30px] ${!showInputSearch ? '' : 'bg-lightBlue'}`} 
                onClick={() => setShowInputSearch(true)}
                style={showInputSearch ? {position: 'absolute', top: 0, right: 0, width: '60px', height: '100%', animation: '.1s linear movingSearch'}: {}}
                />
            </li>

            {query !== '' && showInputSearch &&
             <AiOutlineClose 
                fontSize={'1.2rem'} 
                className='absolute  right-[65px] hover:cursor-pointer '
                onClick={() => setQuery('')}
            /> 
            }

            {showSearchResults &&  filteredData && filteredData.length > 0?
                (
                <div style={{position: 'absolute', top: '100%'}}
                className="search-container text-white border border-solid border-lightBlue w-full min-h-fit max-h-[500px] overflow-auto bg-black/90">
                    {filteredData.map((data, index) => (
                    <div key={index} className='flex justify-center items-center my-5 sm:my-5'>
                        <div className='w-full flex h-[100px] justify-start items-center hover:bg-white/10 hover:cursor-pointer'>
                            <img src={data.image} alt="title image" className='w-[100px] h-full mx-5'/>
                            <p className='w-full'>{data.title.english ? (data.title.english.length > 30 ? data.title.english.slice(0, 50) + '...' : data.title.english) : data.title.romaji ? data.title.romaji :  data.title.native}</p>
                        </div>
                    </div>
                    ))}
                </div>
                )
                : showSearchResults  && !isLoading ?
                (
                    <div style={{position: 'absolute', top: '100%'}}
                    className="search-container text-white border border-solid border-lightBlue w-full min-h-fit max-h-[500px] overflow-auto bg-black/90"> 
                    <p className='text-center my-5'>Sorry, no data found! </p>
                    </div>
                ) : isLoading ? (
                    <div style={{position: 'absolute', top: '100%'}}
                    className="search-container text-white border border-solid border-lightBlue w-full min-h-fit max-h-[500px] overflow-auto bg-black/90"> 
                    <p className='flex justify-center items-center'>Loading please wait...<span className='loading w-[20px] h-[20px]'></span></p>
                    </div>
                ) : null
            }      
        </div>

    )

}

export default Search;