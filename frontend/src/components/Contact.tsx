import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Clock,
  Globe,
  Send,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import Swal from 'sweetalert2';
import { init, send } from '@emailjs/browser';

// initialize EmailJS
init('zc_-kJ9FYyYotmaZY');

const NAME_REGEX = /^[A-Za-zÀ-ž' -]{2,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

// Simplified card component - removed heavy parallax
const AnimatedCard: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const Contact: React.FC = () => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const containerRef = useRef(null);
  
  // Parallax scroll effects for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'antojoseph2026@gmail.com',
      action: 'mailto:antojoseph2026@gmail.com',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+916282289862',
      action: 'tel:+916282289862',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Idukki, Kerala',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Website',
      content: 'www.antojoseph.website',
      action: 'https://www.antojoseph.website',
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/antojoseph2806',
      color: 'hover:bg-gray-900'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://in.linkedin.com/in/antomaruthaniyil',
      color: 'hover:bg-blue-600'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://instagram.com/anto_maruthaniyil',
      color: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://www.facebook.com/antomaruthaniyil',
      color: 'hover:bg-blue-600'
    }
  ];

  const validate = (name: string, email: string, message: string) => {
    const errors: string[] = [];
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) errors.push('Name is required.');
    else if (!NAME_REGEX.test(trimmedName))
      errors.push('Name should be 2–50 characters and only contain letters, spaces, apostrophes or hyphens.');

    if (!trimmedEmail) errors.push('Email is required.');
    else if (!EMAIL_REGEX.test(trimmedEmail)) errors.push('Enter a valid email address.');

    if (!trimmedMessage) errors.push('Message is required.');
    else if (trimmedMessage.length < 10) errors.push('Message should be at least 10 characters.');

    return { valid: errors.length === 0, errors, trimmedName, trimmedEmail, trimmedMessage };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const { valid, errors, trimmedName, trimmedEmail, trimmedMessage } = validate(name, email, message);

    if (!valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation failed',
        html: errors.map((e) => `• ${e}`).join('<br/>'),
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#3b82f6',
        customClass: { popup: 'rounded-2xl' }
      });
      return;
    }

    setSending(true);

    Swal.fire({
      title: 'Sending...',
      allowOutsideClick: false,
      background: '#1e293b',
      color: '#fff',
      customClass: { popup: 'rounded-2xl' },
      didOpen: () => Swal.showLoading()
    });

    try {
      const SERVICE_ID = 'service_13kqq1u';
      const TEMPLATE_ID = 'template_zce49i1';

      const templateParams = {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        reply_to: trimmedEmail
      };

      await send(SERVICE_ID, TEMPLATE_ID, templateParams);

      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. I will reply soon.',
        timer: 3000,
        showConfirmButton: false,
        background: '#1e293b',
        color: '#fff',
        customClass: { popup: 'rounded-2xl' }
      });

      form.reset();
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Failed to send',
        text: 'Something went wrong. Try again later.',
        background: '#1e293b',
        color: '#fff',
        confirmButtonColor: '#3b82f6',
        customClass: { popup: 'rounded-2xl' }
      });
    } finally {
      setSending(false);
    }
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
                Get In Touch
              </span>
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              I'm always interested in new opportunities and collaborations. Let's discuss how we can work together to bring your ideas to life.
            </motion.p>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full shadow-lg"
            />
          </div>
        </ScrollSection>

        {/* Contact Info Cards */}
        <ScrollSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <AnimatedCard key={index} index={index}>
                  <motion.a
                    href={info.action}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative block h-full"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur"
                      style={{
                        backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      }}
                    />
                    
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 h-full transition-all duration-300 group-hover:shadow-2xl">
                      <motion.div 
                        className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="text-white" size={24} />
                      </motion.div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 text-sm break-words">{info.content}</p>
                    </div>
                  </motion.a>
                </AnimatedCard>
              );
            })}
          </div>
        </ScrollSection>

        {/* Social Links */}
        <ScrollSection delay={0.3}>
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Follow My Journey</h3>
            <div className="flex justify-center flex-wrap gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.2, rotate: 360, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`relative w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-gray-700 ${social.color} transition-all duration-300 group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 rounded-2xl transition-all duration-300" />
                    <Icon size={28} className="relative z-10 group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </ScrollSection>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Availability Card */}
          <ScrollSection delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl p-8 shadow-xl h-full backdrop-blur-sm"
            >
              <div className="flex items-start space-x-4 mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Clock className="text-white" size={28} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Availability</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-500 rounded-full shadow-lg"
                    />
                    <span className="text-green-700 font-semibold">Available Now</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Currently accepting new freelance projects and full-time opportunities. Let's build something amazing together!
              </p>
              
              <div className="space-y-3">
                {['Full-time positions', 'Freelance projects', 'Consulting opportunities'].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollSection>

          {/* Contact Form */}
          <ScrollSection delay={0.5}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  animate={{
                    scale: focusedField === 'name' ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                    disabled={sending}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    scale: focusedField === 'email' ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                    disabled={sending}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    scale: focusedField === 'message' ? 1.02 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your Message"
                    rows={5}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-500 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    required
                    disabled={sending}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.05 }}
                  whileTap={{ scale: sending ? 1 : 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </ScrollSection>
        </div>

      </div>
    </div>
  );
};

export default Contact;
