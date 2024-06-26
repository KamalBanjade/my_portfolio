import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FaBars, FaDownload } from 'react-icons/fa';
import Cookies from '@/components/js-cookie'; // Updated import path

const Navbar: React.FC = () => {
const [activeSection, setActiveSection] = useState<string>('home');
const [isSheetOpen, setSheetOpen] = useState<boolean>(false);
const [sheetView, setSheetView] = useState<string>('');
const sections = ['about', 'gallery', 'skills', 'blogs'];

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const section = document.getElementById(sectionId);
        if (section) {
            let offsetAdjustment = -50;
            const screenWidth = window.innerWidth;
            if (screenWidth <= 768) {
                offsetAdjustment = -10;
            }
    
            const sectionTop = section.offsetTop - navbarHeight + offsetAdjustment;
            const scrollOptions: ScrollToOptions = {
                top: sectionTop,
                behavior: 'smooth'
            };
    
            window.scrollTo(scrollOptions);
            window.history.replaceState(null, '', `#${sectionId}`);
        }
    };
    
    useEffect(() => {
        const handleScroll = () => {
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            const windowScrollY = window.scrollY;
            if (windowScrollY < 50) {
                setActiveSection('home');
                return;
            }
    
    
            let foundActiveSection = false;
    
            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop - navbarHeight;
                    const sectionHeight = section.offsetHeight;
    
                    if (windowScrollY >= sectionTop - 60 && windowScrollY < sectionTop + sectionHeight - 60) { // Adjust for navbar height
                        setActiveSection(sectionId);
                        window.history.replaceState(null, '', `#${sectionId}`);
                        foundActiveSection = true;
                        break;
                    }
                }
            }
            if (!foundActiveSection) {
                setActiveSection('');
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sections]);
    
    useEffect(() => {
        Cookies.set('activeSection', activeSection);
        window.history.replaceState(null, '', `#${activeSection}`);
    }, [activeSection]);
    
    
    const openSheet = (view: string) => {
        setSheetView(view);
        setSheetOpen(true);
        window.history.replaceState(null, '', `#${view}`);
    };
    
    const closeSheet = () => {
        setSheetOpen(false);
        const currentSection = activeSection || 'home';
        window.history.replaceState(null, '', `#${currentSection}`);
    };
    
    return (
        <nav className="sticky top-0 z-10 bg-[#0a192f] bg-opacity-95 flex justify-between items-center py-2 md:py-4 px-8 md:px-12 lg:px-16 shadow-lg shadow-gray-800/50 dark:shadow-gray-800 fade-in ">
            <Link href="#home" passHref>
                <button
                    id="home"
                    className="home-button"
                    title="Home"
                    onClick={(event) => {
                        if (event.detail === 1) {
                            scrollToSection('home');
                        } else if (event.detail === 2) {
                            window.location.reload();
                        }
                    }}
                >
                    <span
                        className={`flex w-full items-center py-2 text-lg font-semibold ${activeSection === 'home' ? 'text-[#64ffda]' : 'text-[#ccd6f6]'}`}
                    >
                        <svg className="w-8 h-8 hex-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <polygon className="hexagon" points="50,10 85,32 85,68 50,90 15,68 15,32" fill="none" stroke={activeSection === 'home' ? '#64ffda' : '#ccd6f6'} strokeWidth="5" />
                            <text className="hex-text" x="50" y="53" textAnchor="middle" alignmentBaseline="middle" fill={activeSection === 'home' ? '#64ffda' : '#ccd6f6'} fontSize="30px" fontWeight="bold">
                                K
                            </text>
                        </svg>
                    </span>
                </button>
            </Link>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
    
                .fade-in {
                    animation: fadeIn 1s ease-in-out;
                }
    
                .home-button .hex-svg:hover .hexagon {
                    stroke: #64ffda;
                }
                .home-button .hex-svg:hover .hex-text {
                    fill: #64ffda;
                }
                .resume-iframe-container:hover iframe {
                    transform: scale(1.2);
                }
            `}</style>
    
            <div className="hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-8 ">
            {sections.map(sectionId => (
                    <Link key={sectionId} href={`#${sectionId}`} passHref>
                        <span
                            onClick={() => scrollToSection(sectionId)}
                            className={`flex w-full items-center py-2 text-lg font-semibold transition-transform duration-200 transform-gpu hover:scale-105 ${activeSection === sectionId ? 'text-[#64ffda] animate-pulse' : 'text-[#ccd6f6]'} hover:text-[#64ffda]`}
                        >
                            {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                        </span>
                    </Link>
                ))}
                <button
                    className="bg-transparent hover:bg-[#0a192f] hover:text-teal-500 font-semibold text-[#64ffda] py-3 px-7 rounded-md border border-[#64ffda] transition duration-300 transform hover:scale-105 "
                    onClick={() => openSheet('resume')}
                >
                    Resume
                </button>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="md:hidden" variant="icon">
                        <div style={{ fontSize: '1.5em' }} className="h-6 w-10 text-[#ccd6f6] hover:text-[#64ffda]">
                            <FaBars />
                        </div>
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
    
                <SheetContent className="bg-[#0a192f] transform transition-transform duration-300 ease-in-out w-40 max-w-full">
                    <div className="grid gap-2 py-4 pr-4">
                        {sections.map(sectionId => (
                            <Link key={sectionId} href={`#${sectionId}`} passHref>
                                <span
                                    onClick={() => {
                                        scrollToSection(sectionId);
                                        setSheetOpen(false);
                                    }}
                                    className={`flex justify-center items-center py-2 text-lg font-semibold transition-transform duration-200 transform-gpu hover:scale-105 ${activeSection === sectionId ? 'text-[#64ffda]' : 'text-[#ccd6f6]'} hover:text-[#64ffda]`}
                                >
                                    {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                                </span>
                            </Link>
                        ))}
                        <button
                            className="mt-4 ml-auto bg-transparent hover:bg-[#0a192f] hover:text-teal-500 font-semibold text-[#64ffda] py-1 px-3 sm:py-2 sm:px-5 rounded-md border border-[#64ffda] transition duration-300 transform hover:scale-105 text-sm sm:text-base"
                            onClick={() => openSheet('resume')}
                        >
                            Resume
                        </button>
                    </div>
                </SheetContent>
            </Sheet>
    
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="bg-gradient-to-r from-[#0a192f] to-[#0a192f] transform transition-transform duration-300 ease-in-out w-full md:w-auto">
                    <div className="p-4 flex flex-col items-center text-center space-y-4 bg-gradient-to-r from-[#0a192f] to-[#0a192f] rounded-md shadow-xl transition duration-500 ease-in-out transform hover:scale-100 hover:translate-y-1 fade-in">
                        <h2 className="text-[#64ffda] text-xl md:text-2xl font-bold mb-2">
                            <span className="text-#8892b0">Resume</span>
                        </h2>
                        <p className="text-#a8b2d1 text-base">
                            Please find my resume attached. Looking forward to connecting!
                        </p>
                        <div className="w-full flex justify-center shadow-lg rounded-md overflow-hidden resume-iframe-container transition-transform duration-300 ease-in-out">
                            <iframe
                                src="/resume.pdf"
                                className="h-[57.5vh] w-[41vh] md:h-[56vh] md:w-[43vh] rounded-md border-2 border-[#64ffda]"
                                style={{ border: 'none' }}
                            />
                        </div>
                        <a
                            href="/resume.pdf"
                            download="kamal's_resume.pdf"
                            className="bg-transparent hover:bg-[#0a192f] hover:text-teal-500 font-semibold text-[#64ffda] py-2 px-5 rounded-md border border-[#64ffda] transition duration-300 transform hover:scale-105 flex items-center space-x-2"
                        >
                            <span>Download Resume</span> <FaDownload />
                        </a>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    );
};

export default Navbar;
