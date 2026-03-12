import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="w-full py-6 border-b border-border px-8 bg-bg">
      <div className="flex justify-between items-center text-sm">
        <Link to="/" className="font-medium tracking-wide text-text-primary">
          Ian Macwan
        </Link>

        <div className="flex items-center gap-4 text-text-muted">
          <Link to="/about" className="hover:text-accent transition">~/about</Link>
          <span className="text-border">//</span>
          <Link to="/projects" className="hover:text-accent transition">~/projects</Link>
          <span className="text-border">//</span>
          <Link to="/blog" className="hover:text-accent transition">~/blog</Link>
        </div>
      </div>
    </nav>
  )
}
