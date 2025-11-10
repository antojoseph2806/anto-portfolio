import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';


const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Car Rental System',
      description:
        'A full-stack web application that streamlines the car rental process. Built with HTML, CSS, and JavaScript on the frontend, featuring interactive UI and Toastify alerts for real-time feedback. The backend is powered by Node.js, with MongoDB handling data storage for users, bookings, and vehicles. This project demonstrates my ability to build scalable, responsive, and user-friendly systems from scratch.',
      image:
        'c.jpg',
      technologies: ['HTML','JavaScript','Node.js','CSS', 'Express.js', 'MongoDB'],
      live: 'https://ajmcars.netlify.app/',
    },
    {
      id: 2,
      title: 'Room Booking System',
      description:
        'A backend-focused application for managing room reservations, built with Node.js and MongoDB.This project handles booking logic, room availability, and user data purely through APIs—no frontend interface included. Ideal for integration with web or mobile platforms.',
      image:
        'r.jpg',
      technologies: ['Node.js', 'Express. js', 'MongoDB','PostMan'],
      github: 'https://github.com/antojoseph2806/room-booking-backend-nodejs',
    },
    {
      id: 3,
      title: 'Pneumonia Detection System',
      description:
        'A web-based diagnostic tool that leverages machine learning (CNN model) to detect pneumonia from chest X-ray images. Built with HTML, CSS, JavaScript, and Bootstrap on the frontend, and Python Django on the backend, the system uses a SQLite database and a dataset sourced from Kaggle to deliver accurate, automated medical predictions.',
      image:
        'p.jpg',
      technologies: ['Python', 'Django', 'SQLite','HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/antojoseph2806/pneumonia-detection-system',
    },
    {
      id: 4,
      title: 'Personal Portfolio Website',
      description:
        'A modern, responsive, and interactive portfolio website designed and developed to showcase my skills, projects, and experiences as a developer. Built using React.js for dynamic component-based rendering, along with JavaScript for interactivity and CSS for styling.',
      image:
        'port.png',
      technologies: ['React. js', ' Tailwind CSS', 'JavaScript','Framer Motion'],
      live: 'https://antojoseph.vercel.app/',
    },
    {
      id: 5,
      title: 'Live Science Quiz Web App',
      description:
        'The Live Science Quiz Web App is a fully responsive, interactive quiz application built using HTML, CSS, and JavaScript. It provides a smooth and engaging user experience with real-time quiz functionalities, payment integration, and automatic certificate generation.',
      image:
        'quiz.webp',
      technologies: ['HTML5','JavaScript', 'Razorpay', 'Trivia API','CSS'],
      live: 'https://quiz-app-beta-roan.vercel.app/',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              My Projects
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A showcase of my creative work and technical expertise across web development, mobile applications, and design projects.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto"></div>
          </div>

          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                  isVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <Github size={20} className="text-gray-700" />
                      </a>
                      <a
                        href={project.live}
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                      >
                        <ExternalLink size={20} className="text-gray-700" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
