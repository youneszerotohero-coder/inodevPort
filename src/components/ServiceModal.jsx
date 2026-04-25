import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

const ServiceModal = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={`relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]`}
          >
            {/* Left/Top Decor Section */}
            <div className={`md:w-2/5 p-8 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${service.color}`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)] pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20 text-white">
                  {service.icon}
                </div>
                {/* Close Button Mobile */}
                <button 
                  onClick={onClose}
                  className="md:hidden bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative z-10 mt-12 md:mt-24">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-md">
                  {service.title}
                </h2>
                <p className="text-white/90 text-lg leading-relaxed font-light drop-shadow-md">
                  {service.shortDesc}
                </p>
              </div>
            </div>

            {/* Right/Bottom Content Section */}
            <div className="md:w-3/5 p-8 md:p-10 flex flex-col bg-white overflow-y-auto">
              {/* Close Button Desktop */}
              <div className="hidden md:flex justify-end mb-6">
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-black transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-black mb-4">Overview</h3>
                <p className="text-gray-600 leading-relaxed mb-8 font-light">
                  {service.fullDesc}
                </p>

                <h3 className="text-xl font-semibold text-black mb-4">What's Included</h3>
                <div className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      key={idx} 
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <CheckCircle2 size={20} className="text-[#06b6d4] shrink-0" />
                      <span className="font-medium text-[15px]">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-gray-100">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_24px_rgba(99,102,241,0.3)]"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  }}
                >
                  Let's Discuss Your Project
                  <ArrowRight size={20} className="text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
