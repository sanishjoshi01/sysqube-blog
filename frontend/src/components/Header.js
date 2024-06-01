import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

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
                            <span className="text-xs font-bold uppercase">Hello, {user.name}</span>
                            <button onClick={logout} className="ml-3 text-xs font-bold uppercase">Logout</button>
                        </>
                    ) : (
                        <Link to="/register" className="text-xs font-bold uppercase">Register</Link>
                    )}
                    {/* <Link to="/register" className="text-xs font-bold uppercase">Register</Link> */}

                    <Link to="/" className="bg-blue-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                        Subscribe for Updates
                    </Link>
                </div>
            </nav>

            <header className="max-w-xl mx-auto mt-20 text-center">
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