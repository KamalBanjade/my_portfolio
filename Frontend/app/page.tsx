"use client"
import React from 'react';
import '../app/globals.css'
import type { AppProps } from 'next/app'
import Navbar from './navbar';
import Home from "./Home";
import About from "./about";
import Gallery from "./Gallery";
import Skills from "./Skills";
import Blogs from "./Blogs";
import Projects from "./Project";

const scrollbarStyles = `
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #0a192f; 
}
::-webkit-scrollbar-thumb {
  background: #64ffda; 
  border-radius: 3px;                                   
}                         
`;
export default function Component() {
  function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
  }
  return (
    <div key="1" className="bg-[#0a192f] min-h-screen flex flex-col text-white">
      <style jsx>{scrollbarStyles}</style>
      <div>
        <Navbar />
        <div className="h-12 md:h-16" />
        <div>
          <Home />
        </div>
        <div className="h-20 md:h-16" />
        <div>
          <About />
        </div>
        <div className="h-20 md:h-16" />
        <div>
          <Gallery />
        </div>
        <div className="h-20 md:h-16" />
        <div>
          <Skills />
        </div>
        <div className="h-20 md:h-16" />
        <div>
          <Blogs />
        </div>
        <div className="h-20" />
        <div>
          <Projects />
        </div>
        <div className="h-20" />
      </div>
    </div >
  )
}

