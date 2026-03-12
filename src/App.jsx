import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Blog from "./pages/Blog"
import TcpStackBlog from "./pages/blog/TcpipBlog"
import TcpStackProject from "./pages/projects/TcpipProject"
import CursorGlow from "./components/CursorGlow"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/tcpip-stack-blog" element={<TcpStackBlog />} />
        <Route path="/projects/tcpip-stack" element={<TcpStackProject />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-bg text-text-primary">
        <CursorGlow />
        <Navbar />

        {/* This expands and pushes footer down */}
        <main className="flex-1">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  )
}
