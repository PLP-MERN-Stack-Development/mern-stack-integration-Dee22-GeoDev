import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostForm from "./pages/PostForm";

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/create" element={<PostForm />} />
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default App;
