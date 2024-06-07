'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const getData = async (id = null, userId = null) => {
  let url = 'https://jsonplaceholder.typicode.com/albums';
  if (id) {
    url = `${url}/${id}`;
  } else if (userId) {
    url = `${url}?userId=${userId}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('fetch failed');
  }
  return response.json();
};

const Albums = ({ albumId, album, userId }) => {
  const [albumData, setAlbumData] = useState(album);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(albumId, userId);
        setAlbumData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [albumId, album, userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!albumData || (Array.isArray(albumData) && albumData.length === 0)) {
    return (
    <div className="flex-item p-6 m-4 bg-white shadow-lg transform transition-transform relative flex flex-row items-center justify-between rounded-lg">
      <div className="text-lg font-bold text-slate-900">Loading...</div>
      <div className="text-2xl font-bold text-customBlue-Primary">Loading...</div>
      <div className="text-md font-semibold text-slate-900">Loading...</div>
    </div>

    );
  }

  if (Array.isArray(albumData)) {
    // When albumData is an array, render all albums
    return (
<div className="flex-container">
  {albumData.map((album) => (
      <Link href={`/albumDetails/${album.id}`}>
        <div key={album.id} className="p-6 m-4 bg-white shadow-lg transform transition-transform relative flex flex-col md:flex-row items-center justify-between rounded-lg">
          <div className="text-lg font-bold text-slate-900 md:mb-0 md:mr-4">User ID: {album.userId}</div>
          <div className="text-2xl font-bold text-customBlue-Primary">{album.title}</div>
          <div className="text-md font-semibold text-slate-900 md:ml-4">ID: {album.id}</div>
        </div>
    </Link>
  ))}
</div>

    );
  }

  <div className="p-6 m-4 bg-white shadow-lg transform transition-transform relative flex flex-col md:flex-row items-center justify-between rounded-lg">
  <div className="text-lg font-bold text-slate-900 md:mb-0 md:mr-4">User ID: {album.userId}</div>
  <div className="text-2xl font-bold text-customBlue-Primary">{album.title}</div>
  <div className="text-md font-semibold text-slate-900 md:ml-4">ID: {album.id}</div>
</div>





  // When albumData is a single object
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{albumData.userId}</td>
            <td>{albumData.id}</td>
            <td>{albumData.title}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Albums;
