import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/shorten", {
        originalUrl: url,
      });
      setShortUrl(`http://localhost:5000/${data.shortUrl}`);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };
  return (
    <div className="main-body">
      <div className="navbar">
        <h1 className="heading">QuickURL</h1>
      </div>
      <div className="data-section">
        <form onSubmit={handleSubmit}>
          <input
            className="input-sec"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Type your URL here..."
          />
          <div>
            <button type="submit">Shorten</button>
          </div>
        </form>
        {shortUrl && (
          <p style={{ marginTop: "10px" }}>
            Short URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
      <div className="use-sec">
        <h2>How It Works</h2>
        <div className="cards">
          {/* 1 */}
          <div className="card">
            <div className="card-content">
              <h3>1. Type or Paste the URL</h3>
            </div>
          </div>
          {/* 2 */}
          <div className="card">
            <div className="card-content">
              <h3>2. Submit the URL</h3>
            </div>
          </div>
          {/* 3 */}
          <div className="card">
            <div className="card-content">
              <h3>3. Click on the generated URL</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
