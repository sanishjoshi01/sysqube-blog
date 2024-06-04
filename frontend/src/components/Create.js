import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import axios from "../API";
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState();
    const [excerpt, setExcerpt] = useState('');
    const [description, setDescription] = useState('');
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/create', {
                title,
                slug,
                image,
                status,
                excerpt,
                description
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            setPosts([...posts, response.data]);
            setTitle('');
            setSlug('');
            setImage('');
            setStatus('');
            setExcerpt('');
            setDescription('');
            setError(null);
            navigate('/dashboard');
            sessionStorage.setItem('successMessage', response.data.message);
        } catch (error) {
            setError(error.response.data.errors);
        }
    }
    return (
        <div>
            <Header />
            <form
                onSubmit={handleCreate}
                className="max-w-2xl mx-auto mt-4 bg-gray-200 py-5 px-10 rounded-xl"
                encType={'multipart/form-data'}
            >
                <h1 className="text-3xl font-bold mb-6 text-center">Create a post</h1>

                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">Slug</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.replace(/\s+/g, '-'))}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        // value={image[0]}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                    <select
                        name="status"
                        id="status"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5 px-3.5"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="excerpt" className="block mb-2 text-sm font-medium text-gray-900">Excerpt</label>
                    <textarea
                        type="text"
                        id="excerpt"
                        name="excerpt"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {error && <p className='text-sm text-red-600 my-5 font-semibold'>{
                    Object.keys(error).map((key) => (
                        <p key={key}>{error[key].join(' ')}</p>
                    ))
                }</p>}
                <div className="flex justify-end gap-2">

                    <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Publish
                    </button>
                    <Link
                        to='/dashboard'
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default Create;