'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const getAlbumData = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/albums/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('fetch failed');
  }
  return response.json();
};

const getAllPhotosData = async () => {
  const url = `https://jsonplaceholder.typicode.com/photos`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('fetch failed');
  }
  return response.json();
};

const deletePhoto = async (id) => {
  const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error('delete failed');
  }
  return response.json();
};

const updatePhotoTitle = async (id, title) => {
  const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error('update failed');
  }
  return response.json();
};

const uploadPhoto = async (albumId, title, url) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ albumId, title, url, thumbnailUrl: url }),
  });
  if (!response.ok) {
    throw new Error('upload failed');
  }
  return response.json();
};

const AlbumPage = () => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [photosData, setPhotosData] = useState([]);
  const [error, setError] = useState(null);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const album = await getAlbumData(id);
          const allPhotos = await getAllPhotosData();
          const photos = allPhotos.filter(photo => photo.albumId === parseInt(id));
          setAlbumData(album);
          setPhotosData(photos);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    }
  }, [id]);

  const handleDelete = async (photoId) => {
    try {
      await deletePhoto(photoId);
      setPhotosData(photosData.filter(photo => photo.id !== photoId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (photoId, title) => {
    try {
      const updatedPhoto = await updatePhotoTitle(photoId, title);
      setPhotosData(photosData.map(photo => photo.id === photoId ? updatedPhoto : photo));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const newPhoto = await uploadPhoto(parseInt(id), newPhotoTitle, newPhotoUrl);
      setPhotosData([...photosData, newPhoto]);
      setNewPhotoTitle('');
      setNewPhotoUrl('');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!albumData) {
    return <div>Loading...</div>;
  }




  return (
    <>
    
    <div className="p-6">
    <h2 className="text-3xl font-bold text-center mb-8 text-customBlue-Primary">Upload new photo</h2>
  <form onSubmit={handleUpload} className="flex flex-col md:flex-column gap-4">
    <input
      type="text"
      placeholder="Photo Title"
      value={newPhotoTitle}
      onChange={(e) => setNewPhotoTitle(e.target.value)}
      className="bg-white p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1"
    />
    <input
      type="text"
      placeholder="Photo URL"
      value={newPhotoUrl}
      onChange={(e) => setNewPhotoUrl(e.target.value)}
      className="bg-white p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex-1"
    />
    <button type="submit" className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Upload</button>
  </form>
  <p className="text-gray-600 mt-4">URL na fotku: https://via.placeholder.com/150</p>
</div>



<h2 className="text-3xl font-bold text-center mb-8 text-customBlue-Primary">Photos</h2>
      <div className="flex flex-wrap justify-center">
  {photosData.map((photo) => (
    <div key={photo.id} className="p-6 m-4 bg-white shadow-lg transform transition-transform relative flex flex-col md:flex-column items-center justify-between rounded-lg">
    <img src={photo.thumbnailUrl} alt={photo.title} className="w-full md:w-auto md:mr-4 md:mb-0 mb-4" />
    <input
      type="text"
      value={photo.title}
      onChange={(e) => handleUpdate(photo.id, e.target.value)}
      className="bg-white p-2 my-2 md:my-0 mb-4"
    />
    <button onClick={() => handleDelete(photo.id)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
  </div>
  
  ))}
</div>


    </>
  );
};

export default AlbumPage;
