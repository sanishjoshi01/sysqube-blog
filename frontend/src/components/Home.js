import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Header />
            <section className="relative flex-grow bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 flex items-center justify-center text-white my-10">
                <div className="absolute inset-0 overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 opacity-60"></div>
                </div>
                <div className="container mx-auto text-center py-20 relative z-10">
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
                        Welcome to SysQube Blog
                    </h2>
                    <p className="text-xl md:text-3xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-up">
                        Your source for the latest in technology news and tutorials.
                    </p>
                    <Link to="/posts" className="bg-white text-blue-600 py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105">
                        Read Our Posts
                    </Link>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="bg-white py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">About Us</h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        We are passionate about technology and love sharing our knowledge with the world. From in-depth tutorials to the latest news, we aim to provide valuable content for our readers.
                    </p>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Home;