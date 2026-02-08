import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Download, MapPin, Phone, Mail, Globe, Calendar, Award, Briefcase, GraduationCap, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

// Scroll-triggered section component - Optimized
const ScrollSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Timeline Item - Optimized
const TimelineItem: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const Resume: React.FC = () => {
  const containerRef = useRef(null);
  
  // Parallax scroll effects for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anto-Joseph-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const contactInfo = [
    { icon: MapPin, text: 'Idukki, Kerala' },
    { icon: Phone, text: '+91 6282289862' },
    { icon: Mail, text: 'antojoseph2026@gmail.com' },
    { icon: Globe, text: 'www.antojoseph.website' }
  ];

  const experiences = [
    {
      title: 'Backend Intern',
      company: 'Leopard Tech Labs',
      location: 'STARTUP VALLEY - AJCE TBI',
      duration: '2025 April 1 - 2025 April 30',
      responsibilities: [
        'Independently developed a microproject during the internship, showcasing initiative and end-to-end project execution',
        'Gained hands-on experience with Node.js for backend development',
        'Explored API testing and documentation using Postman',
        'Worked with Firebase for backend services such as authentication and real-time database',
        'Enhanced understanding of full-stack web development through practical application'
      ]
    },
    {
      title: 'Full Stack Intern',
      company: 'LCC Computer Education',
      location: 'Marine Drive, Kochi',
      duration: '2023 Nov - 2024 Jan',
      responsibilities: [
        'Independently developed a full-stack web project using Python and Django',
        'Applied machine learning concepts to implement intelligent features in the project',
        'Gained hands-on experience with backend development, ORM, and REST APIs in Django',
        'Explored data handling, model training, and integration of ML models into web applications',
        'Strengthened problem-solving and debugging skills through self-directed learning and implementation'
      ]
    }
  ];

  const education = [
    {
      degree: 'Master of Computer Applications',
      school: 'Amal Jyothi College of Engineering (Autonomous)',
      duration: '2024 - 2026',
      gpa: '8/10'
    },
    {
      degree: 'Bachelor of Computer Applications',
      school: 'MES College Nedumkandam',
      duration: '2021 - 2024',
      gpa: '6/10'
    }
  ];

  const skills = {
    'Frontend': ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'Backend': ['Node.js', 'Python', 'Express.js', 'PHP', 'REST APIs'],
    'Database': ['SQLite', 'MongoDB', 'MySQL', 'Bigtable'],
    'Tools': ['Git', 'Vercel', 'AWS', 'Jenkins', 'Postman', 'Render']
  };

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        {/* Header Card */}
        <ScrollSection delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-2xl p-8 mb-8 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex-1">
                <motion.h1 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl sm:text-5xl font-bold text-white mb-2"
                >
                  Anto Joseph
                </motion.h1>
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-blue-100 mb-6"
                >
                  Full Stack Web Developer
                </motion.p>
                
                <div className="grid sm:grid-cols-2 gap-3 text-sm text-blue-50">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <Icon size={16} />
                        <span>{info.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.button
                onClick={handleDownload}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl transition-colors text-white font-medium shadow-lg border border-white/30"
              >
                <Download size={18} />
                <span>Download PDF</span>
              </motion.button>
            </div>
          </motion.div>
        </ScrollSection>

        {/* Professional Summary */}
        <ScrollSection delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-white/50"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <motion.div 
                className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 mr-3 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              I am a dedicated and enthusiastic MCA student with a completed Bachelor's degree in Computer Applications (BCA).
              With a strong foundation in programming and software development, I have developed a keen interest in web development
              and continue to enhance my skills in modern web technologies. I am actively seeking new opportunities to apply my knowledge,
              contribute to innovative projects, and grow as a professional in the tech industry.
            </p>
          </motion.div>
        </ScrollSection>

        {/* Work Experience */}
        <ScrollSection delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-white/50"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <motion.div 
                className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 mr-3 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
              Work Experience
            </h2>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <TimelineItem key={index} index={index}>
                  <div className="border-l-2 border-blue-300 pl-6 relative">
                    <motion.div 
                      className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"
                      whileHover={{ scale: 1.5 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
                    >
                      <div className="flex flex-wrap justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 text-sm">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <motion.li
                            key={respIndex}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: respIndex * 0.05 }}
                            className="text-gray-700 flex items-start"
                          >
                            <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* Education */}
        <ScrollSection delay={0.4}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl border border-white/50"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <motion.div 
                className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 mr-3 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
              Education
            </h2>
            
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-blue-600 font-medium">{edu.school}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Award size={14} />
                        <span>{edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

        {/* Skills */}
        <ScrollSection delay={0.5}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <motion.div 
                className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 mr-3 rounded-full"
                animate={{ scaleY: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Code2 className="w-6 h-6 mr-2 text-blue-600" />
              Technical Skills
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, skillList], catIndex) => (
                <motion.div
                  key={category}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIndex * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 + index * 0.05, type: "spring" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium shadow-md"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollSection>

      </div>
    </div>
  );
};

export default Resume;
