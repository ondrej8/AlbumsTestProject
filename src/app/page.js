'use client'
import React from 'react';
import Link from 'next/link';
import RandomAlbums from '../components/RandomAlbums';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-customBlue-Primary text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Image Albums</h1>
          <p className="text-lg mb-6">Discover a world of stunning images with our galleries. Enjoy exploring the diverse collection of visual masterpieces!</p>
          <Link href="/albums">
            <button className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
              Explore Now
            </button>
          </Link>
        </div>
      </section>
      

      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-customBlue-Primary">Random Image Albums</h2>
          <RandomAlbums />
        </div>
      </section>
    </div>
  );
};

export default Home;
