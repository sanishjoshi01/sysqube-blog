import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useState } from 'react';

const Header = () => {
    const { user, logout } = useAuth();
    const username = user ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : '';
    const [display, setDisplay] = useState(false);

    const handleClick = () => {
        setDisplay(!display);
    };

    const handleLogout = () => {
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (confirmed) {
            logout();
        }
    };

    return (
        <>
            <nav className="md:flex md:justify-between md:items-center">
                <div>
                    <Link to="/">
                        <img src="../images/sysqube-logo.svg" alt="Laracasts Logo" width="165" height="16" />
                    </Link>
                </div>

                <div className="mt-8 md:mt-0">
                    {user ? (
                        <>
                            <span>Welcome, {username}</span>

                            <button onClick={handleClick} className="bg-blue-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                                Your Account
                            </button>
                            {display &&
                                <div id="dropdown" className="z-10 absolute right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">

                                        <li>
                                            <p className='block px-4 py-2 truncate'>{user.email}</p>
                                        </li>
                                        <li>
                                            <Link href="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                        </li>
                                        <li>
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-500 dark:hover:bg-red-500 dark:hover:text-white">Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="bg-blue-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="bg-blue-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <header className="max-w-xl mx-auto mt-10 text-center">
                <h1 className="text-4xl">
                    Latest <span className="text-blue-500">SysQube Technology</span> News
                </h1>

                <h2 className="inline-flex mt-2">By Sandesh Joshi<img src="../images/lary-head.svg"
                    alt="Head of Lary the mascot" /></h2>
            </header >
        </>
    );
}

export default Header;