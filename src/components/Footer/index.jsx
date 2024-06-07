import React from 'react';

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">Ondřej Vandrovec</h2>
        </div>
        <div className="text-center md:text-right">
          <p className="mb-2">Tel: <a href="tel:+420608200101" className="text-blue-400 hover:text-blue-600">+420608200101</a></p>
          <p className="mb-2">Email: <a href="mailto:ondrejvandrovec@gmail.com" className="text-blue-400 hover:text-blue-600">ondrejvandrovec@gmail.com</a></p>
        </div>
      </div>
    </footer>
  );
}
