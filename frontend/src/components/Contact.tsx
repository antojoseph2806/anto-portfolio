import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Clock,
  Globe
} from 'lucide-react';
import Swal from 'sweetalert2';
import { init, send } from '@emailjs/browser';

// initialize EmailJS (keep secret/public key properly managed in env for production)
init('zc_-kJ9FYyYotmaZY');

const NAME_REGEX = /^[A-Za-zÀ-ž' -]{2,50}$/; // allows letters, spaces, hyphens, apostrophes
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple, robust email check

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'antojoseph2026@gmail.com',
      action: 'mailto:antojoseph2026@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+916282289862',
      action: 'tel:+916282289862'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Idukki, Kerala',
      action: 'https://maps.app.goo.gl/g29dcF8m1bPerbcB8'
    },
    {
      icon: Globe,
      title: 'Website',
      content: 'www.antojoseph.website',
      action: 'https://www.antojoseph.website'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/antojoseph2806',
      color: 'hover:text-gray-800'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://in.linkedin.com/in/antomaruthaniyil',
      color: 'hover:text-blue-600'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://instagram.com/anto__joseph',
      color: 'hover:text-blue-400'
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
    if (sending) return; // guard double submit

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const { valid, errors, trimmedName, trimmedEmail, trimmedMessage } = validate(name, email, message);

    if (!valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation failed',
        html: errors.map((e) => `• ${e}`).join('<br/>')
      });
      return;
    }

    setSending(true);

    Swal.fire({
      title: 'Sending...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      // Replace with your EmailJS values
      const SERVICE_ID = 'service_13kqq1u';
      const TEMPLATE_ID = 'template_zce49i1';

      // Make sure your EmailJS template uses the same variable names (e.g. {{name}}, {{email}}, {{message}})
      const templateParams = {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        reply_to: trimmedEmail
      };

      // Send only ONCE — previously it was accidentally called twice.
      const result = await send(SERVICE_ID, TEMPLATE_ID, templateParams);

      // Optionally inspect result.status / result.text if needed
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. I will reply soon.',
        timer: 3000,
        showConfirmButton: false
      });

      form.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Failed to send',
        text: 'Something went wrong. Try again later.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              I'm always interested in new opportunities and collaborations. Let's discuss how we can work together to bring your ideas to life.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div
              className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon as any;
                      return (
                        <a
                          key={index}
                          href={info.action}
                          className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1 w-full break-words"
                        >
                          <div className="min-w-[48px] h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="text-white" size={24} />
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
                            <p className="text-gray-600 text-sm break-words">{info.content}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Me</h3>
                  <div className="flex justify-center flex-wrap gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon as any;
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 ${social.color} hover:shadow-xl transform hover:scale-110 transition-all duration-300`}
                        >
                          <Icon size={24} />
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Availability</h3>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 text-green-800 mb-2">
                        <Clock size={24} />
                        <span className="text-lg font-semibold">Available for new projects</span>
                      </div>
                      <p className="text-green-700">
                        Currently accepting new freelance and full-time opportunities
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
                    <form
                      className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
                      onSubmit={handleSubmit}
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={sending}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={sending}
                      />
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={5}
                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={sending}
                      />
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                        disabled={sending}
                        aria-busy={sending}
                      >
                        {sending ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
