/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode, FormEvent } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Download, 
  ChevronUp, 
  Menu, 
  X, 
  Code, 
  Trophy, 
  BookOpen, 
  User, 
  Send,
  Cpu,
  Globe,
  Award,
  Terminal,
  Layers,
  Users,
  Instagram,
  Star,
  Sparkles,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image: string;
}

interface Achievement {
  title: string;
  organization: string;
  date: string;
  icon: ReactNode;
}

interface Skill {
  name: string;
  level: number;
  category: 'Technical' | 'Soft';
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "Kaniha Medical App",
    description: "A full-stack mobile application that helps users to book slot and get ticket for trement.",
    tech: ["React Native", "Node.js", "MongoDB", "Firebase"],
    github: "https://github.com/santoshmishras951-coder",
    demo: "https://santoshmishras951-1774416949283.atlassian.net/wiki/spaces/~71202056a8fc3de06d4741bb7c4b9bc8a8033d/pages/edit-v2/66022?draftShareId=17427745-0a41-4148-a092-8a0f2c8171a1&createdWithTemplate=true",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT993mjXXz-a04PdbWhVgSAFWLZ6XkFgBwnPw&s"
  },
  {
    title: "Task Manger",
    description: "It basically uses CRUD operation and perform all tasks like Delete,Update,Create,Read data.",
    tech: ["Python", "OpenAI API", "React", "Tailwind"],
    github: "https://github.com/santoshmishras951-coder",
    demo: "https://santoshmishras951-1774416949283.atlassian.net/wiki/spaces/~71202056a8fc3de06d4741bb7c4b9bc8a8033d/pages/edit-v2/66022?draftShareId=17427745-0a41-4148-a092-8a0f2c8171a1&createdWithTemplate=true",
    image: "https://images-platform.99static.com/8mc2pZDV0s_nXHMZOF--H-QhZzY=/500x500/top/smart/99designs-contests-attachments/20/20319/attachment_20319607"
  },
  
];

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "1st Place - University Hackathon",
    organization: "TechFest 2025",
    date: "March 2025",
    icon: <Trophy className="w-6 h-6 text-accent" />
  },
  {
    title: "Google Cloud Certification",
    organization: "Google Cloud",
    date: "January 2025",
    icon: <Award className="w-6 h-6 text-secondary" />
  },
  {
    title: "Dean's Honor List",
    organization: "Computer Science Dept.",
    date: "2023 - 2024",
    icon: <BookOpen className="w-6 h-6 text-primary" />
  }
];

const SKILLS: Skill[] = [
  { name: "HTML/CSS", level: 95, category: "Technical" },
  { name: "JavaScript", level: 90, category: "Technical" },
  { name: "React", level: 85, category: "Technical" },
  { name: "Python", level: 80, category: "Technical" },
  { name: "Java", level: 75, category: "Technical" },
  { name: "C++", level: 70, category: "Technical" },
  { name: "Communication", level: 90, category: "Soft" },
  { name: "Teamwork", level: 95, category: "Soft" },
  { name: "Problem Solving", level: 85, category: "Soft" }
];

const EDUCATION: Education[] = [

   {
    degree: "Council of Higher Secondary School",
    institution: "Kiit Higher Secondary School",
    year: "2022 - 2024",
    description: "Major in Science and Mathematics. Graduated with 95% aggregate."
  },
  {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Gandhi Engineering College",
    year: "2024 - 2028",
    description: "Focusing on Software Engineering, Data Structures, and Artificial Intelligence. Current GPA: 8.34/10"
  },
 
];

// --- Components ---

const TypingEffect = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedText("");
        setIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <span>{displayedText}<span className="animate-pulse">|</span></span>;
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-display font-bold mb-6 gradient-text-mix animate-gradient-x drop-shadow-sm"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 120, opacity: 1 }}
      viewport={{ once: true }}
      className="h-2 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
    />
  </div>
);

const ThankYou = ({ name, onBack }: { name: string; onBack: () => void }) => {
  const rewards = [Star, Trophy, Award, Heart, Sparkles];
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 text-center gradient-bg relative overflow-hidden">
      {/* Dynamic Animated Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Falling Rewards Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(40)].map((_, i) => {
          const Icon = rewards[i % rewards.length];
          const size = Math.random() * 20 + 15;
          const duration = Math.random() * 6 + 4;
          const delay = Math.random() * 8;
          const left = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                y: -100,
                x: `${left}%`,
                rotate: 0
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [null, window.innerHeight + 100],
                rotate: [0, 720 * (Math.random() > 0.5 ? 1 : -1)]
              }}
              transition={{ 
                duration: duration, 
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
              className="absolute drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]"
              style={{ color: i % 3 === 0 ? '#8B5CF6' : i % 3 === 1 ? '#06B6D4' : '#EC4899' }}
            >
              <Icon size={size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 25 
        }}
        className="relative group w-full max-w-2xl z-20"
      >
        {/* Colorful Glow Background for the Box */}
        <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-primary via-secondary to-accent rounded-[3rem] sm:rounded-[4rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
        
        <div className="glass p-8 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[3.5rem] w-full shadow-2xl relative z-10 border border-white/20 bg-gradient-to-br from-white/15 via-white/5 to-transparent backdrop-blur-2xl overflow-hidden">
          {/* Internal Animated Beam */}
          <motion.div 
            animate={{ 
              x: ['-100%', '200%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] pointer-events-none"
          />

          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-8 sm:mb-10 shadow-2xl shadow-primary/40 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
            <motion.div
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: [0, 15, -15, 0]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              <Send className="text-white w-10 h-10 sm:w-12 sm:h-12" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl sm:text-6xl md:text-8xl font-display font-black mb-4 sm:mb-6 tracking-tighter leading-none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x drop-shadow-sm">
              THANK YOU
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-tight">
              {name}
            </p>
            <p className="text-base sm:text-xl md:text-2xl text-white/80 mb-8 sm:mb-12 font-medium tracking-wide px-4">
              Santosh <span className="text-primary font-bold drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]">will</span> connect with you soon.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={onBack}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)",
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl sm:rounded-2xl transition-all font-black text-lg sm:text-xl text-white shadow-xl shadow-primary/20 border border-white/10"
          >
            Back to Portfolio
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const InitialRewardsAnimation = () => {
  const rewards = [Star, Trophy, Award, Heart, Sparkles];
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 overflow-hidden pointer-events-none z-[9999] bg-dark/20 backdrop-blur-[2px]"
    >
      {[...Array(120)].map((_, i) => {
        const Icon = rewards[i % rewards.length];
        const size = Math.random() * 25 + 15;
        const left = Math.random() * 100;
        const delay = Math.random() * 1.5;
        const duration = 2.5 + Math.random();
        
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: -100,
              x: `${left}%`,
              rotate: 0,
              scale: 0.5
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000, -100],
              rotate: [0, 360, 720],
              scale: [0.5, 1.2, 0.8],
              x: [`${left}%`, `${left + (Math.random() * 10 - 5)}%`, `${left}%`]
            }}
            transition={{ 
              duration: duration, 
              repeat: 0,
              delay: delay,
              ease: "easeInOut"
            }}
            className="absolute drop-shadow-[0_0_20px_rgba(139,92,246,0.9)]"
            style={{ color: i % 4 === 0 ? '#8B5CF6' : i % 4 === 1 ? '#06B6D4' : i % 4 === 2 ? '#EC4899' : '#F59E0B' }}
          >
            <Icon size={size} strokeWidth={2} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null; message: string }>({ type: null, message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 5000); // Increased to match the 1.5s delay + 3.5s duration
    return () => clearTimeout(timer);
  }, []);

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const currentName = formData.name;
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmittedName(currentName);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({ type: null, message: '' });
        window.scrollTo(0, 0);
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    }
  };
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      const sections = ['home', 'about', 'achievements', 'skills', 'projects', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Education', id: 'education' },
    { name: 'Contact', id: 'contact' },
  ];

  if (isSubmitted) {
    return <ThankYou name={submittedName} onBack={() => setIsSubmitted(false)} />;
  }

  return (
    <div className="min-h-screen gradient-bg selection:bg-primary/30 selection:text-white relative overflow-hidden">
      <AnimatePresence>
        {showInitialAnimation && <InitialRewardsAnimation />}
      </AnimatePresence>
      {/* Global Animated Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-pink/10 rounded-full blur-[80px]"
        />
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <a href="#home" className="text-2xl sm:text-3xl font-display font-black tracking-tighter gradient-text-mix">
                PORTFOLIO
              </a>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1 lg:space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative group ${
                      activeSection === link.id ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {activeSection === link.id && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl -z-10 border border-white/10"
                      />
                    )}
                    <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-white/70 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/5 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      activeSection === link.id ? 'text-primary bg-white/5' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
              >
                <span className="text-secondary font-display text-xs sm:text-sm font-black tracking-[0.2em] uppercase">
                  Welcome to my world
                </span>
              </motion.div>
              
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black mb-6 tracking-tighter leading-[0.9]">
                Hi, I'm <br className="sm:hidden" />
                <span className="gradient-text-mix drop-shadow-2xl">Santosh Mishra</span>
              </h1>
              
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white/90 mb-8 min-h-[3rem] flex items-center justify-center lg:justify-start">
                I'm a&nbsp;<TypingEffect text="Computer Science Student" />
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Passionate about building innovative software solutions that solve real-world problems. 
                Currently exploring the intersection of <span className="text-primary font-bold">AI</span> and <span className="text-secondary font-bold">Web Development</span>.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects" 
                  className="px-10 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all"
                >
                  View Projects
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="px-10 py-4 glass rounded-2xl font-black text-lg border border-white/10 transition-all"
                >
                  Contact Me
                </motion.a>
              </div>
              
              <div className="mt-12 flex justify-center lg:justify-start gap-4 sm:gap-6">
                {[
                  { icon: <Github />, href: "https://github.com/santoshmishras951-coder" },
                  { icon: <Linkedin />, href: "https://www.linkedin.com/in/santosh-mishra-499b86331/" },
                  { icon: <Instagram />, href: "https://www.instagram.com/" },
                  { icon: <Mail />, href: "mailto:santoshmishras951@gmail.com" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5, color: "#8b5cf6" }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 glass rounded-2xl hover:border-primary/50 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-80 sm:w-80 sm:h-[28rem] md:w-[32rem] md:h-[36rem] lg:w-[30rem] lg:h-[34rem] xl:w-[34rem] xl:h-[38rem]">
                {/* Decorative Elements - Mix Color Glows */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-primary/10 via-pink/10 to-accent/10 rounded-[4rem] blur-2xl opacity-50" />
                
                {/* Main Photo Container with Gradient Border */}
                <div className="relative w-full h-full p-1 bg-gradient-to-br from-primary via-secondary to-accent rounded-[3.5rem] shadow-2xl group">
                  <div className="w-full h-full glass rounded-[3.2rem] p-3 border-none overflow-hidden relative">
                    {/* Internal Animated Beam */}
                    <motion.div 
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] z-10 pointer-events-none"
                    />
                    
                    <div className="w-full h-full rounded-[2.8rem] overflow-hidden relative">
                      <img 
                        src="WhatsApp Image 2026-03-16 at 7.52.09 PM.jpeg" 
                        alt="Santosh Mishra" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                        <p className="text-white font-display font-bold text-xl tracking-tight">Santosh Mishra</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badges with enhanced mix color styling */}
                <motion.div 
                  animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass p-5 rounded-3xl flex items-center gap-4 shadow-2xl border-white/20 z-20 backdrop-blur-2xl"
                >
                  <div className="p-3 bg-gradient-to-br from-accent/40 to-orange/40 rounded-2xl shadow-lg"><Cpu className="text-white w-6 h-6" /></div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black">Expertise</p>
                    <p className="text-sm sm:text-base font-display font-black gradient-text">AI & Web</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 glass p-5 rounded-3xl flex items-center gap-4 shadow-2xl border-white/20 z-20 backdrop-blur-2xl"
                >
                  <div className="p-3 bg-gradient-to-br from-secondary/40 to-primary/40 rounded-2xl shadow-lg"><Globe className="text-white w-6 h-6" /></div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-black">Location</p>
                    <p className="text-sm sm:text-base font-display font-black gradient-text">India</p>
                  </div>
                </motion.div>

                {/* Experience Badge */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-12 -right-10 glass px-8 py-4 rounded-2xl border-white/20 shadow-2xl z-20 hidden md:block backdrop-blur-2xl"
                >
                  <p className="text-sm font-black gradient-text-mix tracking-tight">B.Tech Student</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />

          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
              title="About Me" 
              subtitle="Get to know me better - my journey, my goals, and what drives me as a developer."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                  I'm a curious developer who loves <span className="gradient-text-mix animate-gradient-x">learning new things.</span>
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  I started my coding journey three years ago when I built my first simple website. Since then, I've been fascinated by how technology can be used to create impactful solutions. 
                </p>
                <p className="text-white/70 text-lg leading-relaxed">
                  My goal is to become a Full Stack Engineer with a strong foundation in Machine Learning. I enjoy participating in hackathons, contributing to open-source projects, and collaborating with diverse teams.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                  <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                    <h4 className="text-primary font-bold text-2xl mb-1 group-hover:glow transition-all">3.9</h4>
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-[0.2em]">GPA</p>
                  </div>
                  <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                    <h4 className="text-secondary font-bold text-2xl mb-1 group-hover:glow-secondary transition-all">15+</h4>
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-[0.2em]">Projects</p>
                  </div>
                  <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                    <h4 className="text-accent font-bold text-2xl mb-1 group-hover:glow transition-all">10+</h4>
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-[0.2em]">Certificates</p>
                  </div>
                  <div className="glass-card p-6 text-center group hover:scale-105 transition-transform">
                    <h4 className="text-primary font-bold text-2xl mb-1 group-hover:glow transition-all">500+</h4>
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-[0.2em]">LeetCode</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-8"
              >
                <div className="glass-card p-10 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                    <BookOpen size={160} />
                  </div>
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <User className="text-primary" size={24} />
                    </div>
                    Interests
                  </h4>
                  <ul className="space-y-4 text-white/80 text-lg">
                    <li className="flex items-center gap-3 group/item">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover/item:scale-150 transition-transform" /> 
                      Artificial Intelligence
                    </li>
                    <li className="flex items-center gap-3 group/item">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover/item:scale-150 transition-transform" /> 
                      Web Technologies
                    </li>
                    <li className="flex items-center gap-3 group/item">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover/item:scale-150 transition-transform" /> 
                      UI/UX Design
                    </li>
                    <li className="flex items-center gap-3 group/item">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover/item:scale-150 transition-transform" /> 
                      Competitive Programming
                    </li>
                  </ul>
                </div>
                
                <div className="glass-card p-10 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">
                    <Trophy size={160} />
                  </div>
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-lg">
                      <Award className="text-secondary" size={24} />
                    </div>
                    Goals
                  </h4>
                  <p className="text-white/80 text-lg leading-relaxed">
                    To build scalable applications that improve people's lives and to contribute to the global tech community through innovation and mentorship.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-32 px-4 sm:px-6 lg:px-8 bg-dark/50 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="Achievements" 
              subtitle="Milestones and recognitions I've earned throughout my academic and professional journey."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {ACHIEVEMENTS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-10 hover:bg-white/10 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="mb-8 p-5 bg-white/5 rounded-2xl w-fit group-hover:scale-110 group-hover:bg-primary/10 transition-all shadow-lg">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-white/70 text-base mb-6">{item.organization}</p>
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <span className="text-sm text-white/40 font-mono font-medium tracking-wider">{item.date}</span>
                    <button className="p-2 bg-white/5 rounded-full text-primary hover:text-white hover:bg-primary transition-all">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="My Skills" 
              subtitle="A comprehensive list of my technical expertise and professional soft skills."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Technical Skills */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <Terminal className="text-primary" size={28} />
                  </div>
                  Technical Expertise
                </h3>
                <div className="space-y-10">
                  {SKILLS.filter(s => s.category === 'Technical').map((skill, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between mb-3">
                        <span className="font-bold text-lg group-hover:text-primary transition-colors">{skill.name}</span>
                        <span className="text-white/60 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden p-[2px] border border-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Soft Skills */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <Users className="text-secondary" size={28} />
                  </div>
                  Soft Skills
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {SKILLS.filter(s => s.category === 'Soft').map((skill, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden group"
                    >
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-secondary/5 rounded-full blur-xl group-hover:bg-secondary/10 transition-all" />
                      
                      <div className="w-20 h-20 rounded-full border-4 border-secondary/20 flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 rounded-full border-4 border-secondary border-t-transparent animate-spin-slow opacity-30" />
                        <span className="text-xl font-bold gradient-text-mix">{skill.level}%</span>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{skill.name}</h4>
                      <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.2em]">Proficiency</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-16 glass-card p-10 border-dashed border-white/20 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <Layers className="text-accent" size={20} />
                    </div>
                    Other Tools
                  </h4>
                  <div className="flex flex-wrap gap-4 relative z-10">
                    {['Git', 'Docker', 'Figma', 'VS Code', 'Postman', 'Vercel', 'AWS', 'Linux'].map((tool) => (
                      <span key={tool} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 hover:border-primary/30 hover:text-primary transition-all cursor-default">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-dark/50 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading 
              title="Featured Projects" 
              subtitle="A selection of my recent work, showcasing my skills in development and design."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -12 }}
                  className="glass-card rounded-[2.5rem] overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 bg-black/40 backdrop-blur-md text-white border border-white/10 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-10">
                    <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{project.title}</h4>
                    <p className="text-white/70 text-base mb-8 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex gap-4">
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-primary/10 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all text-sm font-bold shadow-lg shadow-primary/5"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 text-white rounded-2xl hover:bg-white/10 transition-all text-sm font-bold border border-white/5"
                      >
                        <Github size={18} /> GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="Education" 
              subtitle="My academic background and the foundations of my technical knowledge."
            />
            <div className="max-w-4xl mx-auto space-y-16 relative">
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent opacity-20 hidden md:block" />
              
              {EDUCATION.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:ml-0' : 'md:pl-16 md:ml-auto'}`}
                >
                  <div className={`absolute top-8 w-6 h-6 rounded-full bg-dark border-4 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.6)] z-10 hidden md:block ${index % 2 === 0 ? '-right-3' : '-left-3'}`} />
                  
                  <div className="glass-card p-10 hover:border-primary/20 transition-all group">
                    <div className="flex flex-col mb-6 gap-4">
                      <span className="w-fit px-5 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-widest uppercase border border-primary/20">
                        {edu.year}
                      </span>
                      <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">{edu.degree}</h4>
                    </div>
                    <h5 className="text-secondary font-bold text-lg mb-6 flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      {edu.institution}
                    </h5>
                    <p className="text-white/70 text-lg leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-16 md:p-24 rounded-[4rem] text-center relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 relative z-10">
                Ready to <span className="gradient-text-mix animate-gradient-x">work together?</span>
              </h2>
              <p className="text-white/70 mb-12 text-xl max-w-2xl mx-auto leading-relaxed relative z-10">
                Download my full resume to see a detailed breakdown of my experience, skills, and certifications.
              </p>
              <motion.a 
                href="/resume.jpg"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-full font-bold text-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all relative z-10 group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <Download size={28} className="relative z-10" /> 
                <span className="relative z-10">Download Resume</span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <SectionHeading 
              title="Get In Touch" 
              subtitle="Have a project in mind or just want to say hi? Feel free to reach out!"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-16"
              >
                <div>
                  <h3 className="text-4xl font-display font-bold mb-8 leading-tight">
                    Let's talk about <span className="gradient-text-mix animate-gradient-x">everything!</span>
                  </h3>
                  <p className="text-white/70 text-xl leading-relaxed">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="flex items-center gap-8 group">
                    <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all shadow-lg">
                      <Mail size={32} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Email Me</p>
                      <p className="text-2xl font-bold group-hover:text-primary transition-colors">santoshmishras951@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 group">
                    <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary/20 group-hover:scale-110 transition-all shadow-lg">
                      <Phone size={32} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Call Me</p>
                      <p className="text-2xl font-bold group-hover:text-secondary transition-colors">+91 9668139559</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 group">
                    <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-110 transition-all shadow-lg">
                      <MapPin size={32} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase font-bold tracking-[0.2em] mb-1">Location</p>
                      <p className="text-2xl font-bold group-hover:text-accent transition-colors">India (Bhubaneswar)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <p className="text-xs text-white/40 uppercase font-bold tracking-[0.2em] mb-8">Follow Me</p>
                  <div className="flex flex-wrap gap-5">
                    {[
                      { name: 'Github', url: 'https://github.com/santoshmishras951-coder', color: 'primary' },
                      { name: 'Linkedin', url: 'https://www.linkedin.com/in/santosh-mishra-499b86331/', color: 'secondary' },
                      { name: 'Twitter', url: '#', color: 'accent' },
                      { name: 'Instagram', url: 'https://www.instagram.com/', color: 'primary' }
                    ].map((social) => (
                      <motion.a 
                        key={social.name} 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="px-8 py-4 glass-card rounded-2xl hover:bg-white/10 transition-all font-bold text-lg border border-white/5 hover:border-primary/30"
                      >
                        {social.name}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-12 md:p-16 rounded-[3rem] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/10 transition-all" />
                
                <form className="space-y-8 relative z-10" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-white/60 ml-2 uppercase tracking-widest">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-white/60 ml-2 uppercase tracking-widest">Your Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white/60 ml-2 uppercase tracking-widest">Subject</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-white/60 ml-2 uppercase tracking-widest">Message</label>
                    <textarea 
                      rows={6}
                      required
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none text-lg"
                    />
                  </div>
                  
                  {status.type && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 rounded-2xl text-base font-bold text-center ${
                        status.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                        status.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                        'bg-white/5 text-white/60 border border-white/10'
                      }`}
                    >
                      {status.message}
                    </motion.div>
                  )}

                  <motion.button 
                    type="submit"
                    disabled={status.type === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl font-bold text-xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all flex items-center justify-center gap-4 shadow-xl shadow-primary/10 disabled:opacity-50 group/submit overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/submit:translate-y-0 transition-transform duration-300" />
                    {status.type === 'loading' ? (
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin relative z-10" />
                    ) : (
                      <><Send size={24} className="relative z-10" /> <span className="relative z-10">Send Message</span></>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-display font-bold gradient-text mb-4 block">
              PORTFOLIO
            </a>
            <p className="text-white/40 text-sm max-w-xs">
              Building the future, one line of code at a time. Designed with love and passion.
            </p>
          </div>
          
          <div className="flex gap-8">
            {navLinks.slice(0, 4).map((link) => (
              <a key={link.id} href={`#${link.id}`} className="text-sm text-white/60 hover:text-primary transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm mb-4">© 2026 Santosh Mishra. All rights reserved.</p>
            <div className="flex justify-center md:justify-end gap-4">
              <a href="https://github.com/santoshmishras951-coder" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/santosh-mishra-499b86331/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="mailto:santoshmishras951@gmail.com" className="text-white/40 hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 bg-primary rounded-full shadow-2xl shadow-primary/40 z-[60] hover:bg-primary/80 transition-all"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
