import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';

const Home = () => {
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const message = sessionStorage.getItem('successMessage');

        if (message) {
            setSuccessMessage(message);

            const clearMessageTimeout = setTimeout(() => {
                setSuccessMessage('');
                sessionStorage.removeItem('successMessage');
            }, 3500);

            return () => clearTimeout(clearMessageTimeout);
        }
    }, []);

    return (
        <>
            <Header />
            <header className="max-w-xl mx-auto mt-10 text-center">
                <h1 className="text-4xl">
                    Latest <span className="text-blue-500">SysQube Technology</span> News
                </h1>

                <h2 className="inline-flex mt-2">By Sandesh Joshi<img src="../images/lary-head.svg"
                    alt="Head of Lary the mascot" /></h2>
            </header >
            {successMessage && (
                <div className="py-4 px-6 mb-4 text-green-800 bg-green-200 rounded-lg fixed bottom-1 right-1 z-50" role="alert">
                    {successMessage}
                </div>
            )}
            <div>
                <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                    <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                        <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                            <h2 className="text-4xl font-bold sm:text-4xl">
                                Welcome to SysQube Blog
                                <span className="hidden sm:block text-xl">
                                    Your source for the latest in technology news and tutorials.
                                </span>
                            </h2>

                            <Link
                                to='/posts'
                                className="inline-flex text-white items-center px-6 py-3 font-medium bg-rose-500 rounded-lg hover:opacity-75">
                                Read Our Blogs
                            </Link>
                        </div>
                    </div>

                    <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
                        <img className="w-96" src="https://i.ibb.co/5BCcDYB/Remote2.png" alt="logo" />
                    </div>
                </aside>
            </div>

            <Footer />
        </>
    );

}

export default Home;