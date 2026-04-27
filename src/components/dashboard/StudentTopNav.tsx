"use client";
import React from 'react';
import Link from 'next/link';

const StudentTopNav = () => {
  const links = [
    { name: 'Inicio', href: '/' },
    { name: 'Nuestra Historia', href: '/nuestra-historia' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Disciplinas', href: '/disciplinas' },
    { name: 'Eventos', href: '/eventos', hasArrow: true },
  ];

  return (
    <nav className="flex items-center bg-[#1a1c2c]/40 backdrop-blur-md px-10 py-3 rounded-full border border-white/10 shadow-lg">
      <ul className="flex items-center gap-10">
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href}
              className="text-white font-bold text-xs tracking-tight hover:text-[#AAFF00] transition-colors flex items-center gap-1"
            >
              {link.name}
              {link.hasArrow && (
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StudentTopNav;
