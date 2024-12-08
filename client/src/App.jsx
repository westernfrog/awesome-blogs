import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Header from "./components/Header";
import Overview from "./components/Overview";
import NewBlog from "./components/NewBlog"; // Import the NewBlog component
import About from "./components/About"; // Assuming you will create an About component
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch blogs");

        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            loading ? (
              <p className="text-center my-10 text-lg text-gray-500">
                Loading...
              </p>
            ) : error ? (
              <p className="text-center my-10 text-lg text-red-500">{error}</p>
            ) : (
              <Overview blogs={blogs} />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
