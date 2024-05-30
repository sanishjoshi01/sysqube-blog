import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post }) => {
    const timeAgo = formatDistanceToNow(new Date(post.published_at), { addSuffix: true });

    return (
        <article
            className="transition-colors duration-300 hover:bg-gray-100 border border-black border-opacity-0 hover:border-opacity-5 rounded-xl">
            <div className="py-6 px-5 flex flex-col h-full">
                <div>
                    <img src="./images/illustration-1.png" alt="Blog Post illustration" className="rounded-xl" />
                </div>

                <div className="mt-8 flex flex-col justify-between flex-grow">
                    <header>
                        <div className="space-x-2">
                            <a href="/"
                                className="px-3 py-1 border border-blue-300 rounded-full text-blue-300 text-xs uppercase font-semibold"
                                style={{ fontSize: '10px' }}>Techniques</a>
                        </div>

                        <div className="mt-4">
                            <h1 className="text-3xl">
                                <a href="/">{post.title}</a>
                            </h1>

                            <span className="mt-2 block text-gray-400 text-xs">
                                Published <time>{timeAgo}</time>
                            </span>
                        </div>
                    </header>

                    <div className="text-sm mt-4 flex-grow">
                        <p>
                            {post.excerpt}
                        </p>
                    </div>

                    <footer className="flex justify-between items-center mt-8">
                        <div className="flex items-center text-sm">
                            <img src="./images/lary-avatar.svg" alt="Lary avatar" />
                            <div className="ml-3">
                                <h5 className="font-bold">{post.user.name}</h5>
                            </div>
                        </div>

                        <div>
                            <a href="/"
                                className="transition-colors duration-300 text-xs font-semibold bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-8">
                                Read More
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </article>
    );
}

export default PostCard;