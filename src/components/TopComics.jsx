// TopComics.js
import React, { useState, useEffect } from 'react';
import md5 from 'md5';

function TopComics() {
  /*const [topComics, setTopComics] = useState([]);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    
    const timeStamp = new Date().getTime();
    const hash = md5(`${timeStamp}${privateKey}${publicKey}`);
    const url = `https://gateway.marvel.com:443/v1/public/comics?apikey=${publicKey}&ts=${timeStamp}&hash=${hash}&limit=10`;

    fetch(url)
      .then(response => response.json())
      .then(result => {
        setTopComics(result.data.results);
      })
      .catch(error => {
        console.error('Error fetching top comics:', error);
      });
  }, []);

  return (
    <div className="top-comics">
      <h2>Top Comics</h2>
      <ul>
        {topComics.map(comic => (
          <li key={comic.id}>{comic.title}</li>
        ))}
      </ul>
    </div>
  );*/
}

export default TopComics;
