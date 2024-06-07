'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-customBlue-Primary text-white">
      <div className="container mx-auto flex justify-between items-center p-5">
        <div className="text-lg font-bold">
          <Link href="/">Albums page</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/albums" className="hover:text-gray-400">Albums</Link>
          <a href="#footer" className="hover:text-gray-400">Footer</a>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none relative w-6 h-6">
            <div className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
            <div className={`block w-6 h-0.5 bg-white transition-transform duration-300 mt-1.5 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <nav className="bg-customBlue-Primary flex flex-col space-y-2 p-5">
            <Link href="/" className="hover:text-gray-400" onClick={toggleMenu}>Home</Link>
            <Link href="/albums" className="hover:text-gray-400" onClick={toggleMenu}>Albums</Link>
            <a href="#footer" className="hover:text-gray-400" onClick={toggleMenu}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
