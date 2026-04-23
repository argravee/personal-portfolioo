import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Cpu,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import mountainImage from '../assets/mountain.jpg';
import sasWebsiteImage from '../assets/sas-wesbite.png';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-100px' },
  transition: { staggerChildren: 0.2 },
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<{ id: string, title: string, category: string, image: string, description: string, github?: boolean, githubUrl?: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="selection:bg-sea-foam selection:text-on-surface scroll-smooth">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-terracotta origin-left z-[100]"
        style={{ scaleX }}
      />
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-shell-white/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="bg-white organic-border p-8 max-w-2xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-on-surface/50 hover:text-terracotta transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="aspect-[16/9] w-full organic-border overflow-hidden mb-6">
                 <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              <span className="font-hand text-xl text-terracotta">{selectedProject.category}</span>
              <h3 className="font-heading text-4xl mt-2 text-on-surface mb-4">
                {selectedProject.title}
                {selectedProject.github && selectedProject.githubUrl && (
                  <span className="inline-flex items-center align-middle ml-4 relative -top-1">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="hover:text-terracotta text-on-surface transition-colors" title="View GitHub Repo">
                      <Github className="w-8 h-8" />
                    </a>
                    <ArrowUpRight className="w-5 h-5 ml-1 text-on-surface/60" />
                  </span>
                )}
              </h3>
              <p className="font-body text-xl text-on-surface/80 leading-relaxed">
                {selectedProject.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 bg-shell-white/80 backdrop-blur-md border-b border-terracotta/10"
      >
        <div className="flex justify-between items-center px-6 md:px-12 py-5 w-full max-w-[1280px] mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-heading font-bold tracking-tight text-terracotta flex items-center gap-2 cursor-pointer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="w-8 h-8 fill-current"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.032-2.682-.104-.254-.448-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.392.1 2.646.64.699 1.028 1.59 1.028 2.682 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            argravee
            <ArrowUpRight className="w-5 h-5 text-terracotta" />
          </motion.div>
          <div className="hidden md:flex gap-10 items-center">
            <motion.a
              whileHover={{ y: -2 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('root')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-heading text-sm font-semibold text-on-surface/80 hover:text-terracotta transition-colors cursor-pointer"
              href="#root"
            >
              Home
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-heading text-sm font-semibold text-on-surface/80 hover:text-terracotta transition-colors cursor-pointer"
              href="#projects"
            >
              Projects
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-heading text-sm font-semibold text-on-surface/80 hover:text-terracotta transition-colors cursor-pointer"
              href="#stack"
            >
              Skills
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              href="#contact"
              className="bg-sea-foam text-on-surface px-6 py-2 rounded-full font-heading text-sm font-bold shadow-md hover:bg-terracotta hover:text-white transition-colors cursor-pointer inline-block"
            >
              Contact
            </motion.a>
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="text-terracotta hover:text-coastal-blue transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-shell-white border-b border-terracotta/10 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-8 gap-6 items-center">
                <a 
                  href="#root" 
                  onClick={(e) => { e.preventDefault(); document.getElementById('root')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
                  className="font-heading text-xl font-semibold text-on-surface/80 hover:text-terracotta"
                >
                  Home
                </a>
                <a 
                  href="#projects" 
                  onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
                  className="font-heading text-xl font-semibold text-on-surface/80 hover:text-terracotta"
                >
                  Projects
                </a>
                <a 
                  href="#stack" 
                  onClick={(e) => { e.preventDefault(); document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
                  className="font-heading text-xl font-semibold text-on-surface/80 hover:text-terracotta"
                >
                  Skills
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false); }} 
                  className="bg-sea-foam text-on-surface px-8 py-3 rounded-full font-heading text-lg font-bold shadow-md hover:bg-terracotta hover:text-white transition-colors inline-block"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main>
        <section id="root" className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-[1280px] mx-auto pt-32 pb-20 overflow-hidden">
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="md:col-span-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sun className="text-terracotta w-6 h-6 animate-[spin_10s_linear_infinite]" />
                <span className="font-hand text-2xl text-coastal-blue font-bold">
                  Currently working on projects or on a hike in the middle of nowhere.
                </span>
              </div>
              <h1 className="font-heading text-6xl md:text-8xl text-on-surface mb-6 leading-tight">
                NASAR <span className="text-terracotta">SIDDIQUI</span>
              </h1>
              <p className="font-body text-2xl md:text-3xl text-on-surface/90 max-w-2xl leading-relaxed mb-8">
                CS & Philosophy student at{' '}
                <span className="wavy-underline">USask</span> building ML and
                backend systems for real-world problems.
              </p>
              <div className="flex gap-4">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  className="p-4 bg-sand/30 organic-border inline-block rotate-[-2deg] transition-all cursor-crosshair"
                >
                  <span className="font-hand text-xl text-on-surface">
                    "Simple things should be simple, complex things should be possible - Alan Kay"
                  </span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
              className="md:col-span-5 relative mt-12 md:mt-0"
            >
              <div className="relative w-full aspect-square max-w-[400px] mx-auto group">
                <div className="absolute inset-0 bg-sea-foam/20 sketch-mask -rotate-6 animate-float transition-all group-hover:rotate-0"></div>
                <div className="absolute inset-0 bg-terracotta/10 sketch-mask rotate-12 scale-95 transition-all group-hover:rotate-0"></div>
                <img
                  alt="Atmospheric seaside landscape"
                  className="absolute inset-0 w-full h-full object-cover sketch-mask border-8 border-shell-white shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-2"
                  src={mountainImage}
                />
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24 flex flex-col md:flex-row justify-between items-start md:items-end border-t-2 border-terracotta/10 pt-10"
          >
            <div className="mb-6 md:mb-0">
              <span className="font-heading text-xs uppercase tracking-widest text-terracotta font-bold block mb-1">
                LOCATION
              </span>
              <span className="font-hand text-3xl">
                Saskatoon, Saskatchewan
              </span>
            </div>
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() =>
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span className="font-heading text-sm font-bold text-coastal-blue group-hover:text-terracotta transition-colors">
                Scroll down
              </span>
              <ArrowDown className="text-terracotta animate-bounce w-5 h-5 group-hover:text-coastal-blue transition-colors" />
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-section-gap px-6 md:px-12 max-w-[1280px] mx-auto">
          <motion.div
            {...fadeInUp}
            className="flex flex-col items-center mb-24 text-center"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-on-surface mb-4">
              Projects
            </h2>
            <div className="h-1 w-24 bg-terracotta rounded-full"></div>
            <p className="font-hand text-2xl text-coastal-blue mt-4">
              Highlights
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-x-12">
            <motion.div
              {...fadeInUp}
              layoutId="project-1"
              className="md:col-span-6 overlap-card cursor-pointer group"
              onClick={() => setSelectedProject({
                id: '1',
                title: 'Continually Updating EI Guidance Model',
                category: '01. Continual Learning / Model Training',
                image: 'https://images.unsplash.com/photo-1531289136127-ea1d7b613ce2?auto=format&fit=crop&q=80&w=1000',
                description: 'A continual-learning language model for Employment Insurance guidance, designed to adapt to changing policy snapshots, retain historical knowledge, and answer date-specific claimant scenarios without requiring complete retraining.',
                github: true
              })}
            >
              <div className="aspect-[4/3] overflow-hidden organic-border bg-white shadow-xl rotate-[-1deg]">
                <img
                  alt="Tech infrastructure"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  src="https://images.unsplash.com/photo-1531289136127-ea1d7b613ce2?auto=format&fit=crop&q=80&w=1000"
                />
              </div>
              <div className="mt-6 pl-4 transition-transform group-hover:translate-x-2">
                <span className="font-hand text-xl text-terracotta">
                  01. Continual Learning / Model Training
                </span>
                <h3 className="font-heading text-2xl mt-1 text-on-surface flex items-center gap-2">
                  Continually Updating EI Guidance Model
                  <ArrowUpRight className="w-5 h-5 text-terracotta" />
                </h3>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              layoutId="project-2"
              className="md:col-span-5 md:col-start-8 mt-12 md:mt-32 overlap-card cursor-pointer group"
              onClick={() => setSelectedProject({
                id: '2',
                title: 'Encrypted Inference Gateway',
                category: '02. Machine Learning Infrastructure',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
                description: 'A highly scalable layer-7 load balancer implemented in Rust. Features dynamic algorithmic routing, health checking via custom probes, and seamless integration with Kubernetes ingress controllers. Built to handle tidal waves of incoming requests with minimal latency.',
                github: true,
                githubUrl: 'https://github.com/argravee/privacy-preserving-inference-gateway'
              })}
            >
              <div className="aspect-[3/4] overflow-hidden organic-border bg-white shadow-xl rotate-[2deg]">
                <img
                  alt="Cyber network infrastructure"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
                />
              </div>
              <div className="mt-6 text-right pr-4 transition-transform group-hover:-translate-x-2">
                <span className="font-hand text-xl text-sea-foam">
                  02. Machine Learning Infrastructure
                </span>
                <h3 className="font-heading text-2xl mt-1 text-on-surface flex items-center justify-end gap-2">
                  <ArrowUpRight className="w-5 h-5 text-sea-foam" />
                  Encrypted Inference Gateway
                </h3>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              layoutId="project-3"
              className="md:col-span-5 mt-[-20px] md:mt-[-100px] overlap-card cursor-pointer group"
              onClick={() => setSelectedProject({
                id: '3',
                title: 'Sunny and Safe Saskatchewan',
                category: '04. Full-stack Website',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
                description: 'A comprehensive full-stack website designed to track and display localized weather, safety advisories, and resources for Saskatchewan residents.',
                github: true
              })}
            >
              <div className="aspect-square overflow-hidden organic-border bg-white shadow-xl rotate-[3deg]">
                <img
                  alt="Mobile application analytics"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                />
              </div>
              <div className="mt-6 pl-4 transition-transform group-hover:translate-x-2">
                <span className="font-hand text-xl text-coastal-blue">
                  04. Full-stack Website
                </span>
                <h3 className="font-heading text-2xl mt-1 text-on-surface flex items-center gap-2">
                  Sunny and Safe Saskatchewan
                  <ArrowUpRight className="w-5 h-5 text-coastal-blue" />
                </h3>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              layoutId="project-4"
              className="md:col-span-7 md:col-start-6 overlap-card cursor-pointer group"
              onClick={() => setSelectedProject({
                id: '4',
                title: 'Civic Voice',
                category: '03. Full-Stack Mobile Application',
                image: sasWebsiteImage,
                description: 'A lightweight, high-throughput mobile application designed for community engagement and civic voice amplification leveraging modern framework stacks.',
                github: true
              })}
            >
              <div className="aspect-[16/9] overflow-hidden organic-border bg-white shadow-xl rotate-[-2deg]">
                <img
                  alt="Mountains and sun"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  src={sasWebsiteImage}
                />
              </div>
              <div className="mt-6 md:text-right pr-4 transition-transform group-hover:-translate-x-2">
                <span className="font-hand text-xl text-terracotta">
                  03. Full-Stack Mobile Application
                </span>
                <h3 className="font-heading text-2xl mt-1 text-on-surface flex md:justify-end items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-terracotta" />
                  Civic Voice
                </h3>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="stack" className="py-section-gap relative overflow-hidden bg-sand/10">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute -left-10 md:-left-10 top-20 text-terracotta/5 select-none font-heading text-7xl md:text-9xl pointer-events-none"
          >
            DATA
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute -right-4 md:-right-10 bottom-20 text-sea-foam/5 select-none font-heading text-7xl md:text-9xl pointer-events-none"
          >
            SKILLS
          </motion.div>

          <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <motion.div
                {...fadeInUp}
                className="md:col-span-4 md:sticky md:top-32"
              >
                <h2 className="font-heading text-4xl mb-6 text-on-surface">
                  Core <br />
                  <span className="text-terracotta">Stack</span>
                </h2>
                <div className="mt-8 flex gap-4">
                  <motion.div whileHover={{ y: -5, rotate: 10 }}>
                    <Terminal className="w-8 h-8 text-sea-foam" />
                  </motion.div>
                  <motion.div whileHover={{ y: -5, rotate: -10 }}>
                    <Database className="w-8 h-8 text-terracotta" />
                  </motion.div>
                  <motion.div whileHover={{ y: -5, rotate: 10 }}>
                    <Cpu className="w-8 h-8 text-coastal-blue" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: '-100px' }}
                className="md:col-span-7 md:col-start-6 space-y-12"
              >
                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 50 },
                    whileInView: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-shell-white/50 organic-border shadow-sm hover:shadow-xl transition-shadow cursor-default"
                >
                  <span className="font-hand text-2xl text-terracotta block mb-2">
                    01
                  </span>
                  <h3 className="font-heading text-2xl mb-4 text-on-surface">
                    Machine Learning
                  </h3>
                  <p className="font-body text-lg text-on-surface/70 leading-relaxed font-semibold">
                    PyTorch, scikit-learn, NumPy
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 50 },
                    whileInView: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-shell-white/50 organic-border shadow-sm hover:shadow-xl transition-shadow cursor-default"
                >
                  <span className="font-hand text-2xl text-sea-foam block mb-2">
                    02
                  </span>
                  <h3 className="font-heading text-2xl mb-4 text-on-surface">
                    Backend
                  </h3>
                  <p className="font-body text-lg text-on-surface/70 leading-relaxed font-semibold">
                    FastAPI, Flask, REST APIs, MySQL, Docker, GitHub Actions
                  </p>
                </motion.div>

                <motion.div
                  variants={{
                    initial: { opacity: 0, x: 50 },
                    whileInView: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-shell-white/50 organic-border shadow-sm hover:shadow-xl transition-shadow cursor-default"
                >
                  <span className="font-hand text-2xl text-coastal-blue block mb-2">
                    03
                  </span>
                  <h3 className="font-heading text-2xl mb-4 text-on-surface">
                    Fullstack
                  </h3>
                  <p className="font-body text-lg text-on-surface/70 leading-relaxed font-semibold">
                    JS, TS, React, Tailwind, SQL
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-section-gap px-4 sm:px-6 md:px-12 w-full max-w-[1280px] mx-auto text-center flex flex-col items-center">
          <motion.div
            {...fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-3xl p-8 sm:p-12 bg-terracotta/5 organic-border relative group flex flex-col items-center"
          >
            <motion.div
              animate={{ rotate: [-12, -5, -12] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 bg-sand p-3 rounded-xl shadow-sm z-10"
            >
              <Mail className="w-6 h-6 text-terracotta" />
            </motion.div>
            <h2 className="font-heading text-4xl mt-2 md:text-5xl mb-6 sm:mb-8 text-on-surface">
              Get In Touch
            </h2>
            <p className="font-hand text-xl sm:text-2xl text-coastal-blue mb-8 sm:mb-10 px-4">
              Available for internships, freelance projects, and collaborations.
            </p>
            <div className="flex flex-col items-center gap-6 w-full">
              <a
                className="text-xl sm:text-2xl md:text-3xl font-heading text-terracotta hover:text-on-surface transition-colors inline-block break-all sm:break-normal px-4"
                href="mailto:nasar.siddi@gmail.com"
              >
                nasar.siddi@gmail.com
              </a>
              <a
                className="flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-heading text-coastal-blue hover:text-terracotta transition-colors"
                href="https://www.linkedin.com/in/muhammad-nasar-siddiqui/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
