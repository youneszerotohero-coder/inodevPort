import React, { useState, useEffect, useRef } from 'react';
import { Plus, Code, ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-[1.5rem] transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Inner Card Wrapper */}
      <Link to={`/project/${project.id}`} className="relative bg-white border border-gray-200 rounded-[1.5rem] overflow-hidden h-full flex flex-col block cursor-pointer">
      {/* Project Image Container */}
      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          <div className="p-2.5 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg">
            <Plus size={18} />
          </div>
          <div className="p-2.5 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg">
            <Code size={18} />
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#6366f1] to-[#06b6d4] text-transparent bg-clip-text mb-1 block w-fit">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#06b6d4] transition-all duration-300 leading-tight w-fit">
              {project.title}
            </h3>
          </div>
          <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-[#6366f1] group-hover:to-[#06b6d4] group-hover:text-white transition-all duration-300">
            <ArrowRight size={18} />
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-5 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[9px] font-bold bg-white border border-gray-100 text-gray-400 rounded-full uppercase tracking-tighter"
            >
              {tag}
            </span>
          ))}
        </div> */}
      </div>
      </Link>
    </div>
  );
};

const Work = () => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);

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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="w-full py-24 bg-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={titleRef}
          className="flex flex-col items-center justify-center mb-16 overflow-hidden"
        >
          <h1 className={`text-3xl md:text-4xl font-extrabold mb-2 !text-black tracking-tight transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            Featured Work
          </h1>
          <p className={`text-gray-500 max-w-2xl mx-auto text-lg md:text-xl transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Explore our latest projects where design meets functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
          >
            See more
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Work;
