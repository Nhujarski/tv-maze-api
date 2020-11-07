import React, { useState } from 'react';
// import { navigate } from '@reach/router'
import axios from 'axios';

function SearchBar() {
    const [shows, setShows] = useState([]);

    function getShows() {
        axios.get(' http://api.tvmaze.com/search/shows?q=office')
            .then(response => {
                console.log(response.data);
                setShows(response.data);
            })
            .catch(console.log)

    };

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
            <button onClick={getShows}>Get Show</button>
            <table style={styleObj}>
                <thead>
                    <tr style={rowStyle}>
                        <th>Show Name:</th>
                        <th>Show Summary:</th>
                    </tr>
                </thead>
                <tbody>
                    {shows.map(show => (
                        <tr key={show.id} style={rowStyle}>
                            <td style={rowStyle}>{show.show.name}</td>
                            <td style={rowStyle}>{show.show.summary}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default SearchBar;