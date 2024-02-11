import React, { useState } from 'react';
import codistanlogo from '../../src assets/codistanlogo.png';
import { NavLink, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Navbar = () => {
    const [isMenuOpen, setisMenuOpen] = useState(false);

    const handleMenuToggler = () => {
        setisMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/", title: "Jobs List" },
    ];

    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
               
                paddingLeft: '6rem',
                paddingRight: '6rem',
                maxWidth: '1536px',
            }}
        >
            <nav
                style={{
                    display: 'flex',
                    paddingTop: '0.2rem',
                    paddingBottom: '0.2rem',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <a
                    href="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'black',
                    }}
                >
                    <img
                        src={codistanlogo}
                        alt="Codistan Logo"
                        width="99"
                        height="80"
                        viewBox="0 0 29 30"
                        style={{ marginRight: '1rem' }}
                    />
                    <span>
                        <Typography variant="h5">JobPortal</Typography>
                    </span>
                </a>
                <ul
                    style={{
                        listStyleType: 'none',
                        padding: 0,
                        display: 'flex',
                        marginLeft: '12rem',
                        marginRight:'8rem',
                    }}
                >
                    {navItems.map(({ path, title }) => (
                        <li
                            key={path}
                            style={{
                                fontSize: '1.2rem',
                                lineHeight: '1.5rem',
                                marginLeft: '4rem',
                                // Adjusted margin for spacing
                            }}
                        >
                            <NavLink
                                to={path}
                                style={{
                                    textDecoration: 'none',
                                    color: '#444444',
                                }}
                            >
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div
                    style={{
                        listStyleType: 'none',
                        padding: 0,
                        display: 'flex',
                        marginLeft:'15rem',
                        gap: '2rem',
                    }}
                >
                    <Link
                        to="/login"
                        style={{
                            textDecoration: 'none',
                            fontSize: '1.2rem',
                            color: '#000000',
                           // backgroundColor: '#E2E5DE',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '0.25rem',
                            borderWidth: '2px',
                            borderColor: 'black',
                            display: 'inline-block',
                            textAlign: 'center',
                        }}
                    >
                        Log in
                    </Link>
                    <Link
                        to="/sign-up"
                        style={{
                            textDecoration: 'none',
                            fontSize: '1.2rem',
                            color: '#ffffff',
                            backgroundColor: '#3575E2',
                            padding: '0.5rem 1.25rem',
                            borderRadius: '0.25rem',
                            borderWidth: '1px',
                            borderColor: '#3575E2',
                            display: 'inline-block',
                            textAlign: 'center',
                        }}
                    >
                        Sign Up
                    </Link>
                </div>

            </nav>
        </header>
    );
};

export default Navbar;
