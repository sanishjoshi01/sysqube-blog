import Header from "./Header";
import Footer from "./Footer";
import axios from "../API";
import { useEffect, useState } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { useAuth } from "../AuthContext";
import { Link } from 'react-router-dom';
import Edit from "./Edit";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [post, setPost] = useState([]);
    const [error, setError] = useState(null);

    console.log(posts);

    //Post Created Message
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

    //Fetching the Users post
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (token) {
                    const response = await axios.get('/dashboard', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setPosts(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setError('Error fetching dashboard data: ' + error.response.data.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    //Deleting a post
    const handleDeletePost = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this post');
        if (confirmed) {
            try {
                await axios.delete(`/posts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(posts.filter(post => post.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    //Edit a post
    const handleEditPost = (id) => {
        const post = posts.filter(post => post.id === id);
        setPost(post);
    }

    const isOpen = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        const confirm = window.confirm('All changed contents will be unsaved! Are you sure?')

        if (confirm) {
            setIsModalOpen(false);
        }
    };

    // const closeModalWithoutConfirmation = () => {
    //     setIsModalOpen(false);
    // };

    const handleUpdatePost = (updatedPost) => {
        setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
        setIsModalOpen(false);
    }

    return (
        <>
            <Header />
            <div className="flex-1 text-gray-900 max-w-6xl m-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl text-center">
                        <h2 className="text-xl font-normal mb-2">Total Posts</h2>
                        <p className="text-gray-700 text-7xl font-bold">{posts.length}</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl text-center">
                        <h2 class="text-xl font-normal mb-2">No. of Drafts Posts</h2>
                        <p class="text-gray-700 text-7xl font-bold">{
                            posts.filter((post) => post.status === 'draft').length

                        }</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-xl text-center">
                        <h2 class="text-xl font-normal mb-2">No. of Published Post</h2>
                        <p class="text-gray-700 text-7xl font-bold">{
                            posts.filter((post) => post.status === 'published').length
                        }</p>
                    </div>
                </div>
            </div>
            {successMessage && (
                <div className="py-4 px-6 mb-4 text-green-800 bg-green-200 rounded-lg fixed bottom-1 right-1 z-50" role="alert">
                    {successMessage}
                </div>
            )}
            {isModalOpen &&
                <Edit
                    isOpen={isOpen}
                    onClose={closeModal}
                    post={post}
                    onUpdate={handleUpdatePost}
                />}
            <div className="container mx-auto p-4 max-w-6xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold mb-4">Your Posts</h1>
                    <Link to="/create"
                        className="bg-green-500 text-white hover:bg-green-400 py-2 px-4 rounded-xl"
                    >
                        Create new post
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-3">
                    {loading ? <p className="text-center">Loading...</p> :
                        error ? <p className="text-sm text-red-600 my-5 font-semibold text-center">{error}</p> :
                            posts.length === 0 ? <p className="text-center vh-100">No posts yet. Create one now!</p> :
                                (<table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {posts.map((post) => (
                                            <tr key={post.id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${post.image}`} alt="post thumbnail"
                                                        width={80}
                                                        className="rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{post.title}</td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{post.description.slice(0, 50)}{post.description.length > 50 ? '...' : ''}</td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(post.published_at.slice(0, 11)).toDateString()}</td>
                                                {post.status === 'published' ?
                                                    (<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <span
                                                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                            <span aria-hidden
                                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                            <span className="relative">Published</span>
                                                        </span>
                                                    </td>)
                                                    :
                                                    (<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                                        <span
                                                            class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                                                            <span aria-hidden
                                                                class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                                                            <span class="relative">Draft</span>
                                                        </span>
                                                    </td>)
                                                }

                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex justify-center">
                                                        <Link
                                                            to={`/posts/${post.slug}`}
                                                            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md shadow-md hover:bg-blue-600"
                                                        >
                                                            <IoEye className="text-lg" />
                                                        </Link>
                                                        <button
                                                            className="bg-yellow-500 text-white px-4 py-2 ml-2 rounded-md shadow-md hover:bg-yellow-600"
                                                            onClick={() => {
                                                                isOpen();
                                                                handleEditPost(post.id);
                                                            }}
                                                        >
                                                            <MdEditSquare className="text-lg" />
                                                        </button>
                                                        <button
                                                            className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md shadow-md hover:bg-red-600"
                                                            onClick={() => handleDeletePost(post.id)}
                                                        >
                                                            <MdDelete className="text-lg" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                )}
                </div>
            </div >
            < Footer />
        </>
    );
}

export default Dashboard;