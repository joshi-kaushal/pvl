"use client";

import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("");

  const navbarItems = [
    { href: "/", label: "Company" },
    { href: "/people", label: "People", count: 10 },
    { href: "/violations", label: "Violations", count: 5 },
    { href: "/statistics", label: "Statistics" },
    { href: "/settings", label: "Settings" },
    { href: "/profile", label: "Profile" },
    { href: "/logout", label: "Logout" },
  ];

  const mobileNavbarItems = navbarItems.filter((item) => {
    return item.label === "People" || item.label === "Settings";
  });

  const handleLogout = () => {
    const token = {
      userId: "12345",
      username: "mockUser",
      exp: Date.now() + 3600 * 1000, // 1 hour expiration
    };
    const jsonToken = JSON.stringify(token);
    console.log("JWT:", jsonToken); // Replace with actual JWT creation logic
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav className="flex justify-between items-center bg-gray-900 shadow-md">
      <div className="hidden md:flex navbar-left">
        {navbarItems.slice(0, 5).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`text-neutral-200 hover:text-neutral-400 py-6 px-4 font-medium ${
              currentPath === item.href ? "bg-slate-950" : ""
            }`}
          >
            {item.label}
            {item.count && (
              <span className="ml-2 p-1 bg-red-500 rounded-full text-xs">
                {item.count}
              </span>
            )}
          </a>
        ))}
      </div>
      <div className="hidden md:flex navbar-right">
        {navbarItems.slice(5).map((item) =>
          item.label === "Logout" ? (
            <button
              key={item.label}
              onClick={handleLogout}
              className={`text-neutral-200 hover:text-neutral-400 px-4 py-2 font-medium`}
            >
              {item.label}
            </button>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className={`text-neutral-200 hover:text-neutral-400 px-4 py-2 font-medium ${
                currentPath === item.href ? "bg-slate-950" : ""
              }`}
            >
              {item.label}
            </a>
          )
        )}
      </div>
      <div className="md:hidden flex justify-between items-center w-full">
        {mobileNavbarItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`text-neutral-200 hover:text-neutral-400 py-6 px-4 font-medium ${
              currentPath === item.href ? "bg-slate-950" : ""
            }`}
          >
            {item.label}
            {item.count && (
              <span className="ml-2 p-1 bg-red-500 rounded-full text-xs">
                {item.count}
              </span>
            )}
          </a>
        ))}
        <button className="mobile-menu-button">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
