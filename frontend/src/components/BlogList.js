import PostCard from "./PostCard";
import FeaturedPostCard from "./FeaturedPostCard";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from 'react';
import axios from "../API";

const BlogList = () => {
    const [posts, setPosts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        axios.get('/posts')
            .then((response) => {
                if (response.status === 200) {
                    setPosts(response.data)
                    setIsLoading(false);
                    setError(null);
                }
            })
            .catch((error) => {
                console.log(error)
                setError('Error fetching data. ', error);
                setIsLoading(false);
            });
    }, []);

    const renderedPosts = isLoading ?
        (<p className="h-44 text-2xl grid place-items-center">Loading Posts...</p>)
        : error ? (
            <p className="h-44 text-2xl grid place-items-center text-red-600">{error}</p>
        ) : posts && posts.length > 0 ? (<main className="max-w-6xl mx-auto mt-6 lg:mt-20 space-y-6">
            <FeaturedPostCard key={posts[0].id} featuredPost={posts[0]} />

            <div className="lg:grid lg:grid-cols-2">
                {posts.slice(1, 3).map((post) => {
                    return posts && <PostCard key={post.id} post={post} />
                })}
            </div>

            <div className="lg:grid lg:grid-cols-3">
                {posts.slice(4).map((post) => {
                    return posts && <PostCard key={post.id} post={post} />
                })}
            </div>
        </main >) : <p className="h-44 text-2xl grid place-items-center text-red-600">No posts yet. Check back later</p>

    return (
        <>
            <Header />
            {renderedPosts}
            <Footer />
        </>
    );
}

export default BlogList;