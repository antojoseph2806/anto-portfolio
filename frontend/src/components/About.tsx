import React, { useState, useEffect } from 'react';
import { Code, Palette, BrainCircuit, Server, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const interests = [
    { 
      icon: Code, 
      title: 'Clean Code', 
      description: 'Writing maintainable, scalable code with best practices',
      gradient: 'from-emerald-500 to-cyan-500',
      accent: 'bg-emerald-500/10'
    },
    { 
      icon: Palette, 
      title: 'Design', 
      description: 'Creating beautiful, intuitive user experiences',
      gradient: 'from-violet-500 to-purple-600',
      accent: 'bg-violet-500/10'
    },
    { 
      icon: BrainCircuit, 
      title: 'AI & ML', 
      description: 'Exploring the future with intelligent systems',
      gradient: 'from-rose-500 to-pink-600',
      accent: 'bg-rose-500/10'
    },
    { 
      icon: Server, 
      title: 'Backend Development', 
      description: 'Building robust server-side logic and APIs',
      gradient: 'from-amber-500 to-orange-500',
      accent: 'bg-amber-500/10'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/20 pt-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div
          className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Passionate Developer
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                About Me
              </span>
            </h1>
            <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 mx-auto rounded-full shadow-lg"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            {/* Profile Image Section */}
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl transform rotate-2 group-hover:rotate-0 transition-all duration-500 border-4 border-white/20 backdrop-blur-sm">
                    <img
                      src="Anto.png"
                      alt="Profile"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                    <span className="text-2xl">💡</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <h2 className="text-4xl font-bold mb-8">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                    MCA Student &<br />
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      Aspiring Developer
                    </span>
                  </span>
                </h2>
                
                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent font-medium">
                    As an MCA student with a strong foundation in computer applications
                    and a deep interest in web development, I am driven by the desire to build intuitive,
                    responsive, and efficient web applications.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    My journey began during my BCA days, where I explored the fundamentals of programming, 
                    and has grown into a focused passion for crafting dynamic and user-centric digital solutions.
                  </p>

                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50/50 rounded-2xl p-6 border border-cyan-200/50">
                    <p className="text-gray-700 font-medium italic">
                      "I'm committed to writing clean code, building intuitive interfaces, 
                      and continuously improving my skills through hands-on projects and learning."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                  What I Love
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Exploring technologies that shape the future of digital experiences
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest) => {
                const Icon = interest.icon;
                return (
                  <div key={interest.title} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/20 transform group-hover:-translate-y-2 transition-all duration-300 h-full">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${interest.gradient} flex items-center justify-center mb-5 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">{interest.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{interest.description}</p>
                    </div>
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
