import React, { useState, useEffect } from 'react';
import { Code, Palette,BrainCircuit,Server } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const interests = [
    { icon: Code, title: 'Clean Code', description: 'Writing maintainable, scalable code' },
    { icon: Palette, title: 'Design', description: 'Creating beautiful user experiences' },
    { icon: BrainCircuit, title: 'AI & ML', description: 'Exploring the future with intelligent systems' },
    { icon: Server, title: 'Backend Development', description: 'Building robust server-side logic and APIs' },
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
              About Me
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="anto.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👋</span>
                </div>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                MCA Student & Aspiring Web Developer
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
               As an MCA student with a strong foundation in computer applications
                and a deep interest in web development, I am driven by the desire to build intuitive,
                 responsive, and efficient web applications. My journey began during my BCA days, 
                 where I explored the fundamentals of programming, and has grown into a focused passion 
                 for crafting dynamic and user-centric digital solutions.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                I’m committed to writing clean code, building intuitive interfaces, 
                and continuously improving my skills. I enjoy learning about new technologies, 
                experimenting with side projects, and contributing to open-source when I can. 
                Outside of coding, you’ll often find me exploring tech blogs or sketching out 
                new ideas over a cup of tea.
              </p>
            </div>
          </div>

          {/* Interests Section */}
          <div
            className={`transform transition-all duration-1000 delay-600 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What I Love</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={interest.title}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{interest.title}</h3>
                    <p className="text-gray-600 text-sm">{interest.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;