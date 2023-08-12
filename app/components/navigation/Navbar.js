"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const MENU_LIST = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/about" },
    { text: "Contact", href: "/contact" },
  ];
  const Navbar = () => {
    const [navActive, setNavActive] = useState(null);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 10) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
    };
    
    // Add the scroll event listener to window
    window.addEventListener('scroll', handleScroll);

    // Clean up the listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
    return (
      <header className=" z-10 sticky top-0">
        <nav className={`flex p-4 justify-between items-center ${hasScrolled ?  "bg-slate-300 shadow" : "bg-cream"}`}>
          <Link href={"/"}>
            
              <Image src="/assets/logo.webp" width='150' height='50' />
            
          </Link>
          <div
            onClick={() => setNavActive(!navActive)}
            className="flex flex-col gap-y-2 cursor-pointer md:hidden"
          >
            <div className="w-6 h-1 bg-black rounded"></div>
            <div className="w-6 h-1 bg-black rounded"></div>
            <div className="w-6 h-1 bg-black rounded"></div>
          </div>
          <div className={`${navActive ? "right-2" : "-right-40"} ${hasScrolled ? " bg-white" : "bg-cream"} flex flex-col fixed top-16 w-40 gap-y-6 p-6 nav__menu-list min-h-min rounded border`}>
            {MENU_LIST.map((menu, idx) => (
              <div
                onClick={() => {
                  setActiveIdx(idx);
                  setNavActive(false);
                }}
                key={menu.text}
              >
                <NavItem active={activeIdx === idx} {...menu} />
              </div>
            ))}
          </div>
        </nav>
      </header>
    );
  };
  
  export default Navbar;

const NavItem = ({ text, href, active }) => {
    return (
      <Link href={href} className={`nav__item ${
        active ? "active" : ""
      }`}>
        
          
        
          {text}
        
      </Link>
    );
  };
  