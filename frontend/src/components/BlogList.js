import PostCard from "./PostCard";
import FeaturedPostCard from "./FeaturedPostCard";


const BlogList = ({ posts }) => {
    const featuredPost = <FeaturedPostCard key={posts[0].id} featuredPost={posts[0]} />

    const twoGridPost = posts.slice(1, 3).map((post) => {
        return posts && <PostCard key={post.id} post={post} />
    });

    const remainingPosts = posts.slice(4).map((post) => {
        return posts && <PostCard key={post.id} post={post} />
    })

    return (
        <>
            
                <main className="max-w-6xl mx-auto mt-6 lg:mt-20 space-y-6">

                    {featuredPost}

                    <div className="lg:grid lg:grid-cols-2">
                        {twoGridPost}
                    </div>

                    <div className="lg:grid lg:grid-cols-3">
                        {remainingPosts}
                    </div>
                </main >
            
        </>
    );
}

export default BlogList;