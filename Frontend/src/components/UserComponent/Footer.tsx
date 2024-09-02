import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 h-52">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Branding */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">LearnSphere</h1>
        </div>

        {/* Navigation Links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.5.58-2.3.7a4.5 4.5 0 001.94-2.47 8.83 8.83 0 01-2.83 1.08 4.5 4.5 0 00-7.7 4.1A12.8 12.8 0 013 5.13a4.5 4.5 0 001.4 6 4.42 4.42 0 01-2-.57v.06a4.5 4.5 0 003.6 4.4 4.48 4.48 0 01-2 .08 4.5 4.5 0 004.22 3.1A9.02 9.02 0 012 19.54a12.73 12.73 0 006.91 2"></path>
            </svg>
          </a>
          <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 10-11 9.95V14h-3v-2h3v-1.8c0-3.14 1.92-4.91 4.78-4.91 1.36 0 2.78.24 2.78.24v3h-1.57c-1.55 0-2.03.96-2.03 1.95V12h3.44l-.55 2H14v7.95A10 10 0 0022 12"></path>
            </svg>
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.16c3.2 0 3.58.01 4.84.07 1.17.05 1.82.24 2.24.4.56.22.96.49 1.37.91.42.41.69.81.91 1.37.16.42.35 1.07.4 2.24.06 1.26.07 1.64.07 4.84s-.01 3.58-.07 4.84c-.05 1.17-.24 1.82-.4 2.24-.22.56-.49.96-.91 1.37-.41.42-.81.69-1.37.91-.42.16-1.07.35-2.24.4-1.26.06-1.64.07-4.84.07s-3.58-.01-4.84-.07c-1.17-.05-1.82-.24-2.24-.4a4.1 4.1 0 01-1.37-.91 4.1 4.1 0 01-.91-1.37c-.16-.42-.35-1.07-.4-2.24-.06-1.26-.07-1.64-.07-4.84s.01-3.58.07-4.84c.05-1.17.24-1.82.4-2.24.22-.56.49-.96.91-1.37.41-.42.81-.69 1.37-.91.42-.16 1.07-.35 2.24-.4C8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.76 0 8.31.02 7.07.07 5.81.12 4.95.33 4.24.57c-.74.26-1.36.6-1.98 1.22a6.2 6.2 0 00-1.22 1.98c-.24.7-.45 1.56-.5 2.8C.02 8.31 0 8.76 0 12s.02 3.69.07 4.93c.05 1.24.26 2.1.5 2.8.26.74.6 1.36 1.22 1.98a6.2 6.2 0 001.98 1.22c.7.24 1.56.45 2.8.5 1.24.05 1.69.07 4.93.07s3.69-.02 4.93-.07c1.24-.05 2.1-.26 2.8-.5.74-.26 1.36-.6 1.98-1.22a6.2 6.2 0 001.22-1.98c.24-.7.45-1.56.5-2.8.05-1.24.07-1.69.07-4.93s-.02-3.69-.07-4.93c-.05-1.24-.26-2.1-.5-2.8a6.2 6.2 0 00-1.22-1.98 6.2 6.2 0 00-1.98-1.22c-.7-.24-1.56-.45-2.8-.5C15.69.02 15.24 0 12 0z"></path>
              <circle cx="12" cy="12" r="3.2"></circle>
              <circle cx="18.5" cy="5.5" r="1.2"></circle>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 text-center mt-4">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} LearnSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
