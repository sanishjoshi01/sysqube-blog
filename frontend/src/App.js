import axios from "./API";
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";

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

  return (
    <Router>
      <section className="px-6 py-8">
        <Header />
        <Routes>
          <Route path='/' element={posts && <BlogList posts={posts} />} />
          {/* <Route path='/posts' element={posts && <BlogPost posts={posts} />} /> */}
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
