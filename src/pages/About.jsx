import PageWrapper from "../components/PageWrapper"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

function TerminalTyping({ lines = [], speed = 25, lineDelay = 400 }) {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (!lines.length) return
    if (currentLine >= lines.length) return

    const fullText = lines[currentLine].text

    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[charIndex])
        setCharIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [
          ...prev,
          { text: currentText, color: lines[currentLine].color }
        ])
        setCurrentText("")
        setCharIndex(0)
        setCurrentLine(prev => prev + 1)
      }, lineDelay)

      return () => clearTimeout(timeout)
    }
  }, [charIndex, currentLine, lines, speed, lineDelay, currentText])

  return (
    <div className="font-mono text-xs space-y-1">
      {displayedLines.map((line, i) => (
        <p key={i} className={line.color}>
          {line.text}
        </p>
      ))}

      {currentLine < lines.length && (
        <p className={lines[currentLine].color}>
          {currentText}
          <span className="animate-pulse">█</span>
        </p>
      )}
    </div>
  )
}

export default function About() {
  const [open, setOpen] = useState(false)

  return (
    <PageWrapper>
      <section className="max-w-7xl mx-auto px-6 py-16 relative">

        {/* Ambient glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue/15 blur-[140px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            <span className="text-accent">~/about</span>
          </h1>
          <div className="mt-3 h-[2px] w-24 bg-gradient-to-r from-accent via-yellow to-orange"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">

          {/* Identity Badge */}
          <motion.div
            whileHover={{
              y: -8,
              rotateX: 3,
              rotateY: -3,
              scale: 1.02
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="lg:col-span-1"
          >
            <motion.div className="relative p-6 rounded-2xl border border-border bg-panel overflow-hidden select-none shadow-lg hover:shadow-accent/20">

              <motion.div
                animate={{
                  opacity: open ? 0.25 : 0.12,
                  scale: open ? 1.1 : 1,
                }}
                className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-blue/30"
              />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!open ? (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl border border-border bg-bg overflow-hidden">
                          <img
                            src="https://cdn.i-scmp.com/sites/default/files/images/methode/2017/05/19/2b2d8790-3c6a-11e7-8ee3-761f02c18070_1280x720_204107.jpg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <p className="text-xl font-semibold text-text-primary">Ian Macwan</p>
                          <p className="text-sm text-text-muted">CS Student @ TMU</p>
                          <p className="text-xs text-accent mt-1 uppercase tracking-wide">
                            Systems · Embedded · Low-Level
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary">
Computer science student at Toronto Metropolitan University interested in embedded systems, firmware, and low-level software.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <a
                          href="https://github.com/IanMacwan"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Stat>🐙 github</Stat>
                        </a>

                        <a
                          href="https://linkedin.com/in/ian-macwan11"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Stat>💼 linkedin</Stat>
                        </a>

                        <a
                          href="mailto:ian.macwan@torontomu.ca"
                        >
                          <Stat>✉️ email</Stat>
                        </a>

                        <a
                          href=""
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Stat>📄 resume</Stat>
                        </a>
                      </div>

                      <div className="text-xs text-text-muted">
                        📍 Toronto, Ontario
                      </div>

                      <button
                        onClick={() => setOpen(true)}
                        className="mt-2 text-[11px] text-text-muted hover:text-accent transition"
                      >
                        →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >

                      <div>
                        <p className="text-sm font-semibold text-text-primary">
                          🥚 You Just Found An Easter Egg!
                        </p>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          If you figured this out, might as well shoot me an email!
                        </p>
                      </div>
                      <div className="p-3 rounded-xl border border-border bg-bg font-mono text-xs">
                        <TerminalTyping
                          key="terminal"
                          lines={[
                            { text: "> scanning candidate...", color: "text-green-400" },
                            { text: "> detecting C/C++ competency...", color: "text-yellow-400" },
                            { text: "> verifying embedded suffering tolerance...", color: "text-yellow-400" },
                            { text: "> checking if hireable...", color: "text-green-400" },
                            { text: "> result: surprisingly yes ✔", color: "text-green-500" },
                            { text: "> salary expectation: negotiable (i like food)", color: "text-cyan-400" },
                            { text: "", color: "text-white" },
                            { text: "> conclusion: you should probably hire me. 😊", color: "text-accent" }
                          ]}
                        />
                      </div>

                      <button
                        onClick={() => setOpen(false)}
                        className="text-[11px] text-text-muted hover:text-accent transition"
                      >
                        ← Flip back
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio */}
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180 }}
            className="lg:col-span-2 p-6 rounded-2xl border border-border bg-panel relative overflow-hidden hover:shadow-xl hover:shadow-blue/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-transparent to-accent/10 animate-pulse" />

            <div className="relative z-10">

              <h2 className="text-xl font-semibold text-text-primary mb-4">
                👋 hey there!
              </h2>

              <p className="text-sm text-text-secondary t leading-relaxed mb-6">
                My name is <span className="text-yellow font-medium">Ian</span>, I'm a 
                <span className="text-red font-medium"> Computer Science student</span> at 
                <span className="text-blue font-medium"> Toronto Metropolitan University</span>.
                I enjoy working close to the hardware and building software where performance,
                memory, and debugging actually matter.
              </p>

              <div className="space-y-2 text-sm text-text-secondary mb-6">

                <p>⚡ Currently building <span className="text-accent">bare-metal ARM Cortex-M firmware</span> and exploring STM32.</p>

                <p>🧠 Learning more about <span className="text-accent">operating systems and computer networking</span>.</p>

                <p>🚀 Looking for <span className="text-accent">Summer 2026 / 2027 internships</span> in embedded or systems roles.</p>

                <p>🤝 Always interested in collaborating on <span className="text-accent">hackathons and interesting low-level projects!</span>.</p>

              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "C",
                  "C++",
                  "Python",
                  "Embedded Systems",
                  "ARM Cortex-M",
                  "STM32",
                  "ESP32",
                  "Bare Metal",
                  "RTOS",
                  "UART",
                  "SPI",
                  "I²C",
                  "GDB"
                ].map(tag => (
                  <motion.span
                    whileHover={{ scale: 1.1, y: -2 }}
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md border border-border bg-bg text-text-muted hover:border-accent/40"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

            </div>
          </motion.div>

        </div>
        


        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Panel title="projects" color="accent">
            <Link to="/projects/tcpip-stack"><CompactCard title="bananatcp" desc="Userspace TCP/IP Stack" color="accent" /></Link>
            <CompactCard title="More Coming Soom" desc="Check out my Github to see all my projects!" color="" />
          </Panel>

          <Panel title="blogs" color="yellow">
            <Link to="/blog/tcpip-stack-blog"><CompactCard title="Building bananatcp" desc="building a userspace TCP/IP stack in C." color="yellow" /></Link>
          </Panel>

          <Panel title="experience" color="red">
            <CompactCard 
              title="AI Quality Assurance Intern" 
              desc="AI system testing, debugging, and log analysis" 
              color="" 
            />

            <CompactCard 
              title="Program Assistant" 
              desc="Technical workshop support + developer environment setup" 
              color="green" 
            />

            <CompactCard 
              title="Deputy VP Academics – CS Course Union" 
              desc="Technical workshop coordination + student engineering support" 
              color="purple" 
            />
          </Panel>
        </div>
      </section>
    </PageWrapper>
  )
}

/* Components */

function Panel({ title, color, children }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="p-5 rounded-2xl border border-border bg-panel relative overflow-hidden hover:shadow-xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-${color}/15 via-transparent to-transparent`} />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full bg-${color}`}></span>
          {title}
        </h3>
        <div className="space-y-3">{children}</div>
      </div>
    </motion.div>
  )
}

function CompactCard({ title, desc, color }) {
  return (
    <motion.div
      whileHover={{
        x: 6,
        scale: 1.03
      }}
      transition={{ type: "spring", stiffness: 250 }}
      className="p-3 rounded-xl border border-border bg-bg relative overflow-hidden cursor-pointer hover:shadow-lg"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 bg-gradient-to-r from-${color}/10 via-transparent to-${color}/10`}
      />
      <div className={`absolute left-0 top-0 h-full w-1 bg-${color}`} />
      <p className="text-sm font-medium text-text-primary relative z-10">{title}</p>
      <p className="text-xs text-text-muted relative z-10">{desc}</p>
    </motion.div>
  )
}

function Stat({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="p-2 rounded-lg border border-border bg-bg cursor-default"
    >
      {children}
    </motion.div>
  )
}
