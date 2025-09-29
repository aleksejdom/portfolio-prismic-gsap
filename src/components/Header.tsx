'use client';

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { gsap } from "gsap";

export default function Header() {
  const [isActive, setIsActive] = useState(false); 
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsActive((prev) => {
      const newState = !prev;
      animateMenu(newState);
      return newState;
    });
  };

  const closeMenu = () => {
    setIsActive(false);
    animateMenu(false);
  };

  const animateMenu = (open: boolean) => {
    if (open) {
      gsap.to("nav", { height: "255px", width: "295px", duration: 0.3 });
      gsap.to("nav .menu", { opacity: 1, duration: 0.3, delay: 0.4 });
    } else {
      gsap.to("nav", { height: "45px", width: "115px", duration: 0.3 });
      gsap.to("nav .menu", { opacity: 0, duration: 0.3 });
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isActive && navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  // Fetch data from Prismic
  useEffect(() => {
    const fetchSettings = async () => {
      const client = createClient();
      const data:any = await client.getSingle("settings");
      setSettings(data);
      setIsLoading(false);
    }; 
    fetchSettings();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}>
        <div className="loading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="animate-spin w-12 h-12"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#fff"
              strokeWidth="4"
              strokeDasharray="31.415,31.415"
              strokeDashoffset="0"
              fill="none"
              className="stroke-current"
            ></circle>
          </svg>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <header>
      <nav ref={navRef}>
        {/* Toggle Button */}
        <div className="open" onClick={toggleMenu}>
          {!isActive ?  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg> 
          : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          }
          {isActive ? "CLOSE" : "MENU"}
        </div>

        {/* Menu */}
        <div className={`menu ${isActive ? "active" : ""}`}>
          <ul>
            {settings?.data?.navigation?.map(({ link, link_name }: any) => (
              <li key={link_name}>
                <PrismicNextLink field={link}>
                  {link_name}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg> 
                </PrismicNextLink>
              </li>
            ))}
          </ul>
          <p>
            Digitale Erlebnisse, die überzeugen.<br />Von 3D bis Web.
          </p>
        </div>
      </nav>
    </header>
  );
}
