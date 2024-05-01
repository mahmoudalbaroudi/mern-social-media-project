import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";
import Post from "./components/post/Post.jsx";
import CommentPage from "./components/comment/CommentPage.jsx";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/posts/:postId/comments" element={<CommentPage />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
