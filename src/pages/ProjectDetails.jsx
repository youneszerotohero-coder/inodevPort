import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id || p.id === Number(id));
    if (foundProject) {
      setProject(foundProject);
    } else {
      // Handle not found
      navigate('/');
    }
  }, [id, navigate]);

  if (!project) return null;

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const setSpecificImage = (index) => {
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-16 px-4 md:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/#work" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img 
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  custom={direction}
                  variants={{
                    enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
                    center: { x: 0, opacity: 1, zIndex: 1 },
                    exit: (direction) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, zIndex: 0 })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                />
              </AnimatePresence>
              
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm text-black rounded-full hover:bg-white transition-colors shadow-lg z-10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm text-black rounded-full hover:bg-white transition-colors shadow-lg z-10"
                  >
                    <ChevronRight size={24} />
                  </button>
                  
                  {/* Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSpecificImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {project.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSpecificImage(index)}
                  className={`relative w-24 aspect-video flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col justify-start">
            <span className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#6366f1] to-[#06b6d4] text-transparent bg-clip-text mb-0 block w-fit">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-2 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {project.extendedDescription || project.description}
            </p>

            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all w-fit mt-8"
              >
                View Live
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
