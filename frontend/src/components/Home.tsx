import { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const backgroundImages = [
    'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anto-Joseph-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 sm:py-32 md:py-40 lg:py-48 min-h-screen">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            <span>Hello, I'm</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              Anto Joseph
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 font-light mb-4">
            MCA Student & Aspiring Web Developer
          </p>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-10 px-2">
            Crafting digital experiences with passion and precision. Specializing in modern web technologies and innovative solutions.
          </p>
        </div>

        {/* Buttons */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link to="/projects">
              <button
                className="px-6 py-3 text-sm sm:text-base bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-md"
              >
                View My Work
              </button>
            </Link>
            <button
              onClick={handleDownloadResume}
              className="px-6 py-3 text-sm sm:text-base border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-md"
            >
              Download Resume
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-5">
            <a
              href="https://github.com/antojoseph2806"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-amber-400 transform transition-transform duration-300 hover:scale-110"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/antomaruthaniyil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-amber-400 transform transition-transform duration-300 hover:scale-110"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:antojoseph2026@gmail.com"
              className="text-gray-300 hover:text-amber-400 transform transition-transform duration-300 hover:scale-110"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown size={28} />
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-amber-400 scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
