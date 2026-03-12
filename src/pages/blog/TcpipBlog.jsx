// import PageWrapper from "../../components/PageWrapper"
// import { Link } from "react-router-dom"
// import { motion } from "framer-motion"
//
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
// import "react-syntax-highlighter/dist/esm/languages/prism/c"
// import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"
//
// function CodeBlock({ language = "c", title = "code", children }) {
//   return (
//     <div className="rounded-2xl border border-border overflow-hidden">
//
//       <div className="flex items-center justify-between px-4 py-2 bg-[#2b2b2b] text-xs text-text-muted uppercase tracking-wider">
//         <span>{title}</span>
//         <span>{language}</span>
//       </div>
//
//       <SyntaxHighlighter
//         language={language}
//         style={gruvboxDark}
//         customStyle={{
//           margin: 0,
//           padding: "1.5rem",
//           background: "#1d2021",
//           fontSize: "0.85rem"
//         }}
//       >
//         {children}
//       </SyntaxHighlighter>
//
//     </div>
//   )
// }
//
//
// export default function TcpStackBlog() {
//   return (
//     <PageWrapper>
//       <article className="max-w-5xl mx-auto px-6 py-20 relative">
//
//         <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple/15 blur-[140px] rounded-full pointer-events-none" />
//
//         <header className="mb-16 relative z-10">
//           <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
//             Building a Userspace TCP/IP Stack <span className="text-purple">#01</span>
//           </h1>
//
//           <div className="flex gap-4 mt-6 flex-wrap">
//
//
//             <a
//               href="https://github.com/IanMacwan/bananatcp"
//               target="_blank"
//               className="px-5 py-2.5 text-sm font-medium rounded-lg 
//               bg-accent text-black
//               shadow-[0_0_25px_rgba(250,204,21,0.35)]
//               hover:shadow-[0_0_40px_rgba(250,204,21,0.6)]
//               hover:-translate-y-[2px]
//               transition-all duration-200"
//             >
//               view github
//             </a>
//
//             {/* Blog Button */}
//
//             <Link
//               to="/blog/tcpip-stack-blog"
//               className="px-5 py-2.5 text-sm font-medium rounded-lg 
//               border border-border
//               bg-panel
//               hover:border-purple
//               hover:text-purple
//               hover:-translate-y-[2px]
//               transition-all duration-200"
//             >
//               read blog
//             </Link>
//
//           </div>
//
//           <div className="flex flex-wrap gap-6 text-xs text-text-muted uppercase tracking-wider">
//             <span>2026</span>
//             <span>Networking</span>
//             <span>C</span>
//             <span>Linux</span>
//           </div>
//
//           <div className="mt-5 h-[2px] w-28 bg-gradient-to-r from-purple via-blue to-accent"></div>
//         </header>
//
//
// {/* INTRO */}
//
//         <section className="space-y-6 text-lg text-text-secondary leading-relaxed mb-16">
//           <p>
//             Modern operating systems hide most networking complexity behind the kernel.
//             Applications call <span className="text-accent">send()</span> or 
//             <span className="text-accent"> recv()</span> and packets magically appear on the wire.
//           </p>
//
//           <p>
//             I wanted to understand what actually happens between those calls and the network
//             interface, so I started building a small <span className="text-purple">userspace TCP/IP stack</span>
//             in C.
//           </p>
//
//           <p>
//             Instead of relying on the kernel networking stack, the program receives raw IP
//             packets from a Linux <span className="text-purple">TUN device</span> and processes them
//             manually layer by layer.
//           </p>
//         </section>
//
//
//
// {/* TUN SECTION */}
//
//         <section className="grid md:grid-cols-2 gap-10 mb-20">
//
//           <div className="space-y-6 text-text-secondary text-lg leading-relaxed">
//             <h2 className="text-red text-2xl font-semibold">
//               Intercepting Packets with TUN
//             </h2>
//
//             <p>
//               Linux provides a virtual network interface called a
//               <span className="text-purple"> TUN device</span>.
//               It behaves like a normal network interface, except packets are
//               delivered directly to a userspace program instead of the kernel stack.
//             </p>
//
//             <p>
//               When the interface receives packets, they appear as raw IP frames
//               on a file descriptor. This allows the program to parse and process
//               packets manually.
//             </p>
//           </div>
//
//           <CodeBlock title="Creating a TUN interface" language="c">
// {`int tun_fd = open("/dev/net/tun", O_RDWR);
//
// struct ifreq ifr = {0};
// ifr.ifr_flags = IFF_TUN | IFF_NO_PI;
//
// ioctl(tun_fd, TUNSETIFF, &ifr);
//
// /* Now read raw IP packets */
// read(tun_fd, buffer, sizeof(buffer));`}
//           </CodeBlock>
//
//         </section>
//
//
// {/* PACKET PARSING */}
//
//         <section className="mb-20">
//
//           <h2 className="text-2xl font-semibold mb-6 text-red">
//             Parsing IPv4 Packets
//           </h2>
//
//           <p className="text-text-secondary text-lg leading-relaxed mb-8">
//             Once packets are read from the TUN interface, the first step is parsing the
//             IPv4 header. The header contains metadata such as the protocol type,
//             source address, and destination address.
//           </p>
//
//           <CodeBlock title="IPv4 header structure" language="c">
// {`struct ipv4_header {
//     uint8_t  version_ihl;
//     uint8_t  tos;
//     uint16_t total_length;
//     uint16_t id;
//     uint16_t flags_fragment;
//     uint8_t  ttl;
//     uint8_t  protocol;
//     uint16_t checksum;
//     uint32_t src;
//     uint32_t dst;
// };`}
//           </CodeBlock>
//
//         </section>
//
//
// {/* PROTOCOL DISPATCH */}
//
//         <section className="grid md:grid-cols-2 gap-10 mb-20">
//
//           <div>
//             <h2 className="text-2xl font-semibold mb-6 text-text-primary">
//               Dispatching Protocols
//             </h2>
//
//             <p className="text-text-secondary text-lg leading-relaxed mb-6">
//               After parsing the IPv4 header, the stack inspects the
//               <span className="text-accent"> protocol</span> field to determine
//               which transport layer handler should process the payload.
//             </p>
//
//             <p className="text-text-secondary text-lg leading-relaxed">
//               Each protocol implementation lives in its own module. This keeps
//               the stack modular and easy to extend.
//             </p>
//           </div>
//
//           <CodeBlock title="Protocol dispatch logic" language="c">
// {`switch(ip->protocol) {
//
// case IPPROTO_ICMP:
//     handle_icmp(packet);
//     break;
//
// case IPPROTO_UDP:
//     handle_udp(packet);
//     break;
//
// case IPPROTO_TCP:
//     handle_tcp(packet);
//     break;
//
// }`}
//           </CodeBlock>
//
//         </section>
//
//
// {/* ICMP */}
//
//         <section className="mb-20">
//
//           <h2 className="text-2xl font-semibold mb-6 text-text-primary">
//             Implementing ICMP Echo Replies
//           </h2>
//
//           <p className="text-text-secondary text-lg leading-relaxed mb-6">
//             The first working feature in the stack is handling
//             <span className="text-purple"> ICMP echo requests</span>.
//             When the program receives a ping request, it constructs a valid
//             ICMP echo reply and sends it back through the TUN interface.
//           </p>
//
//           <CodeBlock title="ICMP echo reply handler" language="c">
// {`if (icmp->type == ICMP_ECHO_REQUEST) {
//
//     icmp->type = ICMP_ECHO_REPLY;
//
//     icmp->checksum = 0;
//     icmp->checksum = compute_checksum(icmp);
//
//     write(tun_fd, packet, len);
// }`}
//           </CodeBlock>
//
//         </section>
//
//
// {/* CONCLUSION */}
//
//         <section className="space-y-6 text-lg text-text-secondary leading-relaxed">
//
//           <h2 className="text-2xl font-semibold text-text-primary">
//             What’s Next
//           </h2>
//
//           <p>
//             Right now the stack supports:
//           </p>
//
//           <ul className="list-disc list-inside space-y-2">
//             <li>IPv4 packet parsing</li>
//             <li>ICMP echo replies</li>
//             <li>UDP packet inspection</li>
//             <li>basic TCP handshake parsing</li>
//           </ul>
//
//           <p>
//             The next step is implementing a minimal TCP state machine and
//             handling connection setup.
//           </p>
//
//         </section>
//
//
// {/* BACK */}
//
//         <div className="mt-16">
//           <Link
//             to="/blog"
//             className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-purple hover:underline"
//           >
//             ← Back to Writing Logs
//           </Link>
//         </div>
//
//       </article>
//     </PageWrapper>
//   )
// }
//

import PageWrapper from "../../components/PageWrapper"
import { Link } from "react-router-dom"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import "react-syntax-highlighter/dist/esm/languages/prism/c"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"

function CodeBlock({ language = "c", title = "code", children }) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">

      <div className="flex items-center justify-between px-4 py-2 bg-[#2b2b2b] text-xs text-text-muted uppercase tracking-wider">
        <span>{title}</span>
        <span>{language}</span>
      </div>

      <SyntaxHighlighter
        language={language}
        style={gruvboxDark}
        customStyle={{
          margin: 0,
          padding: "1.5rem",
          background: "#1d2021",
          fontSize: "0.85rem"
        }}
      >
        {children}
      </SyntaxHighlighter>

    </div>
  )
}

export default function TcpStackBlog() {
  return (
    <PageWrapper>
      <article className="max-w-5xl mx-auto px-6 py-20 relative">

        {/* background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple/15 blur-[140px] rounded-full pointer-events-none" />

        {/* HEADER */}

        <header className="mb-16 relative z-10">

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            Building a Userspace TCP/IP Stack <span className="text-purple">#01</span>
          </h1>

          {/* small professional blog subtitle */}

          <p className="text-sm text-text-muted mb-6">
            Development log for building a TCP/IP stack in userspace using C and Linux networking primitives.
          </p>

          {/* BUTTONS */}

          <div className="flex gap-3 mb-6 flex-wrap">

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

            <Link
              to="/projects/tcpip-stack"
              className="px-5 py-2.5 text-sm font-medium rounded-lg 
              border border-border
              bg-panel
              hover:border-purple
              hover:text-purple
              hover:-translate-y-[2px]
              transition-all duration-200"
            >
              project
            </Link>

          </div>

          {/* META */}

          <div className="flex flex-wrap gap-6 text-xs text-text-muted uppercase tracking-wider">
            <span>2026</span>
            <span>Networking</span>
            <span>C</span>
            <span>Linux</span>
          </div>

          <div className="mt-5 h-[2px] w-28 bg-gradient-to-r from-purple via-blue to-accent"></div>

        </header>


{/* INTRO */}

        <section className="space-y-6 text-lg text-text-secondary leading-relaxed mb-16">

          <p>
            Modern operating systems hide most networking complexity behind the kernel.
            Applications call <span className="text-accent">send()</span> or 
            <span className="text-accent"> recv()</span> and packets magically appear on the wire.
          </p>

          <p>
            I wanted to understand what actually happens between those calls and the network
            interface, so I started building a small <span className="text-purple">userspace TCP/IP stack</span>
            in C.
          </p>

          <p>
            Instead of relying on the kernel networking stack, the program receives raw IP
            packets from a Linux <span className="text-purple">TUN device</span> and processes them
            manually layer by layer.
          </p>

        </section>



{/* TUN SECTION */}

        <section className="grid md:grid-cols-2 gap-10 mb-20">

          <div className="space-y-6 text-text-secondary text-lg leading-relaxed">

            <h2 className="text-red text-2xl font-semibold">
              Intercepting Packets with TUN
            </h2>

            <p>
              Linux provides a virtual network interface called a
              <span className="text-purple"> TUN device</span>.
              It behaves like a normal network interface, except packets are
              delivered directly to a userspace program instead of the kernel stack.
            </p>

            <p>
              When the interface receives packets, they appear as raw IP frames
              on a file descriptor. This allows the program to parse and process
              packets manually.
            </p>

          </div>

          <CodeBlock title="Creating a TUN interface" language="c">
{`int tun_fd = open("/dev/net/tun", O_RDWR);

struct ifreq ifr = {0};
ifr.ifr_flags = IFF_TUN | IFF_NO_PI;

ioctl(tun_fd, TUNSETIFF, &ifr);

/* Now read raw IP packets */
read(tun_fd, buffer, sizeof(buffer));`}
          </CodeBlock>

        </section>


{/* PACKET PARSING */}

        <section className="mb-20">

          <h2 className="text-2xl font-semibold mb-6 text-red">
            Parsing IPv4 Packets
          </h2>

          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            Once packets are read from the TUN interface, the first step is parsing the
            IPv4 header. The header contains metadata such as the protocol type,
            source address, and destination address.
          </p>

          <CodeBlock title="IPv4 header structure" language="c">
{`struct ipv4_header {
    uint8_t  version_ihl;
    uint8_t  tos;
    uint16_t total_length;
    uint16_t id;
    uint16_t flags_fragment;
    uint8_t  ttl;
    uint8_t  protocol;
    uint16_t checksum;
    uint32_t src;
    uint32_t dst;
};`}
          </CodeBlock>

        </section>


{/* PROTOCOL DISPATCH */}

        <section className="grid md:grid-cols-2 gap-10 mb-20">

          <div>

            <h2 className="text-2xl font-semibold mb-6 text-text-primary">
              Dispatching Protocols
            </h2>

            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              After parsing the IPv4 header, the stack inspects the
              <span className="text-accent"> protocol</span> field to determine
              which transport layer handler should process the payload.
            </p>

            <p className="text-text-secondary text-lg leading-relaxed">
              Each protocol implementation lives in its own module. This keeps
              the stack modular and easy to extend.
            </p>

          </div>

          <CodeBlock title="Protocol dispatch logic" language="c">
{`switch(ip->protocol) {

case IPPROTO_ICMP:
    handle_icmp(packet);
    break;

case IPPROTO_UDP:
    handle_udp(packet);
    break;

case IPPROTO_TCP:
    handle_tcp(packet);
    break;

}`}
          </CodeBlock>

        </section>


{/* ICMP */}

        <section className="mb-20">

          <h2 className="text-2xl font-semibold mb-6 text-text-primary">
            Implementing ICMP Echo Replies
          </h2>

          <p className="text-text-secondary text-lg leading-relaxed mb-6">
            The first working feature in the stack is handling
            <span className="text-purple"> ICMP echo requests</span>.
            When the program receives a ping request, it constructs a valid
            ICMP echo reply and sends it back through the TUN interface.
          </p>

          <CodeBlock title="ICMP echo reply handler" language="c">
{`if (icmp->type == ICMP_ECHO_REQUEST) {

    icmp->type = ICMP_ECHO_REPLY;

    icmp->checksum = 0;
    icmp->checksum = compute_checksum(icmp);

    write(tun_fd, packet, len);
}`}
          </CodeBlock>

        </section>


{/* CONCLUSION */}

        <section className="space-y-6 text-lg text-text-secondary leading-relaxed">

          <h2 className="text-2xl font-semibold text-text-primary">
            What’s Next
          </h2>

          <p>
            Right now the stack supports:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>IPv4 packet parsing</li>
            <li>ICMP echo replies</li>
            <li>UDP packet inspection</li>
            <li>basic TCP handshake parsing</li>
          </ul>

          <p>
            The next step is implementing a minimal TCP state machine and
            handling connection setup.
          </p>

        </section>


{/* BACK */}

        <div className="mt-16">

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-purple hover:underline"
          >
            ← back to blogs
          </Link>

        </div>

      </article>
    </PageWrapper>
  )
}
