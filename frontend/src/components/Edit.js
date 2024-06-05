import { useState } from "react";
import axios from "../API";
import { useAuth } from '../AuthContext';
import { RxCross1 } from "react-icons/rx";

const Edit = ({ isOpen, onClose, post, onUpdate }) => {
    const { token } = useAuth();
    const [title, setTitle] = useState(post[0].title);
    const [slug, setSlug] = useState(post[0].slug);
    const [status, setStatus] = useState([post[0].status]);
    const [image, setImage] = useState(null);
    const [excerpt, setExcerpt] = useState(post[0].excerpt);
    const [description, setDescription] = useState(post[0].description);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleUpdatePost = async (id, e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/posts/${id}`, {
                title,
                slug,
                image,
                status,
                excerpt,
                description,
                _method: 'PATCH'
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            onUpdate(response.data.post);
        } catch (error) {
            setError(error.response.data.errors);
        }
    };

    return (
        <>
            <div className="overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 flex justify-center items-center w-full mt-9">
                <div className=" bg-gray-200  w-full max-w-3xl rounded-lg p-6">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h1 className="text-lg font-semibold text-gray-900">Edit Post</h1>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <RxCross1 className="w-3 h-3 font-bold" />
                        </button>
                    </div>
                    <form
                        className="p-4 md:p-5"
                        onSubmit={(e) => handleUpdatePost(post[0].id, e)}
                        encType={'multipart/form-data'}
                    >
                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Slug</label>
                            <input
                                type="text"
                                id="slug"
                                name="slug"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.replace(/\s+/g, '-'))}
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <img
                                src={`http://127.0.0.1:8000/storage/${post[0].image}`}
                                alt="blog img"
                                width={100}
                            />

                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-3"
                                onChange={(e) => {
                                    console.log(e.target.files[0])
                                    setImage(e.target.files[0])
                                }}
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                            <select
                                name="status"
                                id="status"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2.5 px-3.5"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Excerpt</label>
                            <textarea
                                type="text"
                                id="excerpt"
                                name="excerpt"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea
                                type="text"
                                id="description"
                                name="description"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Update</button>
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Edit;