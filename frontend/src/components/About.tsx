import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Code, Palette, BrainCircuit, Server, Sparkles, Rocket, Lightbulb, Heart, Target, CheckCircle2 } from 'lucide-react';

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

// Parallax Image Component
const ParallaxImage: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      
      <motion.div 
        style={{ rotate }}
        className="relative"
      >
        <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
          <motion.img
            src="Anto.png"
            alt="Anto Joseph"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  
  // Parallax scroll effects for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  const interests = [
    { 
      icon: Code, 
      title: 'Clean Code', 
      description: 'Writing maintainable, scalable code with best practices',
      gradient: 'from-emerald-500 to-cyan-500'
    },
    { 
      icon: Palette, 
      title: 'Design', 
      description: 'Creating beautiful, intuitive user experiences',
      gradient: 'from-violet-500 to-purple-600'
    },
    { 
      icon: BrainCircuit, 
      title: 'AI & ML', 
      description: 'Exploring the future with intelligent systems',
      gradient: 'from-rose-500 to-pink-600'
    },
    { 
      icon: Server, 
      title: 'Backend Development', 
      description: 'Building robust server-side logic and APIs',
      gradient: 'from-amber-500 to-orange-500'
    },
  ];

  const values = [
    { icon: Heart, title: 'Passion', description: 'Driven by love for technology' },
    { icon: Target, title: 'Focus', description: 'Committed to excellence' },
    { icon: Rocket, title: 'Innovation', description: 'Always exploring new ideas' },
    { icon: Lightbulb, title: 'Learning', description: 'Continuous improvement' }
  ];

  const highlights = [
    'MCA Student with strong foundation in computer applications',
    'Passionate about building intuitive, responsive web applications',
    'Committed to writing clean, maintainable code',
    'Continuously learning and improving through hands-on projects'
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
                About Me
              </span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Passionate Full Stack Web Developer crafting exceptional digital experiences with modern web technologies
            </motion.p>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"
            />
          </div>
        </ScrollSection>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Profile Image Section */}
          <ScrollSection delay={0.2}>
            <ParallaxImage />
          </ScrollSection>

          {/* Bio Section */}
          <ScrollSection delay={0.3}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50"
            >
              <motion.h2 
                className="text-3xl font-bold mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Full Stack Web Developer & Problem Solver
                </span>
              </motion.h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  As an MCA student with a strong foundation in computer applications
                  and a deep interest in web development, I am driven by the desire to build intuitive,
                  responsive, and efficient web applications.
                </motion.p>
                
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  My journey began during my BCA days, where I explored the fundamentals of programming, 
                  and has grown into a focused passion for crafting dynamic and user-centric digital solutions.
                </motion.p>
              </div>

              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{highlight}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200/50"
              >
                <p className="text-gray-700 font-medium italic">
                  "I'm committed to writing clean code, building intuitive interfaces, 
                  and continuously improving my skills through hands-on projects and learning."
                </p>
              </motion.div>
            </motion.div>
          </ScrollSection>
        </div>

        {/* Values Section */}
        <ScrollSection delay={0.4}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Core Values
            </h2>
            <p className="text-lg text-gray-600">
              Principles that guide my work and growth
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  >
                    <Icon className="text-white" size={32} />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </ScrollSection>

        {/* Interests Section */}
        <ScrollSection delay={0.5}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What I Love
            </h2>
            <p className="text-lg text-gray-600">
              Exploring technologies that shape the future of digital experiences
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.title}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 h-full">
                    <motion.div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${interest.gradient} flex items-center justify-center mb-5 shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="text-white" size={28} />
                    </motion.div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{interest.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{interest.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ScrollSection>

        {/* Call to Action */}
        <ScrollSection delay={0.6}>
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
              Let's Build Something Amazing
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
            >
              I'm always excited to collaborate on innovative projects and bring creative ideas to life.
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

export default About;
