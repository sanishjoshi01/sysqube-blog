import axios from "axios";
import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";

function App() {

  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('/')
      .then((response) => {
        setText(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <BlogPost />
      </header>
    </div>
  );
}

export default App;
