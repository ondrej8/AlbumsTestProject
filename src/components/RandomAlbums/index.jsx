import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const RandomAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        setAlbums(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const getRandomAlbums = (albums) => {
    if (albums.length === 0) return [];
    const shuffledAlbums = [...albums].sort(() => 0.5 - Math.random());
    return shuffledAlbums.slice(0, 3);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (albums.length === 0) {
    return <div>Loading...</div>;
  }

  const randomAlbums = getRandomAlbums(albums);

  return (
      <div>
        {randomAlbums.map(album => (
           <div key={album.id}>
          <Link href={`/albumDetails/${album.id}`}>
          <div className="p-6 m-4 bg-white shadow-lg transform transition-transform relative flex flex-col md:flex-row items-center justify-between rounded-lg">
            <div className="text-lg font-bold text-slate-900 md:mb-0 md:mr-4">User ID: {album.userId}</div>
            <div className="text-2xl font-bold text-customBlue-Primary">{album.title}</div>
            <div className="text-md font-semibold text-slate-900 md:ml-4">ID: {album.id}</div>
          </div>
          </Link>
         </div>
        ))}
      </div>
  );
};

export default RandomAlbums;
