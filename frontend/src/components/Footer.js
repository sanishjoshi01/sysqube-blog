const Footer = () => {
    return (
        <footer className="bg-gray-100 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
            <img src="../images/lary-newsletter-icon.svg" alt="" className="mx-auto -mb-6" style={{ width: '145px' }} />
            <h5 className="text-3xl">Stay in touch with the latest posts</h5>

            <div className="mt-10">
                <div className="relative inline-block mx-auto lg:bg-gray-200 rounded-full">
                </div>
            </div>
            <p className="text-gray-600 text-sm">© 2024 SysQube Tech. All rights reserved. <br />Build by Sandesh Joshi</p>
        </footer>
    );
}

export default Footer;