import BlogList from "./components/BlogList";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetail from "./components/PostDetail";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (
    <Router>
      <section className="px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<BlogList />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/register" element={
            <GuestRoute>
              <Register />
            </GuestRoute>}
          />
          <Route path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>}
          />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>} />
          <Route path="/create" element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>} />

          {/* Not Found Page */}
          < Route path="*" element={<NotFound />} />
        </Routes>
      </section>
    </Router >
  );
}

export default App;
