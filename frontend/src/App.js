import axios from "./API";
import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import Home from "./Home";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState(null);

  // useEffect(() => {
  //   axios.get('/')
  //     .then((response) => {
  //       setText(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    axios.get('/posts')
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const title = "Home Page";

  return (
    <Router>
      <div className="App">
        <a href="/">Home Page</a>
        <a href="/posts">Post Page</a>
        <header className="App-header">
          <Routes>
            <Route path='/' element={<Home title={title} />} />
            <Route path='/posts' element={posts && <BlogPost posts={posts} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
