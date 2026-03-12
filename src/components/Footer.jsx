import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 py-4 px-6">
      <div className="w-full flex items-center justify-between">
        
        {/* Left */}
        <p className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Ian Macwan
        </p>

        {/* Right */}
        <div className="flex items-center gap-5 text-xl text-neutral-400">
          <a href="https://github.com/IanMacwan" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaGithub />
          </a>

          <a href="https://linkedin.com/in/ian-macwan11" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaLinkedin />
          </a>

          <a href="mailto:ian.macwan@torontomu.ca" className="hover:text-white transition">
            <FaEnvelope />
          </a>
        </div>

      </div>
    </footer>
  )
}
