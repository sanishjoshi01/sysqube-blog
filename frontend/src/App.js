import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
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
        <div>{text} aa</div>
      </header>
    </div>
  );
}

export default App;
