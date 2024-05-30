const BlogPost = ({ posts }) => {
    let renderedPosts = posts.slice(1).map(post => (
        <div key={post.id}>
            <div>{post.title}</div>
        </div>
    ))

    return (
        <div>
            {console.log(posts[0].title)}
            {renderedPosts}
        </div>
    )
}

export default BlogPost;