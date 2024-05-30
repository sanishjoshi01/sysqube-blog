const Footer = () => {
    return (
        <footer className="bg-gray-100 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
            <img src="./images/lary-newsletter-icon.svg" alt="" className="mx-auto -mb-6" style={{ width: '145px' }} />
            <h5 className="text-3xl">Stay in touch with the latest posts</h5>
            <p className="text-sm mt-3">Promise to keep the inbox clean. No bugs.</p>

            <div className="mt-10">
                <div className="relative inline-block mx-auto lg:bg-gray-200 rounded-full">

                    <form method="POST" action="#" className="lg:flex text-sm">
                        <div className="lg:py-3 lg:px-5 flex items-center">
                            <label htmlFor="email" className="hidden lg:inline-block">
                                <img src="./images/mailbox-icon.svg" alt="mailbox letter" />
                            </label>

                            <input id="email" type="text" placeholder="Your email address"
                                className="lg:bg-transparent py-2 lg:py-0 pl-4 focus-within:outline-none" />
                        </div>

                        <button type="submit"
                            className="transition-colors duration-300 bg-blue-500 hover:bg-blue-600 mt-4 lg:mt-0 lg:ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-8">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
}

export default Footer;