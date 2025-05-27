'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Markets', href: '/markets' },
    { label: 'Charts', href: '/charts' },
    { label: 'Portfolio', href: '/portfolio' },
    {
      label: 'Demo',
      href: '/demo',
      dropdown: [
        { label: 'Trade AI', href: '/demo?section=ai' },
        { label: 'Education', href: '/demo?section=education' },
        { label: 'About Us', href: '/demo?section=about' }
      ]
    }
  ];

  return (
    <header id="header">
      <nav id="navbar">
        <div>
          <Link href="/">
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
              4X Trading
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <ul>
            {navItems.map((item, index) => (
              <li key={`${item.label}-${index}`}>
                {item.dropdown ? (
                  <div 
                    className="dropdown"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link 
                      href={item.href}
                      className={pathname === item.href ? 'active' : ''}
                    >
                      {item.label}
                    </Link>
                    {isDropdownOpen && (
                      <div className="dropdown-content">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={`${item.label}-${index}-${dropdownItem.label}`}
                            href={dropdownItem.href}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link 
                    href={item.href}
                    className={pathname === item.href ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <select style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}>
                <option value="en">EN</option>
                <option value="ru">RU</option>
                <option value="es">ES</option>
              </select>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul>
              {navItems.map((item, index) => (
                <li key={`mobile-${item.label}-${index}`}>
                  <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <ul style={{ paddingLeft: '1rem' }}>
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <li key={`mobile-${item.label}-${index}-${dropdownItem.label}`}>
                          <Link
                            href={dropdownItem.href}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation; 