import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
            <img src="../images/lary-newsletter-icon.svg" alt="lary" className="mx-auto -mb-6" style={{ width: '100px' }} />
            <h5 className="text-2xl font-normal leading-7 text-grey-700">Stay in touch with the latest posts</h5>

            <div className="mt-5">
                <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900 mb-5">
                    <Link to='/' className="text-gray-600 hover:text-gray-900">Home</Link>
                    <Link to='/posts' className="text-gray-600 hover:text-gray-900">Blogs</Link>
                    <p className="text-gray-600 hover:text-gray-900">About</p>
                </div>
            </div>
            <p className="text-base font-normal leading-7 text-center text-grey-700">© 2024 SysQube Tech. All rights reserved. <br />Build by Sandesh Joshi</p>
        </footer>
    );
}

export default Footer;