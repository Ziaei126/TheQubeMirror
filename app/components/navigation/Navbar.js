"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import OutsideClickHandler from 'react-outside-click-handler';
import SignInButton from "./SignInButton";





const MENU_LIST = [
    { text: "Courses", href: "/courses" },
    { text: "Register", href: "/register" },
    { text: "Qube Day", href: "/qube_day" },
    { text: "FAQ", href: "/faq" },
    { text: "Careers", href: "/careers" },
    { text: "About Us", href: "/about" },
    { text: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [navActive, setNavActive] = useState(null);
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

        handleScroll();

        // Add the scroll event listener to window
        window.addEventListener('scroll', handleScroll);

        // Clean up the listener when component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
            
        };
    }, [hasScrolled]);

    

    return (
      <header className=" z-10 sticky top-0 print:hidden">
        <nav className={`flex p-4 justify-between items-center ${hasScrolled ?  "bg-white shadow" : "bg-cream"}`}>
          <Link href={"/"}>
            
              <Image src="/assets/logo.webp" width='150' height='50' alt="Qube Logo"/>
            
          </Link>
          <OutsideClickHandler
      onOutsideClick={() => {
        setNavActive(false);
      }}
    >
          <div
          
            onClick={() => setNavActive(!navActive)}
            className="flex flex-col gap-y-2 cursor-pointer md:hidden"
          >
            <div className="w-6 h-1 bg-black rounded"></div>
            <div className="w-6 h-1 bg-black rounded"></div>
            <div className="w-6 h-1 bg-black rounded"></div>
          </div>

          <div className={`${navActive ? "right-2" : "-right-40"} border md:border-none bg-white md:bg-transparent flex flex-col fixed top-16 w-40 gap-y-6 p-6 nav__menu-list min-h-min rounded `}>

            {MENU_LIST.map((menu) => (
              <div
                onClick={() => {
                  setNavActive(false);
                }}
                key={menu.text}
              >
                <Link href={menu.href} > {menu.text} </Link>
              </div>
            ))}
            <SignInButton />
          </div>
          </OutsideClickHandler>

          
        </nav>
      </header>
    );
  };
  
  export default Navbar;

  