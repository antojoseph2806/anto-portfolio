import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Code2, Zap } from 'lucide-react';

// Scroll-triggered section component
const ScrollSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Project Card with Parallax
const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -12, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/50 h-full"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden h-56">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
          
          {/* Hover Overlay with Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex space-x-4">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white transition-colors shadow-xl"
                >
                  <Github size={24} className="text-gray-900" />
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-white transition-colors shadow-xl"
                >
                  <ExternalLink size={24} className="text-gray-900" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Project Number Badge */}
          <div className="absolute top-4 left-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30"
            >
              <span className="text-white font-bold text-lg">#{index + 1}</span>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <motion.h3 
            className="text-xl font-bold text-gray-900 mb-3 line-clamp-1"
            animate={{ color: isHovered ? '#3b82f6' : '#111827' }}
          >
            {project.title}
          </motion.h3>
          
          <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-blue-700 rounded-lg text-xs font-medium"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef(null);
  
  // Parallax scroll effects for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  const projects = [
    {
      id: 1,
      title: 'Car Rental System',
      description:
        'A full-stack web application that streamlines the car rental process. Built with HTML, CSS, and JavaScript on the frontend, featuring interactive UI and Toastify alerts for real-time feedback. The backend is powered by Node.js, with MongoDB handling data storage for users, bookings, and vehicles.',
      image: 'c.jpg',
      technologies: ['HTML','JavaScript','Node.js','CSS', 'Express.js', 'MongoDB'],
      live: 'https://ajmcars.netlify.app/',
    },
    {
      id: 2,
      title: 'Room Booking System',
      description:
        'A backend-focused application for managing room reservations, built with Node.js and MongoDB. This project handles booking logic, room availability, and user data purely through APIs—no frontend interface included. Ideal for integration with web or mobile platforms.',
      image: 'r.jpg',
      technologies: ['Node.js', 'Express.js', 'MongoDB','PostMan'],
      github: 'https://github.com/antojoseph2806/room-booking-backend-nodejs',
    },
    {
      id: 3,
      title: 'Pneumonia Detection System',
      description:
        'A web-based diagnostic tool that leverages machine learning (CNN model) to detect pneumonia from chest X-ray images. Built with HTML, CSS, JavaScript, and Bootstrap on the frontend, and Python Django on the backend, the system uses a SQLite database and a dataset sourced from Kaggle.',
      image: 'p.jpg',
      technologies: ['Python', 'Django', 'SQLite','HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/antojoseph2806/pneumonia-detection-system',
    },
    {
      id: 4,
      title: 'Personal Portfolio Website',
      description:
        'A modern, responsive, and interactive portfolio website designed and developed to showcase my skills, projects, and experiences as a Full Stack Web Developer. Built using React.js for dynamic component-based rendering, along with JavaScript for interactivity and CSS for styling.',
      image: 'port.png',
      technologies: ['React.js', 'Tailwind CSS', 'JavaScript','Framer Motion'],
      live: 'https://antojoseph.vercel.app/',
    },
    {
      id: 5,
      title: 'Live Science Quiz Web App',
      description:
        'The Live Science Quiz Web App is a fully responsive, interactive quiz application built using HTML, CSS, and JavaScript. It provides a smooth and engaging user experience with real-time quiz functionalities, payment integration, and automatic certificate generation.',
      image: 'quiz.webp',
      technologies: ['HTML5','JavaScript', 'Razorpay', 'Trivia API','CSS'],
      live: 'https://quiz-app-beta-roan.vercel.app/',
    },
    {
      id: 6,
      title: 'Real-Time IoT Security System',
      description:
        'Designed and developed a real-time IoT security monitoring system using ESP32, proximity, and sound sensors. Built a live dashboard with Node.js and Socket.IO to enable low-latency event streaming, real-time intrusion detection, and continuous monitoring through WebSocket-based communication.',
      image: 'i.jpg',
      technologies: ['ESP32', 'Node.js', 'Socket.IO', 'WebSockets', 'JavaScript', 'IoT Sensors'],
      github: 'https://github.com/antojoseph2806/iot-security-system'
    }
  ];

  const stats = [
    { icon: Code2, label: 'Projects Completed', value: '15+' },
    { icon: Zap, label: 'Technologies Used', value: '20+' },
    { icon: Github, label: 'GitHub Repos', value: '30+' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 overflow-hidden relative">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* Header Section */}
        <ScrollSection>
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              A showcase of my creative work and technical expertise across web development, IoT systems, and innovative solutions.
            </motion.p>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"
            />
          </div>
        </ScrollSection>

        {/* Stats Section */}
        <ScrollSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <Icon className="text-white" size={28} />
                  </motion.div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </ScrollSection>

        {/* Projects Grid */}
        <ScrollSection delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </ScrollSection>

        {/* Call to Action */}
        <ScrollSection delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 sm:p-12 text-center shadow-2xl"
          >
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Interested in Working Together?
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            >
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </motion.p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </ScrollSection>

      </div>
    </div>
  );
};

export default Projects;
