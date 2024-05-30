const Header = () => {
    return (
        <>
            <nav className="md:flex md:justify-between md:items-center">
                <div>
                    <a href="/">
                        <img src="./images/sysqube-logo.svg" alt="Laracasts Logo" width="165" height="16" />
                    </a>
                </div>

                <div className="mt-8 md:mt-0">
                    <a href="/" className="text-xs font-bold uppercase">Home Page</a>

                    <a href="/" className="bg-blue-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                        Subscribe for Updates
                    </a>
                </div>
            </nav>

            <header className="max-w-xl mx-auto mt-20 text-center">
                <h1 className="text-4xl">
                    Latest <span className="text-blue-500">SysQube Technology</span> News
                </h1>

                <h2 className="inline-flex mt-2">By Sandesh Joshi<img src="./images/lary-head.svg"
                    alt="Head of Lary the mascot" /></h2>
            </header >
        </>
    );
}

export default Header;