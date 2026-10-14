import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  ArrowUpRight,
  ChevronDown,
  Terminal,
  Network,
  Boxes,
  Database,
  Cloud,
  GraduationCap,
  MapPin,
  Menu,
  X,
  ChevronRight,
  Layers,
} from "lucide-react";

/* ---------------------------------------------------------------
   GITHUB / LINKEDIN ICONS — lucide-react dropped brand/logo icons
   from its icon set, so these are small inline SVGs drawn to match
   the stroke-style of the rest of the icon set (24x24, currentColor).
------------------------------------------------------------------*/
function GithubIcon({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.09-.647.35-1.088.636-1.339-2.221-.253-4.556-1.113-4.556-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.679.921.679 1.856 0 1.34-.012 2.421-.012 2.751 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.114 20.452H3.56V9h3.554v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   TOKENS
   bg      #0A0E17  near-black navy, cool undertone
   surface #10161F  card surface
   line    #1D2635  hairlines / trace line
   cyan    #22D3EE  signature accent (used sparingly, on purpose)
   text    #E7EEF6  primary text
   dim     #8C9AB0  secondary text
   faint   #56637A  tertiary / labels
------------------------------------------------------------------*/
const C = {
  bg: "#0A0E17",
  surface: "#10161F",
  surfaceAlt: "#0D121B",
  line: "#1D2635",
  cyan: "#22D3EE",
  cyanDim: "rgba(34,211,238,0.12)",
  cyanLine: "rgba(34,211,238,0.45)",
  text: "#E7EEF6",
  dim: "#8C9AB0",
  faint: "#56637A",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
`;

/* ---------------------------------------------------------------
   REVEAL — lightweight scroll-in wrapper (IntersectionObserver)
------------------------------------------------------------------*/
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   HOP — a single "trace" row: left gutter (dot + hop label + fake
   latency reading, evoking a traceroute) + right-side content.
   This literalizes Salum's RDMA / low-latency-networking background
   into the page's own spine, rather than decorating with generic
   numbered badges.
------------------------------------------------------------------*/
function Hop({ index, label, latency, title, children }) {
  return (
    <div className="relative flex gap-6 md:gap-10">
      {/* gutter */}
      <div className="hidden md:flex flex-col items-center w-20 shrink-0 pt-1.5">
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{
            background: C.bg,
            border: `2px solid ${C.cyan}`,
            boxShadow: `0 0 0 4px ${C.cyanDim}`,
          }}
        />
        <div
          className="mt-3 text-[11px] tracking-wider"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: C.faint }}
        >
          hop {String(index).padStart(2, "0")}
        </div>
        <div
          className="mt-1 text-[11px]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: C.cyan, opacity: 0.7 }}
        >
          {latency}
        </div>
      </div>

      {/* mobile inline eyebrow */}
      <div className="md:hidden absolute -left-1 top-1.5 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: C.cyan }}
        />
      </div>

      <div className="flex-1 pb-16 md:pb-20 pl-4 md:pl-0">
        <div
          className="md:hidden mb-2 text-[11px] tracking-wider"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: C.faint }}
        >
          hop {String(index).padStart(2, "0")} · {latency}
        </div>
        <h3
          className="text-xl md:text-2xl font-semibold mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.text }}
        >
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PILL — small tag chip used for tech / coursework / activities
------------------------------------------------------------------*/
function Pill({ children, muted = false }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs md:text-[13px] mr-2 mb-2"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: muted ? C.dim : C.text,
        background: muted ? "transparent" : C.surface,
        border: `1px solid ${muted ? C.line : C.line}`,
      }}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------
   TYPED TERMINAL — hero intro sequence
------------------------------------------------------------------*/
function TerminalIntro() {
  const [phase, setPhase] = useState(0); // 0: typing whoami, 1: show output
  const [typed, setTyped] = useState("");
  const full = "whoami";

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTyped(full);
      setPhase(1);
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        setTimeout(() => setPhase(1), 350);
      }
    }, 90);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="rounded-lg overflow-hidden w-full max-w-md"
      style={{ background: C.surfaceAlt, border: `1px solid ${C.line}` }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: `1px solid ${C.line}` }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        <span
          className="ml-3 text-[11px]"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: C.faint }}
        >
          salum@ontariotech
        </span>
      </div>
      <div className="px-4 py-4 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        <div style={{ color: C.dim }}>
          <span style={{ color: C.cyan }}>$</span> {typed}
          <span
            style={{
              display: "inline-block",
              width: "7px",
              height: "14px",
              background: C.cyan,
              marginLeft: "2px",
              opacity: phase === 0 ? 1 : 0,
              animation: phase === 0 ? "blink 1s step-end infinite" : "none",
              verticalAlign: "text-bottom",
            }}
          />
        </div>
        {phase === 1 && (
          <div
            style={{
              marginTop: "6px",
              color: C.text,
              opacity: 0,
              animation: "fadeIn 0.5s ease forwards",
            }}
          >
            salum_khatib{" "}
            <span style={{ color: C.faint }}>— sde, networks &amp; ai</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   NAV
------------------------------------------------------------------*/
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "about"],
    ["Skills", "skills"],
    ["Experience", "experience"],
    ["Projects", "projects"],
    ["Education", "education"],
  ];
  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div
      className="sticky top-0 z-50 backdrop-blur"
      style={{ background: "rgba(10,14,23,0.75)", borderBottom: `1px solid ${C.line}` }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => go("top")}
          className="flex items-center gap-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span
            className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-semibold"
            style={{ background: C.cyanDim, color: C.cyan, border: `1px solid ${C.line}` }}
          >
            SK
          </span>
          <span className="hidden sm:inline text-sm" style={{ color: C.dim }}>
            salum khatib
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="text-sm transition-colors"
              style={{ color: C.dim, fontFamily: "'Inter', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.dim)}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="text-sm px-4 py-2 rounded-md font-medium"
            style={{
              color: C.bg,
              background: C.cyan,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Get in touch
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: C.text }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: `1px solid ${C.line}` }}
        >
          {links.map(([label, id]) => (
            <button
              key={id}
              onClick={() => go(id)}
              className="text-left text-sm pt-4"
              style={{ color: C.dim, fontFamily: "'Inter', sans-serif" }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="text-sm px-4 py-2.5 rounded-md font-medium text-center"
            style={{ color: C.bg, background: C.cyan }}
          >
            Get in touch
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   IN-ROLE PROJECTS — expandable detail on the CBC internship.
   Kept generic on infra specifics (no internal hostnames/paths/repo
   links) since the underlying tooling is internal-use CBC property.
------------------------------------------------------------------*/
const CBC_PROJECTS = [
  {
    status: "completed",
    title: "Full-Stack Live Graphics Automation Tool",
    stack: ["Python", "Django", "Docker", "Kubernetes", "Helm", "Gunicorn"],
    description:
      "Designed and built a Django-based thin-client tool that pulls the static on-air graphics workflow out of the larger templated animation pipeline entirely — giving graphic designers, rundown creators, and directors a fast, session-based way to upload, validate, crop, preview, and export static graphics on their own. Deployed as a stateless, containerized service on a Kubernetes cluster, installed and upgraded via a Helm chart. Every user gets a fully isolated sandbox: uploads, previews, and exports are namespaced per user on the same shared pod, and a 'logout & purge' action surgically wipes one user's files and database records without touching anyone else's active session.",
    impact:
      "Automatically enforces broadcast delivery specs (resolution, aspect ratio, file size) before anything ships, routing anything non-compliant back into an interactive crop tool instead of failing on air. Exports are packaged as standards-compliant OGRAF assets — JSON manifests plus JS render modules — bringing the pipeline into compliance with the new international OGRAF broadcast standard while cutting manual template work for show operators.",
  },
  {
    status: "completed",
    title: "RDMA Network Engineering & Validation",
    stack: ["RDMA", "Ansible", "Python", "MXL", "Linux"],
    description:
      "Contributed code and testing to the open-source MXL RDMA project, configuring and validating RDMA applications on both bare-metal enterprise hardware and containerized environments. Wrote Ansible playbooks and roles to profile the entire enterprise RDMA network end to end — pulling device inventory, topology, and running configurations at scale instead of by hand.",
    impact:
      "Supported configuration, validation, and go-live of RDMA applications in real, high-speed production broadcast environments alongside partners like NVIDIA, Intel, Arista, and Cisco — with the Ansible-driven profiling giving engineers everything needed to build, test, and run RDMA on enterprise devices with confidence.",
  },
  {
    status: "completed",
    title: "Campus Network Migration & Automation",
    stack: ["NetBox API", "Python", "Enterprise Networking"],
    description:
      "Orchestrated Campus LAN Refresh migrations across 7 large-scale network closets, and designed and allocated cutover plans for a building-wide migration spanning 50+ enterprise network closets. Paired that migration work with automation that pushes network configuration and documentation directly into NetBox through Python and the NetBox API, replacing manual record-keeping with a live, self-updating source of truth.",
    impact:
      "Kept live broadcast infrastructure online through every cutover, with documentation that stays accurate automatically as the network changes — a migration plan built to scale across the entire building's network footprint.",
  },
];

function ProjectAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-2xl mt-6">
      <div className="flex items-center gap-2 mb-3 text-xs" style={{ color: C.faint }}>
        <Layers size={13} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          projects within this role
        </span>
      </div>
      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
        {items.map((p, i) => {
          const isOpen = open === i;
          return (
            <div key={p.title} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-4 py-3.5 text-left"
                style={{ background: isOpen ? C.surface : "transparent" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ChevronRight
                    size={15}
                    style={{
                      color: C.cyan,
                      flexShrink: 0,
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                  <span className="text-sm font-medium truncate" style={{ color: C.text }}>
                    {p.title}
                  </span>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: p.status === "ongoing" ? C.cyan : C.dim,
                    border: `1px solid ${C.line}`,
                    background: p.status === "ongoing" ? C.cyanDim : "transparent",
                  }}
                >
                  {p.status}
                </span>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? "320px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  background: C.surface,
                }}
              >
                <div className="px-4 pb-4 pt-1 pl-10">
                  <p className="text-sm leading-relaxed mb-3" style={{ color: C.dim }}>
                    {p.description}
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: C.dim }}>
                    <span style={{ color: C.cyan }}>Impact — </span>
                    {p.impact}
                  </p>
                  <div className="flex flex-wrap">
                    {p.stack.map((t) => (
                      <Pill key={t} muted>
                        {t}
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN PAGE
------------------------------------------------------------------*/
export default function Portfolio() {
  return (
    <div
      id="top"
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        ${FONTS}
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeIn { to { opacity: 1; } }
        ::selection { background: ${C.cyanDim}; color: ${C.cyan}; }
        html { scroll-behavior: smooth; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${C.cyan};
          outline-offset: 3px;
        }
      `}</style>

      <Nav />

      {/* ---------------- HERO ---------------- */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-20 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span
                className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: C.cyan,
                  border: `1px solid ${C.line}`,
                  background: C.cyanDim,
                }}
              >
                <MapPin size={12} /> Etobicoke, ON
              </span>
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: C.dim,
                  border: `1px solid ${C.line}`,
                }}
              >
                5th-yr SWE · Ontario Tech
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold leading-[1.05] mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Salum
              <br />
              Khatib
            </h1>

            <p className="text-lg md:text-xl max-w-md mb-8" style={{ color: C.dim }}>
              Software engineer building at the edge of{" "}
              <span style={{ color: C.text }}>networks</span> and{" "}
              <span style={{ color: C.text }}>AI</span> — from lossless RDMA
              fabric to the models that run on top of it.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() =>
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-5 py-3 rounded-md text-sm font-medium"
                style={{ background: C.cyan, color: C.bg }}
              >
                View experience
              </button>
              <a
                href="mailto:salumkhatib500@gmail.com"
                className="px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2"
                style={{ border: `1px solid ${C.line}`, color: C.text }}
              >
                Say hello <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a href="https://github.com/Salum17" target="_blank" rel="noreferrer" style={{ color: C.dim }}>
                <GithubIcon size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/salumkhatib/"
                target="_blank"
                rel="noreferrer"
                style={{ color: C.dim }}
              >
                <LinkedinIcon size={20} />
              </a>
              <a href="mailto:salumkhatib500@gmail.com" style={{ color: C.dim }}>
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="flex md:justify-end">
            <TerminalIntro />
          </div>
        </div>

        <div className="flex justify-center mt-16 md:mt-24" style={{ color: C.faint }}>
          <ChevronDown size={20} className="animate-bounce" />
        </div>
      </section>

      {/* trace line spine starts here, runs through content sections */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="relative">
          <div
            className="hidden md:block absolute top-0 bottom-0 w-px"
            style={{
              left: "39px",
              background: `linear-gradient(${C.line}, ${C.cyanLine}, ${C.line})`,
            }}
          />

          {/* ---------------- ABOUT ---------------- */}
          <section id="about" className="pt-4 pb-8 scroll-mt-20">
            <Reveal>
              <Hop index={1} label="about" latency="0.8ms">
                <p className="max-w-2xl leading-relaxed mb-6" style={{ color: C.dim }}>
                  I'm a fifth-year Software Engineering student at Ontario
                  Tech University. I spent the last 16 months on
                  CBC/Radio-Canada's network engineering team, building and
                  testing software for RDMA-based, lossless, high-speed
                  networks used in live broadcast infrastructure. I'm back on
                  campus now, finishing my degree while architecting a
                  multi-agent AI system for my capstone — and still building
                  side projects, like a predictive model for NBA outcomes.
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 max-w-lg">
                  {[
                    ["3.9", "GPA cumulative"],
                    ["16", "months at CBC/Radio-Canada"],
                    ["50+", "network closets migrated"],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <div
                        className="text-2xl font-semibold"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.cyan }}
                      >
                        {n}
                      </div>
                      <div className="text-xs mt-1" style={{ color: C.faint }}>
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </Hop>
            </Reveal>
          </section>

          {/* ---------------- SKILLS ---------------- */}
          <section id="skills" className="pb-8 scroll-mt-20">
            <Reveal>
              <Hop index={2} label="skills" latency="1.2ms">
                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                  {[
                    {
                      icon: Boxes,
                      title: "Full-Stack Development",
                      items: ["Python (Django, FastAPI)", "C++", "Java", "TypeScript", "Node.js", "React.js / Next.js"],
                    },
                    {
                      icon: Database,
                      title: "AI & Data",
                      items: ["LLM / Agentic AI Systems", "TensorFlow", "PyTorch", "Pandas / NumPy", "Matplotlib", "MySQL", "MongoDB"],
                    },
                    {
                      icon: Cloud,
                      title: "Cloud Platforms",
                      items: ["AWS", "Azure", "GCP", "NetApp"],
                    },
                    {
                      icon: Network,
                      title: "DevOps & PM",
                      items: ["Docker", "Kubernetes", "Helm", "Git", "CI/CD", "Ansible", "NetBox API", "Jira", "Confluence"],
                    },
                  ].map(({ icon: Icon, title, items }) => (
                    <div
                      key={title}
                      className="p-5 rounded-lg"
                      style={{ background: C.surface, border: `1px solid ${C.line}` }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={16} style={{ color: C.cyan }} />
                        <span className="text-sm font-medium">{title}</span>
                      </div>
                      <div className="flex flex-wrap">
                        {items.map((it) => (
                          <Pill key={it} muted>
                            {it}
                          </Pill>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Hop>
            </Reveal>
          </section>

          {/* ---------------- EXPERIENCE ---------------- */}
          <section id="experience" className="pb-8 scroll-mt-20">
            <Reveal>
              <Hop index={3} label="cbc" latency="0.4ms">
                <div
                  className="mb-1 flex items-center justify-between max-w-2xl flex-wrap gap-2"
                >
                  <div>
                    <div className="text-sm" style={{ color: C.cyan }}>
                      SDA Network Engineering Intern
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: C.faint }}>
                      CBC/Radio-Canada · Toronto, ON
                    </div>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: C.dim, border: `1px solid ${C.line}` }}
                  >
                    May 2025 — Aug 2026
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5 max-w-2xl">
                  {[
                    "Spearheaded a full-stack automation tool (Django, Docker, Kubernetes, Helm) for live on-air non-templated graphics, improving show operator performance and bringing the pipeline into compliance with the new international OGRAF broadcasting standard.",
                    "Developed and tested software for RDMA-based, lossless high-speed networks on production-grade systems, partnering directly with NVIDIA, Intel, Arista, and Cisco.",
                    "Contributed code and testing to international open-source RDMA projects (MXL, MCM), supporting configuration, validation, and deployment of RDMA applications in real-world environments.",
                    "Orchestrated Campus LAN Refresh migrations across 7 network closets and designed cutovers for a building-wide migration spanning 50+ enterprise closets, profiling the network end-to-end with Ansible and automating documentation into NetBox via the NetBox API.",
                  ].map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed" style={{ color: C.dim }}>
                      <span style={{ color: C.cyan, flexShrink: 0 }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <ProjectAccordion items={CBC_PROJECTS} />
              </Hop>
            </Reveal>

            <Reveal>
              <Hop index={4} label="ttc" latency="2.1ms">
                <div className="mb-1 flex items-center justify-between max-w-2xl flex-wrap gap-2">
                  <div>
                    <div className="text-sm" style={{ color: C.cyan }}>
                      Engineering Technician Intern
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: C.faint }}>
                      Toronto Transit Commission (TTC) · Toronto, ON
                    </div>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{ fontFamily: "'JetBrains Mono', monospace", color: C.dim, border: `1px solid ${C.line}` }}
                  >
                    Apr 2024 — Sep 2024
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5 max-w-2xl">
                  {[
                    "Serialized train components into the TTC database with meticulous accuracy.",
                    "Created work orders and logbooks to maintain detailed documentation for technicians, ensuring seamless operations.",
                    "Analyzed data and generated reports while working closely with senior engineers and technicians.",
                  ].map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed" style={{ color: C.dim }}>
                      <span style={{ color: C.cyan, flexShrink: 0 }}>→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Hop>
            </Reveal>
          </section>

          {/* ---------------- PROJECTS ---------------- */}
          <section id="projects" className="pb-8 scroll-mt-20">
            <Reveal>
              <Hop index={5} label="projects" latency="0.6ms">
                <div className="max-w-2xl space-y-5">
                  {/* Capstone — lead project */}
                  <div
                    className="p-6 rounded-lg"
                    style={{ background: C.surface, border: `1px solid ${C.cyanLine}` }}
                  >
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: C.cyan, background: C.cyanDim }}
                      >
                        in progress · capstone
                      </span>
                      <span
                        className="text-xs"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: C.faint }}
                      >
                        Sept 2026 — Present
                      </span>
                    </div>
                    <h4
                      className="text-lg font-semibold mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Agentic AI for Test Automation in DevOps
                    </h4>
                    <div className="text-xs mb-4" style={{ color: C.faint }}>
                      Ontario Tech University · 5-person team, faculty-supervised · two-term engineering capstone
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: C.dim }}>
                      Architecting a multi-agent system that validates
                      backend APIs against live database state and user
                      stories, triggered automatically on every pull
                      request — catching integration and logic bugs that
                      static analysis tools miss. The pipeline splits the
                      problem across three agents: one maps each API into a
                      versioned contract, one generates test cases from the
                      pull request diff and that contract, and one executes
                      those tests and compares live responses against the
                      database.
                    </p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: C.dim }}>
                      <span style={{ color: C.cyan }}>What makes it different — </span>
                      an explainability layer on top that justifies why each
                      generated test is valid and pinpoints the exact point
                      of failure, turning a black-box test run into
                      something an engineer can actually audit. Leading
                      project management for the team, and validating the
                      system against a real, production-scale open-source
                      codebase rather than synthetic data.
                    </p>
                    <div className="flex flex-wrap">
                      {["Multi-Agent Systems", "LLMs", "Python", "CI/CD", "PostgreSQL", "Explainable AI"].map((t) => (
                        <Pill key={t} muted>
                          {t}
                        </Pill>
                      ))}
                    </div>
                  </div>

                  {/* NBA predictor — secondary */}
                  <div
                    className="p-5 rounded-lg flex flex-col"
                    style={{ background: C.surface, border: `1px solid ${C.line}` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: C.dim, border: `1px solid ${C.line}` }}
                      >
                        ongoing · personal
                      </span>
                      <a href="https://github.com/Salum17" target="_blank" rel="noreferrer" style={{ color: C.faint }}>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                    <h4 className="font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      NBA Stats Predictor
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: C.dim }}>
                      Python model that predicts NBA team performance from
                      stats gathered via Playwright web scraping. Feature
                      engineering and model tuning on a relational data
                      store, currently at 80% prediction accuracy.
                    </p>
                    <div className="mt-4 flex flex-wrap">
                      {["Python", "Playwright", "ML"].map((t) => (
                        <Pill key={t} muted>
                          {t}
                        </Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </Hop>
            </Reveal>
          </section>

          {/* ---------------- EDUCATION ---------------- */}
          <section id="education" className="pb-4 scroll-mt-20">
            <Reveal>
              <Hop index={6} label="education" latency="0.3ms">
                <div
                  className="p-6 rounded-lg max-w-2xl"
                  style={{ background: C.surface, border: `1px solid ${C.line}` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <GraduationCap size={20} style={{ color: C.cyan }} className="mt-0.5" />
                    <div>
                      <div className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        Bachelor of Software Engineering
                      </div>
                      <div className="text-sm" style={{ color: C.faint }}>
                        Ontario Tech University · Sept 2022 — Apr 2027 · GPA 3.9
                      </div>
                    </div>
                  </div>
                  <div className="text-xs mb-2" style={{ color: C.faint }}>
                    relevant coursework
                  </div>
                  <div className="flex flex-wrap mb-4">
                    {[
                      "Artificial Intelligence",
                      "AI Engineering and MLOps",
                      "Deep Learning",
                      "Distributed Systems",
                      "Data Structures & Algorithms",
                      "Computer Networks",
                      "Embedded Systems",
                      "Cloud Computing",
                    ].map((c) => (
                      <Pill key={c} muted>
                        {c}
                      </Pill>
                    ))}
                  </div>
                  <div className="text-xs mb-2" style={{ color: C.faint }}>
                    extracurricular
                  </div>
                  <div className="flex flex-wrap">
                    {[
                      "Google Developer Student Club",
                      "Headstarter SWE Fellowship",
                      "HackHive Hackathon",
                      "EngSoc",
                      "Muslim Student Association",
                    ].map((c) => (
                      <Pill key={c} muted>
                        {c}
                      </Pill>
                    ))}
                  </div>
                </div>
              </Hop>
            </Reveal>
          </section>
        </div>
      </div>

      {/* ---------------- CONTACT / FOOTER ---------------- */}
      <section id="contact" className="scroll-mt-20" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-20">
          <Reveal>
            <div className="flex items-center gap-2 mb-4" style={{ color: C.cyan }}>
              <Terminal size={16} />
              <span className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                connection established
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 max-w-lg"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let's build something reliable.
            </h2>
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="mailto:salumkhatib500@gmail.com"
                className="px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2"
                style={{ background: C.cyan, color: C.bg }}
              >
                <Mail size={15} /> salumkhatib500@gmail.com
              </a>
              <a
                href="https://github.com/Salum17"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2"
                style={{ border: `1px solid ${C.line}`, color: C.text }}
              >
                <GithubIcon size={15} /> Github
              </a>
              <a
                href="https://www.linkedin.com/in/salumkhatib/"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2"
                style={{ border: `1px solid ${C.line}`, color: C.text }}
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
            </div>
            <div
              className="pt-8 flex items-center justify-between flex-wrap gap-2"
              style={{ borderTop: `1px solid ${C.line}` }}
            >
              <span className="text-xs" style={{ color: C.faint }}>
                © {new Date().getFullYear()} Salum Khatib
              </span>
              <span
                className="text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: C.faint }}
              >
                Etobicoke, ON
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}