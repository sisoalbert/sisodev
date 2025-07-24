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
import MainNavBar from "./components/MainNavBar";

// Auth initialization component
function AuthInit() {
  const { initializeAuthListener } = useAuthStore();

  useEffect(() => {
    // Initialize persistent auth state listener
    const unsubscribe = initializeAuthListener();
    
    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
  }, [initializeAuthListener]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f9fafb", overflow: "hidden" }}>
        <MainNavBar />
        <main style={{ flex: 1, overflow: "hidden" }}>
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
