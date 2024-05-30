import PostCard from "./components/PostCard";
import FeaturedPostCard from "./components/FeaturedPostCard";

const BlogList = ({ posts }) => {
    const featuredPost = posts[0];

    return (
        <>
            <main className="max-w-6xl mx-auto mt-6 lg:mt-20 space-y-6">

                <FeaturedPostCard featuredPost={featuredPost} />

                <div className="lg:grid lg:grid-cols-2">
                    <PostCard />
                    <PostCard />
                </div>

                <div className="lg:grid lg:grid-cols-3">
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            </main >
        </>
    );
}

export default BlogList;