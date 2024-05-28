import axios from "./API";
import { useEffect, useState } from "react";

const BlogPost = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/posts')
            .then((response) => {
                setPosts(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    let renderedPosts = posts.map(post => (
        <div key={post.id}>
            <div>{post.title}</div>
        </div>
    ))

    return (

        <div>
            {console.log(posts)}

            {renderedPosts}
        </div>
    )
}

export default BlogPost;