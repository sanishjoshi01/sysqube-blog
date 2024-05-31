import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from '../API';
import { Link } from 'react-router-dom';

const PostDetail = () => {
    const { slug } = useParams();

    const [post, setPost] = useState(null);
    console.log(post);
    useEffect(() => {
        axios.get(`/posts/${slug}`)
            .then((res) => setPost(res.data))
            .catch((err) => console.log(err));
    }, [slug]);

    if (!post) {
        return <p className="text-center">Loading...</p>
    }

    return (
        <main className="max-w-6xl mx-auto mt-10 lg:mt-20 space-y-6">
            <article className="max-w-4xl mx-auto lg:grid lg:grid-cols-12 gap-x-10">
                <div className="col-span-4 lg:text-center lg:pt-14 mb-10">
                    <img src="../images/illustration-1.png" alt="" className="rounded-xl" />

                    <p className="mt-4 block text-gray-400 text-xs">
                        Published <time>1 day ago</time>
                    </p>

                    <div className="flex items-center lg:justify-center text-sm mt-4">
                        <img src="../images/lary-avatar.svg" alt="Lary avatar" />
                        <div className="ml-3 text-left">
                            <h5 className="font-bold">{post.user.name}</h5>
                        </div>
                    </div>
                </div>

                <div className="col-span-8">
                    <div className="hidden lg:flex justify-between mb-6">
                        <Link to="/"
                            className="transition-colors duration-300 relative inline-flex items-center text-lg hover:text-blue-500">
                            <svg width="22" height="22" viewBox="0 0 22 22" className="mr-2">
                                <g fill="none" fillRule="evenodd">
                                    <path stroke="#000" strokeOpacity=".012" strokeWidth=".5" d="M21 1v20.16H.84V1z">
                                    </path>
                                    <path className="fill-current"
                                        d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z">
                                    </path>
                                </g>
                            </svg>

                            Back to Posts
                        </Link>

                        <div className="space-x-2">
                            <Link to="/"
                                className="px-3 py-1 border border-blue-300 rounded-full text-blue-300 text-xs uppercase font-semibold"
                                style={{ fontSize: '10px' }}>
                                Techniques
                            </Link>
                        </div>
                    </div>

                    <h1 className="font-bold text-3xl lg:text-4xl mb-10">
                        {post.title}
                    </h1>

                    <div className="space-y-4 lg:text-lg leading-loose">
                        <p>{post.description}</p>
                    </div>
                </div>
            </article>
        </main>
    );
}

export default PostDetail;