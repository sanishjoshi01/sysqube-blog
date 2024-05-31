import axios from "./API";
import { useEffect, useState } from "react";
import BlogList from "./components/BlogList";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetail from "./components/PostDetail";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
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
          setError('');
        }
      })
      .catch((error) => {
        console.log(error)
        setError('Error fetching data. ', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Router>
      <section className="px-6 py-8">
        <Routes>
          <Route path='/' element={
            isLoading ?
              (<p className="h-44 text-2xl grid place-items-center">Loading Posts...</p>)
              : error ? (
                <p className="h-44 text-2xl grid place-items-center text-red-600">{error}</p>
              ) : posts && <BlogList posts={posts} />}

          />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </section>
    </Router >
  );
}

export default App;
