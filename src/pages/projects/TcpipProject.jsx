import PageWrapper from "../../components/PageWrapper"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"

function CodeBlock({ title = "code", children }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2b2b2b] text-xs text-text-muted uppercase tracking-wider">
        <span>{title}</span>
      </div>

      <SyntaxHighlighter
        language="text"
        style={gruvboxDark}
        customStyle={{
          margin: 0,
          padding: "1.3rem",
          background: "#1d2021",
          fontSize: "0.85rem"
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}

export default function TcpStackProject() {
  return (
    <PageWrapper>
      <article className="max-w-5xl mx-auto px-6 py-20 relative">

        <div className="absolute -top-24 -left-24 w-80 h-80 bg-accent/15 blur-[120px] rounded-full pointer-events-none" />
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Userspace TCP/IP Stack <span className="text-accent">v1.0</span>
            </h1>

            <p className="text-text-secondary max-w-xl text-lg leading-relaxed">
              A small networking project that processes raw IP packets from a
              Linux <span className="text-accent">TUN interface</span> and
              implements parts of the TCP/IP stack directly in userspace.
            </p>

            <div className="flex gap-4 mt-6 flex-wrap">


              <a
                href="https://github.com/IanMacwan/bananatcp"
                target="_blank"
                className="px-5 py-2.5 text-sm font-medium rounded-lg 
                bg-accent text-black
                shadow-[0_0_25px_rgba(250,204,21,0.35)]
                hover:shadow-[0_0_40px_rgba(250,204,21,0.6)]
                hover:-translate-y-[2px]
                transition-all duration-200"
              >
                view github
              </a>

              {/* Blog Button */}

              <Link
                to="/blog/tcpip-stack-blog"
                className="px-5 py-2.5 text-sm font-medium rounded-lg 
                border border-border
                bg-panel
                hover:border-purple
                hover:text-purple
                hover:-translate-y-[2px]
                transition-all duration-200"
              >
                read blog
              </Link>

            </div>

          </div>


          {/* RIGHT SIDE IMAGE */}

          <div className="relative">

            {/* glow behind image */}
            <div className="absolute -inset-6 bg-accent/10 blur-2xl rounded-2xl -z-10" />

            <img
              src="images/tcpip/tcpip-demo.png"
              alt="Userspace TCP stack running with TUN interface"
              className="rounded-xl border border-border shadow-xl"
            />

            <p className="text-sm text-text-muted mt-3 text-center">
              Packet flow through the userspace TCP/IP stack
            </p>

          </div>

        </section>


        {/* TECH STACK */}

        <section className="mb-16">

          <h2 className="text-sm uppercase tracking-wider text-text-muted mb-4">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3 text-sm">

            <span className="px-3 py-1 rounded-md bg-panel border border-border">C</span>
            <span className="px-3 py-1 rounded-md bg-panel border border-border">Linux</span>
            <span className="px-3 py-1 rounded-md bg-panel border border-border">Networking</span>
            <span className="px-3 py-1 rounded-md bg-panel border border-border">Raw Sockets</span>
            <span className="px-3 py-1 rounded-md bg-panel border border-border">TUN Interface</span>

          </div>

        </section>


        {/* PROJECT SNAPSHOT */}

        <section className="grid md:grid-cols-2 gap-10 mb-20">

          <div>

            <h2 className="text-2xl font-semibold mb-6">
              What It Does
            </h2>

            <ul className="space-y-3 text-text-secondary leading-relaxed">
              <li>• Reads raw packets from a Linux TUN device</li>
              <li>• Parses IPv4 headers manually</li>
              <li>• Dispatches packets to protocol handlers</li>
              <li>• Implements ICMP echo replies (ping)</li>
              <li>• Inspects UDP and TCP headers</li>
            </ul>

            <p className="mt-6 text-text-secondary">
              The goal of the project is to understand how operating systems
              implement networking stacks internally by recreating core pieces
              in userspace.
            </p>

          </div>

          <CodeBlock title="Project Layout">
{`net/
 ├── tun.c
 ├── ipv4.c
 ├── icmp.c
 ├── udp.c
 ├── tcp.c
 └── checksum.c`}
          </CodeBlock>

        </section>


        {/* ARCHITECTURE */}

        <section className="mb-20">

          <h2 className="text-2xl font-semibold mb-6">
            Architecture
          </h2>

          <p className="text-text-secondary max-w-3xl leading-relaxed mb-8">
            Packets enter through the virtual network interface and move upward
            through a simplified networking stack implemented entirely in C.
          </p>

          <div className="rounded-xl border border-border bg-panel p-6 text-sm font-mono text-text-secondary">
{`TUN device
   ↓
IPv4 parser
   ↓
Protocol dispatcher
   ↓
ICMP | UDP | TCP modules`}
          </div>

        </section>


        {/* FOOTER */}

        <div className="mt-16 flex gap-6 flex-wrap">

          <Link
            to="/projects"
            className="text-sm uppercase tracking-wider text-accent hover:underline"
          >
            ← back to projects
          </Link>

          <Link
            to="/blog/tcpip-stack-blog"
            className="text-sm uppercase tracking-wider text-purple hover:underline"
          >
            read blog →
          </Link>

        </div>

      </article>
    </PageWrapper>
  )
}
