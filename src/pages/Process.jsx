import React, { useState, useEffect, useRef } from 'react';
import { Headphones, Lightbulb, PenTool, Rocket, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

const steps = [
  {
    id: 1,
    icon: Headphones,
    title: "Discovery & Listening",
    description: "We start by deeply understanding your vision, goals, and challenges.",
    detail: "Stakeholder interviews · Market research · Requirements gathering"
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Strategy & Proposal",
    description: "We analyze your needs and craft a tailored strategy with clear milestones.",
    detail: "Technical architecture · Project roadmap · Budget planning"
  },
  {
    id: 3,
    icon: PenTool,
    title: "Design & Prototype",
    description: "Our design team creates stunning, user-centered interfaces.",
    detail: "Wireframing · UI/UX design · Interactive prototypes"
  },
  {
    id: 4,
    icon: Rocket,
    title: "Development & Build",
    description: "We bring designs to life with clean, scalable code.",
    detail: "Agile development · Code reviews · Progress demos"
  },
  {
    id: 5,
    icon: CheckCircle,
    title: "Delivery & Launch",
    description: "Rigorous testing, seamless deployment, and ongoing support.",
    detail: "QA testing · Deployment · Post-launch support"
  }
];

const getCardStyle = (idx) => {
  const styles = [
    { bg: 'bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]', title1: 'text-black', title2: 'text-gray-400', desc: 'text-gray-500', btnCircle: 'bg-black', btnIcon: 'text-white', btnText: 'text-black', iconClass: 'opacity-15 drop-shadow-xl', useGradientIcon: true },
    { bg: 'bg-gradient-to-br from-[#6366f1] to-[#06b6d4] shadow-xl', title1: 'text-white', title2: 'text-white/70', desc: 'text-white/90', btnCircle: 'bg-white', btnIcon: 'text-[#6366f1]', btnText: 'text-white', iconClass: 'opacity-25 text-white drop-shadow-xl', useGradientIcon: false },
    { bg: 'bg-[#111] border border-white/10 shadow-2xl', title1: 'text-white', title2: 'text-gray-500', desc: 'text-gray-400', btnCircle: 'bg-white', btnIcon: 'text-black', btnText: 'text-white', iconClass: 'opacity-20 drop-shadow-xl', useGradientIcon: true },
    { bg: 'bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]', title1: 'text-black', title2: 'text-gray-400', desc: 'text-gray-500', btnCircle: 'bg-black', btnIcon: 'text-white', btnText: 'text-black', iconClass: 'opacity-15 drop-shadow-xl', useGradientIcon: true },
    { bg: 'bg-[#111] border border-white/10 shadow-2xl', title1: 'text-white', title2: 'text-gray-500', desc: 'text-gray-400', btnCircle: 'bg-white', btnIcon: 'text-black', btnText: 'text-white', iconClass: 'opacity-20 drop-shadow-xl', useGradientIcon: true }
  ];
  return styles[idx % styles.length];
};

const TimelineStep = ({ step, index, totalSteps }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Icon = step.icon;
  const isLast = index === totalSteps - 1;
  const isEven = index % 2 === 0;

  const words = step.title.split(' ');
  const titlePart1 = words[0];
  const titlePart2 = words.slice(1).join(' ');
  const style = getCardStyle(index);

  const CardContent = () => (
    <div
      className={`relative overflow-hidden max-w-[420px] w-full min-h-[240px] rounded-[2rem] p-8 flex flex-col transition-all duration-700 ease-out group hover:-translate-y-2 ${style.bg} ${isVisible
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${isEven ? 'translate-x-12' : '-translate-x-12'}`
        }`}
      style={{ transitionDelay: `${index * 150 + 200}ms` }}
    >
      <div className="flex flex-col flex-1 relative z-10 justify-between h-full">
        <div>
          <h3 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-[1.1] ${style.title1}`}>
            {titlePart1}
            {titlePart2 && (
              <>
                <br />
                <span className={`font-normal ${style.title2}`}>
                  {titlePart2}
                </span>
              </>
            )}
          </h3>
          <p className={`text-sm mb-6 font-light leading-relaxed max-w-[85%] ${style.desc}`}>
            {step.description}
          </p>
        </div>

        {/* <div className="flex items-center gap-3 mt-auto cursor-pointer group/btn w-fit">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110 ${style.btnCircle}`}>
            <ArrowUpRight size={16} className={style.btnIcon} strokeWidth={2.5} />
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-wider ${style.btnText}`}>LEARN MORE</span>
        </div> */}
      </div>

      <div className={`absolute right-[-15%] top-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none group-hover:scale-110 group-hover:-translate-x-4 ${style.iconClass}`}>
        {style.useGradientIcon ? (
           <Icon size={200} strokeWidth={1} style={{ stroke: 'url(#icon-gradient)' }} />
        ) : (
           <Icon size={200} strokeWidth={1} />
        )}
      </div>
    </div>
  );

  return (
    <div ref={stepRef} className="relative grid grid-cols-[1fr_auto_1fr] items-start">
      <div className={`flex ${isEven ? 'justify-end' : 'justify-end'}`}>
        {!isEven ? <CardContent /> : <div />}
      </div>

      {/* Center timeline: icon + line */}
      <div className="flex flex-col items-center mx-6 md:mx-10">
        <div
          className={`relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shrink-0 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          style={{
            transitionDelay: `${index * 150}ms`,
            background: isVisible
              ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
              : 'transparent',
            boxShadow: isVisible
              ? '0 0 30px rgba(99,102,241,0.4), 0 0 60px rgba(6,182,212,0.15)'
              : 'none',
          }}
        >
          <div
            className={`absolute inset-[-5px] rounded-full border-2 transition-all duration-1000 ease-out ${isVisible ? 'border-white/10 opacity-100' : 'border-transparent opacity-0'
              }`}
            style={{ transitionDelay: `${index * 150 + 300}ms` }}
          />
          <Icon size={22} className="text-white" strokeWidth={1.8} />
        </div>

        {!isLast && (
          <div className="relative w-[2px] flex-1 min-h-[200px]">
            <div className="absolute inset-0 bg-white/[0.07] rounded-full" />
            <div
              className={`absolute top-0 left-0 w-full rounded-full transition-all duration-1000 ease-out ${isVisible ? 'h-full' : 'h-0'
                }`}
              style={{
                transitionDelay: `${index * 150 + 400}ms`,
                background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(6,182,212,0.2))',
              }}
            />
          </div>
        )}
      </div>

      <div className={`flex ${!isEven ? 'justify-start' : 'justify-start'}`}>
        {isEven ? <CardContent /> : <div />}
      </div>
    </div>
  );
};

/* Mobile layout: simple left-aligned timeline */
const MobileTimelineStep = ({ step, index, totalSteps }) => {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Icon = step.icon;
  const isLast = index === totalSteps - 1;

  const words = step.title.split(' ');
  const titlePart1 = words[0];
  const titlePart2 = words.slice(1).join(' ');
  const style = getCardStyle(index);

  return (
    <div ref={stepRef} className="relative flex items-start gap-5">
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          style={{
            transitionDelay: `${index * 150}ms`,
            background: isVisible
              ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
              : 'transparent',
            boxShadow: isVisible
              ? '0 0 25px rgba(99,102,241,0.35)'
              : 'none',
          }}
        >
          <div
            className={`absolute inset-[-4px] rounded-full border-2 transition-all duration-1000 ease-out ${isVisible ? 'border-white/10 opacity-100' : 'border-transparent opacity-0'
              }`}
            style={{ transitionDelay: `${index * 150 + 300}ms` }}
          />
          <Icon size={20} className="text-white" strokeWidth={1.8} />
        </div>

        {!isLast && (
          <div className="relative w-[2px] flex-1 min-h-[250px]">
            <div className="absolute inset-0 bg-white/[0.07] rounded-full" />
            <div
              className={`absolute top-0 left-0 w-full rounded-full transition-all duration-1000 ease-out ${isVisible ? 'h-full' : 'h-0'
                }`}
              style={{
                transitionDelay: `${index * 150 + 400}ms`,
                background: 'linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(6,182,212,0.2))',
              }}
            />
          </div>
        )}
      </div>

      <div
        className={`flex-1 pb-10 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        style={{ transitionDelay: `${index * 150 + 150}ms` }}
      >
        <div className={`relative overflow-hidden w-full min-h-[260px] rounded-[2rem] p-6 flex flex-col group ${style.bg}`}>
          <div className="flex flex-col flex-1 relative z-10 justify-between h-full pr-8">
            <div>
              <h3 className={`text-3xl md:text-3xl font-bold mb-8 tracking-tight leading-[1.1] ${style.title1}`}>
                {titlePart1}
                {titlePart2 && (
                  <>
                    <br />
                    <span className={`font-normal ${style.title2}`}>
                      {titlePart2}
                    </span>
                  </>
                )}
              </h3>
              <p className={`text-sm mb-6 font-light leading-relaxed ${style.desc}`}>
                {step.description}
              </p>
            </div>

            {/* <div className="flex items-center gap-3 mt-auto cursor-pointer group/btn w-fit">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-110 ${style.btnCircle}`}>
                <ArrowUpRight size={16} className={style.btnIcon} strokeWidth={2.5} />
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${style.btnText}`}>LEARN MORE</span>
            </div> */}
          </div>

          <div className={`absolute right-[-20%] top-1/2 -translate-y-1/2 transition-all duration-500 pointer-events-none group-hover:scale-110 group-hover:-translate-x-2 ${style.iconClass}`}>
             {style.useGradientIcon ? (
               <Icon size={160} strokeWidth={1} style={{ stroke: 'url(#icon-gradient)' }} />
            ) : (
               <Icon size={160} strokeWidth={1} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  const { openContact } = useContact();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full min-h-screen bg-black overflow-hidden py-24 px-4 md:px-8"
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#6366f1" offset="0%" />
            <stop stopColor="#06b6d4" offset="100%" />
          </linearGradient>
        </defs>
      </svg>
      {/* Background gradient blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#6366f1]/20 to-[#06b6d4]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-gradient-to-tl from-[#06b6d4]/15 to-[#6366f1]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[600px] h-[600px] bg-[#6366f1]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="flex flex-col items-center mb-20">
          <h2
            className={`text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
          >
            Our Process
          </h2>
          <p
            className={`text-center text-white/50 max-w-xl mx-auto text-lg md:text-xl font-light transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            From idea to launch — a seamless journey built on trust.
          </p>
        </div>

        {/* Desktop zigzag timeline (hidden on mobile) */}
        <div className="hidden md:block">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.id}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>

        {/* Mobile linear timeline (hidden on desktop) */}
        <div className="block md:hidden pl-2">
          {steps.map((step, index) => (
            <MobileTimelineStep
              key={step.id}
              step={step}
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-12 transition-all duration-1000 ease-out delay-[1200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <button
            onClick={openContact}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.3)',
            }}
          >
            Start Your Project →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;