import React, { useState } from 'react';
// import { navigate } from '@reach/router'
import axios from 'axios';

function SearchBar() {
    const [shows, setShows] = useState({});

    function getShows() {
        axios.get('http://api.tvmaze.com/search/shows?q=office')
            .then(response => {
                response.data.map(item => {
                    let show = item.show;
                    console.log('show:', show);
                });
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
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default SearchBar;