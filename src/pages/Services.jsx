import React, { useState, useEffect, useRef } from 'react';
import { Code, Plus, Smartphone, ArrowRight, Bot } from 'lucide-react';
import ServiceModal from '../components/ServiceModal';

const servicesData = {
  web: {
    title: 'Web Sites',
    icon: <Code size={28} />,
    shortDesc: 'We craft scalable, high-performance web solutions.',
    fullDesc: 'Our web development service focuses on building modern, responsive, and robust websites and web applications tailored to your specific business needs. We leverage the latest technologies to ensure high performance, security, and exceptional user experiences across all devices.',
    features: ['Custom Web Applications', 'Responsive & Mobile-First Design', 'Performance Optimization', 'SEO Best Practices', 'Scalable Architecture'],
    color: 'from-[#0ea5e9] to-[#2563eb]' // Blueish
  },
  mobile: {
    title: 'Mobile Apps',
    icon: <Smartphone size={28} />,
    shortDesc: 'We build seamless, high-performance mobile experiences.',
    fullDesc: 'Transform your ideas into powerful mobile applications. Our team designs and develops intuitive, engaging, and scalable mobile apps that provide native-like performance and stunning user interfaces, keeping your users engaged on the go.',
    features: ['iOS & Android Development', 'Cross-Platform Solutions', 'Intuitive UI/UX Design', 'App Store Optimization', 'Ongoing Maintenance & Support'],
    color: 'from-gray-800 to-black' // Dark
  },
  ai: {
    title: 'AI Workflow',
    icon: <Bot size={28} />,
    shortDesc: 'We implement advanced AI solutions to streamline workflows, Automate your business.',
    fullDesc: 'Unlock the potential of Artificial Intelligence to automate repetitive tasks, gain valuable insights from your data, and enhance decision-making. We integrate intelligent AI agents and machine learning models seamlessly into your existing workflows to maximize efficiency.',
    features: ['AI Chatbots & Agents', 'Intelligent Workflow Automation', 'Predictive Analytics', 'Natural Language Processing', 'Custom AI Model Integration'],
    color: 'from-[#6366f1] to-[#06b6d4]' // Indigo to Cyan
  }
};

const AIAutomationList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "AI Chatbots & Agents" },
    { id: 2, text: "Workflow Automation" },
    { id: 3, text: "Predictive Analytics" }
  ]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setItems(prev => {
          const newItems = [...prev];
          const first = newItems.shift();
          newItems.push(first);
          return newItems;
        });
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const displayItems = [...items, items[0]];

  return (
    <div className="flex flex-col absolute md:bottom-[-9.4em] bottom-[-8.8em] gap-3 z-10 mt-auto overflow-y-hidden h-[18em] w-[80%]">
      {displayItems.map((item, index) => {
        const isActive = (index === 0 && !isAnimating) || (index === 1 && isAnimating);
        return (
          <div
            key={`${item.id}-${index}`}
            className={`h-[64px] shrink-0 rounded-[1.5rem] px-5 flex items-center justify-between transition-all duration-500 ease-in-out border ${index === 0 && isAnimating ? '-mt-[76px] opacity-0 scale-95' : 'mt-0 opacity-100 scale-100'} ${isActive ? 'bg-white shadow-lg text-[#6366f1] border-white' : 'bg-white/10 backdrop-blur-md border-white/20 text-white'}`}
          >
            <span className="font-medium">{item.text}</span>
            <Plus className={`transition-colors duration-500 ${isActive ? 'text-[#06b6d4]' : 'text-white/80'}`} size={20} />
          </div>
        );
      })}
    </div>
  );
};

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="w-full min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 md:px-8">

      <div className="text-center mb-16 overflow-hidden">
        <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 !text-black tracking-tight transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          Our Services
        </h1>
        <p className={`text-gray-500 max-w-2xl mx-auto text-lg md:text-xl transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          We provide end-to-end development solutions.
        </p>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Card 1: Web Development */}
        <div 
          onClick={() => setSelectedService(servicesData.web)}
          className={`relative rounded-[2.5rem] overflow-hidden bg-gray-100 h-[450px] flex flex-col justify-end group border border-gray-200 shadow-sm cursor-pointer transition-all duration-1000 ease-out delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          {/* bg image overlay  */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img loading="lazy" src="webService.jpg" alt="web-development" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-700 group-hover:bg-black/60"></div>
          </div>

          <div className="relative z-10 w-full p-0 flex flex-col justify-end items-start h-full">
            <div className="transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-start w-full p-8">
              {/* <div className="flex items-center justify-center gap-3 mb-0">
                <div className="bg-white text-black p-2.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <Code size={20} />
                </div>
                <span className="text-white font-medium tracking-wider uppercase text-xs drop-shadow-md">Web Solutions</span>
              </div> */}
              <div className='flex items-center gap-2'>
                <div className="bg-white text-black p-2.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <Code size={20} />
                </div>
                <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight leading-tight drop-shadow-md mb-3">
                  Web sites
                </h3>
              </div>
              <p className="text-white/90 text-sm max-w-[85%] font-light leading-relaxed drop-shadow-md">
                We craft scalable, high-performance web solutions.
              </p>

              <div className="max-h-0 group-hover:max-h-[100px] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-6 flex justify-start w-full">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedService(servicesData.web); }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(99,102,241,0.3)]"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  }}
                >
                  See more
                  <ArrowRight size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Mobile Apps */}
        <div 
          onClick={() => setSelectedService(servicesData.mobile)}
          className={`rounded-[2.5rem] bg-[#0a0a0a] border border-gray-800 p-8 h-[450px] flex flex-col relative group overflow-hidden shadow-xl cursor-pointer transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          {/* Background Gradient Blobs */}
          <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-gradient-to-br from-[#06b6d4] to-[#6366f1] opacity-15 rounded-full blur-[80px] pointer-events-none group-hover:opacity-30 transition-opacity duration-700"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-gradient-to-tl from-[#6366f1] to-[#06b6d4] opacity-15 rounded-full blur-[80px] pointer-events-none group-hover:opacity-30 transition-opacity duration-700"></div>

          <div className="pt-10 relative z-0 flex flex-col items-center gap-6">
            <div className='flex gap-2'>
              <img loading="lazy" src="mobile1.png" alt="mobile-development" className={`h-40 rotate-[-10deg] hover:scale-105 group-hover:translate-x-[1em] group-hover:delay-0 transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0 translate-x-[2em]' : 'opacity-0 translate-y-12 translate-x-[1em]'}`} />
              <img loading="lazy" src="mobile2.png" alt="mobile-development" className={`h-40 z-10 hover:scale-105 group-hover:delay-0 transition-all duration-700 ease-out delay-700 ${isVisible ? 'opacity-100 translate-y-[-1em]' : 'opacity-0 translate-y-8'}`} />
              <img loading="lazy" src="mobile3.png" alt="mobile-development" className={`h-40 rotate-[10deg] hover:scale-105 group-hover:translate-x-[-1em] group-hover:delay-0 transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0 translate-x-[-2em]' : 'opacity-0 translate-y-12 translate-x-[-1em]'}`} />
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>

          <div className="absolute bottom-8 left-6 right-8 z-20 flex flex-col items-start text-left">
            <div className=" group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-start w-full">
              <div className='flex items-center gap-2 mb-3'>
                <div className="bg-white text-black p-2.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <Smartphone size={20} />
                </div>
                <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight leading-tight drop-shadow-md">
                  Mobile Apps
                </h3>
              </div>

              <p className="text-white/90 text-sm max-w-[85%] font-light leading-relaxed drop-shadow-md">
                We build seamless, high-performance mobile experiences.
              </p>

              <div className="max-h-0  group-hover:max-h-[100px] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-6 flex justify-start w-full">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedService(servicesData.mobile); }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(99,102,241,0.3)]"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  }}
                >
                  See more
                  <ArrowRight size={20} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: AI Automation */}
        <div 
          onClick={() => setSelectedService(servicesData.ai)}
          className={`rounded-[2.5rem] bg-gradient-to-br from-[#6366f1] to-[#06b6d4] p-8 h-[450px] flex flex-col relative overflow-hidden group shadow-xl cursor-pointer transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)] pointer-events-none"></div>

          <div className="relative z-10 mb-10 flex flex-col items-start text-left">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-start w-full">
              <div className='flex items-center gap-2 mb-3'>
                <div className="bg-white p-2.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  <Bot size={20} />
                </div>
                <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight leading-tight drop-shadow-md">
                  AI workflow
                </h3>
              </div>
              <p className="text-white/90 text-sm max-w-[85%] font-light leading-relaxed drop-shadow-md">
                We implement advanced AI solutions to streamline workflows, Automate your business.
              </p>

              <div className="max-h-0 group-hover:max-h-[100px] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-6 flex justify-start w-full">
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedService(servicesData.ai); }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#6366f1] font-semibold rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 shadow-lg"
                >
                  See more
                  <ArrowRight size={20} className="text-[#6366f1]" />
                </button>
              </div>
            </div>
          </div>

          <AIAutomationList />
        </div>

      </div>

      <ServiceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService} 
      />
    </section>
  );
};

export default Services;
