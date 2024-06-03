import Header from "./Header";
import Footer from "./Footer";

const Create = () => {
    const handleCreate = (e) => {
        e.preventDefault();
        console.log('create button clicked')
    }
    return (
        <div>
            <Header />
            <form onSubmit={handleCreate} className="max-w-xl mx-auto mt-4">
                <h1 className="mb-5">Create a post</h1>

                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>

                <div className="mb-5">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">Slug</label>
                    <input type="text" id="slug" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>

                <div className="mb-5">
                    <label htmlFor="excerpt" className="block mb-2 text-sm font-medium text-gray-900">Excerpt</label>
                    <textarea type="text" id="excerpt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            <Footer />
        </div>
    );
}

export default Create;