import React, { useState, useEffect } from 'react';
// import { navigate } from '@reach/router'
import axios from 'axios';

function SearchBar() {
    const [shows, setShows] = useState([]);
    function getShows(event) {
        event.preventDefault()
        axios.get(`http://api.tvmaze.com/search/shows?q=${input}`)
            .then(({ data }) => {
                // console.log(data);
                data.map(item => (
                    item.show.summary = stripHTMLFromString(item.show.summary)
                ))
                setShows(data);
            })
            .catch(console.log)

    };
    function stripHTMLFromString(str) {
        return str.replace(/(<([^>]+)>)/gi, "");
    }

    const [input, setInput] = useState("");
    function handleInputChange(event) {
        // console.log(event.target.value);
        setInput(event.target.value);
        // console.log("state input",input)
    }
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

    const styleObj = {
        fontSize: 14,
        color: "#4a54f1",
        textAlign: "center",
    }
    const rowStyle = {
        border: "2px solid black"
    }
    return (
        <div>
            <form>
                <input type="textarea" onChange={handleInputChange}></input>
                <button onClick={getShows}>Get Show</button>
            </form>
            <table style={styleObj}>
                <thead>
                    <tr style={rowStyle}>
                        <th>Show Name:</th>
                        <th>Show Summary:</th>
                        <th>IMG</th>
                    </tr>
                </thead>
                <tbody>
                    {shows.map(({ show }) => (
                        <tr key={show.id} style={rowStyle}>
                            <td style={rowStyle}>
                                {show.name}
                                <button onClick={(e) => getEpisodesList(show.id)}>Show Info</button>
                            </td>
                            <td style={rowStyle}>{show.summary}</td>
                            <td>
                                <img
                                    className='show-img'
                                    src={show.image && (show.image.medium || show.image.original || "")}
                                    alt={show.name}
                                    height={300} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default SearchBar;