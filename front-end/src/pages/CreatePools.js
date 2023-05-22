import React, { useState } from 'react';
import axios from 'axios';

export function CreatePools() {
  const [fromDate, setStartDate] = useState('');
  const [toDate, setEndDate] = useState('');
  const [matches, setMatches] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct the API URL with the fromDate, toDate, and auth token
    //const apiUrl = `http://api.football-data.org/v4/competitions/2021/matches?dateFrom=${fromDate}&dateTo=${toDate}`;
    const apiUrl = "https://httpbin.org/get";
    const authToken = '762ad25890e74fcc992bca3322cd3fc3';

    // Make the API call with the auth token in the headers
    /*fetch(apiUrl, {
      mode: "cors",
      headers: {
        'X-Auth-Token': '762ad25890e74fcc992bca3322cd3fc3',
      }
    })*/
    fetch(apiUrl)
      .then(response => {
        console.log(response);
        response.json()
      })
      .then(data => {
        // Update the state with the matches returned from the API
        //setMatches(data.matches);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });
  };

  return (
    <div>
      <h1>
        Create Pool
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="text"
            value={fromDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="text"
            value={toDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Match Date</th>
            <th>Match Result</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.id}</td>
              <td>{match.date}</td>
              <td>{match.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
