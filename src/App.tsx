import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

// Auth initialization component
function AuthInit() {
  const { refreshSession } = useAuthStore();

  useEffect(() => {
    // Initialize auth state from Supabase session
    refreshSession();
  }, [refreshSession]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/blogs/mine" element={<MyBlogs />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/edit-blog/:id" element={<EditBlog />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>
      </div>
      <AuthInit />
    </BrowserRouter>
  );
}

export default App;
