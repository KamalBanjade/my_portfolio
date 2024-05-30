import React, { useEffect } from 'react';
import Link from 'next/link';
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

const Home: React.FC = () => {
    useEffect(() => {
        const welcomeElement = document.querySelector('#welcome') as HTMLElement | null;
        if (welcomeElement) {
            welcomeElement.style.opacity = '1';
        }
    }, []);

    const scrollToSection = (sectionId: string) => {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - navbarHeight;
            const scrollOptions: ScrollToOptions = {
                top: sectionTop,
                behavior: 'smooth'
            };
            const delay = 60;
            setTimeout(() => {
                window.scrollTo(scrollOptions);
            }, delay);
        }
    };

    return (
        <HydrationOverlay>
        <div className="container flex-1 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 text-left mt-8 p-4 sm:p-6 md:p-8">

            <h1  className="text-[#64ffda] text-3xl md:text-4xl lg:text-4xl font-bold mb-4"> 🚀Welcome! I'm</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#a8b2d1] leading-snug md:leading-tight lg:leading-tight">Kamal Banjade.</h2>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-[#8892b0] leading-snug md:leading-tight lg:leading-tight">19-Year-Old Web Explorer Pursuing BSc.CSIT.</h3>
            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 text-[#beccf7] leading-snug md:leading-tight lg:leading-tight">Fueled by Pixels, Driven by Passion: I Craft with Code and Creativity.</h4>
            <p className="mb-8 text-sm md:text-base lg:text-lg leading-snug md:leading-tight lg:leading-tight text-[#ccd6f6]">Discover my projects, expertise, and journey in my digital realm.</p>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Link href="#projects" passHref>
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="bg-[#0a192f] hover:bg-teal-600 text-teal-500 font-semibold py-3 px-6 rounded-md border border-teal-500 transition duration-300"
                        style={{ width: '156px', height: '50px' }} 
                    >
                        View Projects
                    </button>
                </Link>
                <Link href="#contact" passHref>
                    <button
                        onClick={() => scrollToSection('contact me')}
                        className="bg-transparent hover:bg-white hover:text-teal-500 text-white font-semibold py-3 px-6 rounded-md border border-white transition duration-300"
                        style={{ width: '156px', height: '50px' }} 
                    >
                        Contact Me
                    </button>
                </Link>
            </div>

        </div>
        </HydrationOverlay>
    );
};

export default Home;
