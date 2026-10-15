import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import logo from "./assets/muzafar-tech-logo-navbar.png";

// ---------------------------------------------------------------------------
// Nav items
// ---------------------------------------------------------------------------
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "solar:home-2-bold-duotone" },
  {
    id: "features",
    label: "Features",
    icon: "solar:magic-stick-3-bold-duotone",
  },
  {
    id: "showcase",
    label: "Showcase",
    icon: "solar:gallery-wide-bold-duotone",
  },
  { id: "pricing", label: "Pricing", icon: "solar:tag-price-bold-duotone" },
  {
    id: "contact",
    label: "Contact",
    icon: "solar:chat-round-dots-bold-duotone",
  },
];

// What we built — shown as headings in the hero
const HIGHLIGHTS = [
  {
    icon: "solar:layers-minimalistic-bold-duotone",
    title: "Glassmorphism design",
  },
  { icon: "solar:smartphone-bold-duotone", title: "Fully responsive" },
  { icon: "solar:cursor-bold-duotone", title: "Hover & active effects" },
  { icon: "solar:play-circle-bold-duotone", title: "Smooth animations" },
];

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Cursor-follow spotlight inside the glass bar
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(180px circle at ${mx}px ${my}px, rgba(192,132,252,0.28), transparent 70%)`;

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  // Close mobile menu on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: globalThis.MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close menu when resizing up to desktop
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const glass =
    "border border-white/15 bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)]";

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
    >
      <div ref={wrapRef} className="relative w-full max-w-4xl">
        <div
          onMouseMove={handleMove}
          onMouseLeave={() => {
            mx.set(-200);
            my.set(-200);
          }}
          className={`relative flex items-center justify-between overflow-hidden rounded-full px-3 py-2 sm:px-4 ${glass}`}
        >
          <motion.div
            aria-hidden
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0"
          />

          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActive("home");
              setOpen(false);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative z-10 flex items-center gap-2 rounded-full py-0.5 pl-1 pr-3 outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <motion.img
              src={logo}
              alt="Muzafar Tech"
              whileHover={{ rotate: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="h-8 w-8 object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]"
            />
            <span className="text-sm font-semibold tracking-wide text-white">
              Muzafar<span className="text-purple-400">Tech</span>
            </span>
          </motion.a>

          <nav
            className="relative z-10 hidden items-center gap-1 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(item.id);
                  }}
                  onMouseEnter={() => setHovered(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-purple-400 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {hovered === item.id && !isActive && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-purple-300/40 bg-gradient-to-b from-purple-500/50 to-fuchsia-600/40 shadow-[0_0_24px_rgba(168,85,247,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <motion.span
                    className="relative z-10 flex"
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    whileHover={{ y: -2, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 14 }}
                  >
                    <Icon icon={item.icon} width={18} />
                  </motion.span>
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setActive("contact");
                setOpen(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative hidden items-center gap-1.5 overflow-hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black outline-none focus-visible:ring-2 focus-visible:ring-purple-400 sm:flex"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-300/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Get Started</span>
              <Icon
                icon="solar:arrow-right-up-linear"
                width={16}
                className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>

            <motion.button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              whileTap={{ scale: 0.88 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-purple-400 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <Icon
                    icon={
                      open
                        ? "solar:close-circle-bold-duotone"
                        : "solar:hamburger-menu-bold-duotone"
                    }
                    width={24}
                  />
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              style={{ transformOrigin: "top center" }}
              className={`absolute inset-x-0 top-full mt-3 overflow-hidden rounded-3xl p-2 md:hidden ${glass}`}
            >
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = active === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActive(item.id);
                          setOpen(false);
                        }}
                        className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-purple-400 ${
                          isActive
                            ? "border border-purple-300/30 bg-gradient-to-r from-purple-500/40 to-fuchsia-600/30 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                            : "border border-transparent text-white/70 hover:bg-white/10 hover:text-white active:scale-[0.98]"
                        }`}
                      >
                        <Icon icon={item.icon} width={22} />
                        <span className="flex-1">{item.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="mobile-dot"
                            className="h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_10px_rgba(216,180,254,0.9)]"
                          />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setActive("contact");
                  setOpen(false);
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white py-3 text-base font-semibold text-black sm:hidden"
              >
                Get Started
                <Icon icon="solar:arrow-right-up-linear" width={18} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

// ---------------------------------------------------------------------------
// Hero — headings only
// ---------------------------------------------------------------------------
function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pb-16 pt-32 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="max-w-4xl bg-gradient-to-b from-white via-white to-purple-300/70 bg-clip-text text-4xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
      >
        A glass navbar that feels alive.
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-5 max-w-xl text-base font-medium text-white/60 sm:text-lg md:text-xl"
      >
        Built with React, Tailwind and Framer Motion.
      </motion.h2>

      <ul className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
        {HIGHLIGHTS.map((h, i) => (
          <motion.li
            key={h.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 + i * 0.1, duration: 0.5 }}
            whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-left backdrop-blur-xl transition-colors duration-300 hover:border-purple-400/40 hover:bg-white/[0.08]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 transition-all duration-300 group-hover:bg-purple-500/40 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
              <Icon icon={h.icon} width={24} />
            </span>
            <h3 className="text-base font-semibold text-white sm:text-lg">
              {h.title}
            </h3>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
export default function App() {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: [0, 60, -30, 0], y: [0, 40, 80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-purple-600/30 blur-[110px]"
      />
      <motion.div
        aria-hidden
        animate={
          reduce ? undefined : { x: [0, -70, 30, 0], y: [0, -30, 50, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={
          reduce ? undefined : { x: [0, 40, -40, 0], y: [0, -50, 20, 0] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-600/25 blur-[100px]"
      />

      <Navbar />
      <Hero />
    </div>
  );
}
