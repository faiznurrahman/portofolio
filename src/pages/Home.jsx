import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0d9488] to-[#22d3ee] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#0d9488] to-[#22d3ee] text-transparent bg-clip-text text-xs sm:text-sm font-medium flex items-center">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-cyan-400" />
          Hello World!
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#0d9488] to-[#22d3ee] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-cyan-100 to-teal-200 bg-clip-text text-transparent">
          Multidisciplinary
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#0d9488] to-[#22d3ee] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#0d9488] to-[#22d3ee] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href} className="group relative w-[140px] sm:w-[160px] inline-block">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0d9488] to-[#22d3ee] rounded-xl opacity-50 blur-lg group-hover:opacity-90 transition-all duration-700"></div>
    <div className="relative h-10 sm:h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#0d9488]/20 to-[#22d3ee]/20"></div>
      <span className="absolute inset-0 flex items-center justify-center gap-2 text-xs sm:text-sm group-hover:gap-3 transition-all duration-300">
        <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
          {text}
        </span>
        <Icon
          className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-200 ${
            text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'
          } transform transition-all duration-300 z-10`}
        />
      </span>
    </div>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Informatich Enginering Student", "Tech Enthusiast"];
const TECH_STACK = ["PHP", "Javascript", "Kotlin", "Tailwind"];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/5eb8737f-ba7d-4a37-ae35-3d88ece0114f/RrOVVep1mJ.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-[120%] sm:scale-[130%] md:scale-[140%] lg:scale-[145%]" 
        : "scale-[115%] sm:scale-[125%] md:scale-[135%] lg:scale-[140%]"
    }`
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden px-4 sm:px-6 lg:px-8" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left order-1 lg:order-1"
              data-aos="fade-right"
              data-aos-delay="200">
              <StatusBadge />
              <MainTitle />

              {/* Typing Effect */}
              <div className="h-8 flex justify-center lg:justify-start items-center" data-aos="fade-up" data-aos-delay="800">
                <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                  {text}
                </span>
                <span className="w-[3px] h-5 sm:h-6 bg-gradient-to-t from-[#0d9488] to-[#22d3ee] ml-1 animate-blink"></span>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed font-light"
                data-aos="fade-up"
                data-aos-delay="1000">
                Mengeksplorasi Web, Aplikasi, dan Solusi Digital Lainnya untuk Belajar dan Berkarya.
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1200">
                {TECH_STACK.map((tech, index) => (
                  <TechStack key={index} tech={tech} />
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-row gap-3 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="1400">
                <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                <CTAButton href="#Contact" text="Contact" icon={Mail} />
              </div>
            </div>

            {/* Right Column --Memoized Optimized Lottie Animation */}
            <div className="w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative flex items-center justify-center order-2"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600">
              <div className="relative w-full max-w-[500px] mx-auto opacity-90">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#0d9488]/10 to-[#22d3ee]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                  isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                }`}></div>

                <div className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                  isHovering ? "scale-105" : "scale-100"
                }`}>
                  <DotLottieReact {...lottieOptions} />
                </div>

                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                  isHovering ? "opacity-50" : "opacity-20"
                }`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-gradient-to-br from-teal-500/10 to-cyan-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);