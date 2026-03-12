import PageWrapper from "../components/PageWrapper"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Blog() {
  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-6 py-16 relative">

        {/* Ambient glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">
            <span className="text-purple">~/blog</span>
          </h1>
          <div className="mt-3 h-[2px] w-28 bg-gradient-to-r from-purple via-blue to-accent"></div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <BlogCard
            to="/blog/tcpip-stack-blog"
            title="bananatcp - userspace tcp/ip stack built in C"
            desc="How I built a minimal userspace TCP/IP stack built from scratch in C, featuring IPv4 parsing, ICMP echo replies, and more!"
            meta="Jan 2026 · 2 min read · Architecture"
            color="purple"
          />

        </div>

      </section>
    </PageWrapper>
  )
}

function BlogCard({ to, title, desc, meta, color }) {
  return (
    <motion.div whileHover={{ y: -6 }}>
      <Link
        to={to}
        className="block p-5 rounded-2xl border border-border bg-panel 
                   relative overflow-hidden transition"
      >
        <div className={`absolute left-0 top-0 h-full w-1 bg-${color}`} />
        <div className={`absolute inset-0 bg-gradient-to-br from-${color}/10 via-transparent to-transparent`} />

        <div className="relative z-10">
          <h2 className="text-lg font-medium text-text-primary mb-2 hover:text-purple transition">
            {title}
          </h2>

          <p className="text-sm text-text-secondary mb-3 max-w-xl">
            {desc}
          </p>

          <p className="text-xs text-text-muted uppercase tracking-wider">
            {meta}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
