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



    // 
    return (
        <div>
            <button onClick={getShows}>Get Show</button>
            <table>
                <thead>
                    <tr>
                        <th>Show Name:</th>
                        <th>Show Summary:</th>
                    </tr>
                </thead>
                <tbody>
                    {shows.map(show => (
                        <tr key={show.id}>
                            <td>{show.show.name}</td>
                            <td>{show.show.summary}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default SearchBar;