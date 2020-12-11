import React, { useState, useEffect, useCallback } from 'react';
// import { navigate } from '@reach/router'
import axios from 'axios';
import './searchBarStyles.css';
import debounce from "lodash.debounce";


function SearchBar() {
    // function used to get shows using axios get call to the api and return a list of shows matching seaarch params----
    const [shows, setShows] = useState([]);
    const [input, setInput] = useState("");
    function getShows(event) {
        event.preventDefault()
        axios.get(`http://api.tvmaze.com/search/shows?q=${event.target.value}`)
            .then(({ data }) => {
                // console.log(data);
                data.map(item => (
                    item.show.summary = stripHTMLFromString(item.show.summary)
                ))
                setShows(data);
            })
            .catch(console.log)

    };
    // function to strip html tags from origional api call
    function stripHTMLFromString(str) {
        return str.replace(/(<([^>]+)>)/gi, "");
    }
    // funtion used to handle input change of search bar-----------

    const debouncedGetShows = debounce(getShows, 1000);
    function handleInputChange(event) {
        console.log(event.target.value);
        debouncedGetShows(event);

        setInput(event.target.value);
        // console.log("state input",input)
    }
    // function used to get episode list for shows and then store them in use state hook.-------
    const [seasons, setSeasons] = useState([])
    const [currentSeason, setCurrentSeason] = useState({})
    async function getEpisodesList(showId) {
        // console.log("id", showId);
        let allSeasons = await axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`)
        const seasonOneId = allSeasons.data[0].id;
        let seasonOne = await axios.get(`https://api.tvmaze.com/seasons/${seasonOneId}/episodes`)
        // .then(response => console.log(response.data))
        // .catch(console.log)
        console.log(seasonOne);
        console.log(allSeasons);
        setSeasons(allSeasons.data);
        setCurrentSeason(seasonOne.data);
    }
    useEffect(() => console.log("seasons", seasons), [seasons]);
    useEffect(() => console.log("current seasons", currentSeason), [currentSeason]);
    // --------------------------------------------------
    // ------inline style elements-------
    // const styleObj = {
    //     fontSize: 14,
    //     color: "#4a54f1",
    //     textAlign: "center",
    // }
    // const rowStyle = {
    //     border: "2px solid black"
    // } added some comments in for git test purposes!!!!!!
    //  ----------------------------
    return (
        <div className="container">
            <div className="header-div">
                <h3 className="header">Show Finder</h3>
            </div>
            <div>
                <form className="wrapper">
                    <img class="search-icon" alt="searchg glass" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
                    <input className="search" type="text" placeholder="Search" onChange={handleInputChange}></input>
                    <button onClick={getShows} className="search-button">Search</button>
                </form>
            </div>
            <div className="show-container">
                {shows.map(({ show }) => (
                    <div key={show.id} className="show-info">
                        <img
                            className='show-img'
                            src={show.image && (show.image.medium || show.image.original || "")}
                            alt={show.name}
                            height={300} />
                        <h2>{show.name}</h2>
                        <p>{show.summary}</p>
                        <button className="episodes-button" onClick={(e) => getEpisodesList(show.id)}>Show Episodes</button>
                    </div>
                ))}
            </div>
        </div>
        // end of container
    )
}

export default SearchBar;