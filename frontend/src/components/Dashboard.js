import Header from "./Header";
import Footer from "./Footer";
import axios from "../API";
import { useEffect, useState } from "react";
import { MdEditSquare, MdDelete } from "react-icons/md";
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
                console.error('Error fetching dashboard data:', error);
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
                console.error(error);
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
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                    <Link to="/create"
                        // onClick={handleCreateClick}
                        className="bg-green-500 text-white hover:bg-green-400 py-2 px-4 rounded-xl"
                    >
                        Create new post
                    </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-3">
                    {loading ? <div className="text-center">Loading...</div> :
                        (<table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-200 px-4 py-2">Image</th>
                                    <th className="border border-gray-200 px-4 py-2">Title</th>
                                    <th className="border border-gray-200 px-4 py-2">Description</th>
                                    <th className="border border-gray-200 px-4 py-2">Last Updated</th>
                                    <th className="border border-gray-200 px-4 py-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td className="border border-gray-200 px-4 py-2 flex items-center justify-center">
                                            {/* Hardcoded for now  */}
                                            <img src="../images/lary-head.svg" alt="" />
                                        </td>
                                        <td className="border border-gray-200 px-4 py-2">{post.title}</td>
                                        <td className="border border-gray-200 px-4 py-2">{post.description.slice(0, 50)}{post.description.length > 50 ? '...' : ''}</td>
                                        <td className="border border-gray-200 px-4 py-2">{new Date(post.published_at.slice(0, 11)).toDateString()}</td>
                                        <td className="border border-gray-200 px-4 py-2 flex items-center justify-center">
                                            <button
                                                className="bg-yellow-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-yellow-600"
                                                onClick={() => {
                                                    isOpen();
                                                    handleEditPost(post.id);
                                                }}
                                            >
                                                <MdEditSquare />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-1 ml-2 rounded-md shadow-md hover:bg-red-600"
                                                onClick={() => handleDeletePost(post.id)}
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        )}
                </div>
            </div >

            {/* <div>
                <h1>Your Posts</h1>
                {posts.length > 0 ?
                    posts.map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    ))
                    : (
                        <p>No posts found.</p>
                    )}
            </div> */}
            < Footer />
        </>
    );
}

export default Dashboard;