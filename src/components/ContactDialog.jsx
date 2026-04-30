import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Mail, Phone, ArrowRight } from 'lucide-react';
import { useContact } from '../context/ContactContext';

const ContactDialog = () => {
  const { isOpen, closeContact } = useContact();

  const contactMethods = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <MessageSquare className="w-[18px] h-[18px]" />,
      value: '0798119954',
      label: 'WhatsApp',
      gradient: 'from-emerald-500 to-emerald-600',
      shadow: 'rgba(16, 185, 129, 0.25)',
      link: 'https://wa.me/213798119954',
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail className="w-[18px] h-[18px]" />,
      value: 'inodevdz@gmail.com',
      label: 'Email',
      gradient: 'from-indigo-500 to-violet-600',
      shadow: 'rgba(99, 102, 241, 0.25)',
      link: 'mailto:inodevdz@gmail.com',
    },
    {
      id: 'phone',
      name: 'Phone',
      icon: <Phone className="w-[18px] h-[18px]" />,
      value: '+213 798 119 954',
      label: 'Phone',
      gradient: 'from-blue-500 to-sky-500',
      shadow: 'rgba(59, 130, 246, 0.25)',
      link: 'tel:+213798119954',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContact}
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-md bg-[#0d0d0d] border border-white/10 rounded-[1.75rem] overflow-hidden shadow-2xl p-6 sm:p-8"
          >
            {/* Close Button */}
            <button
              onClick={closeContact}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl sm:text-2xl font-semibold text-white mb-1 tracking-tight"
              >
                Let's connect
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-sm text-white/40"
              >
                Pick how you'd like to reach us
              </motion.p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2.5">
              {contactMethods.map((method, idx) => (
                <motion.a
                  key={method.id}
                  href={method.link}
                  target={method.id === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.08 }}
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.975 }}
                  className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r ${method.gradient} transition-opacity duration-200`}
                  style={{ boxShadow: `0 8px 24px -6px ${method.shadow}` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-white/70 font-medium uppercase tracking-widest mb-0.5">
                        {method.label}
                      </p>
                      <p className="text-[15px] font-semibold text-white truncate">
                        {method.value}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center text-white flex-shrink-0 ml-2 group-hover:bg-white group-hover:text-black transition-all duration-200">
                    <ArrowRight size={14} />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-white/30">
                Prefer a meeting?{' '}
                <span className="text-white/60 cursor-pointer hover:text-white transition-colors underline underline-offset-2">
                  Schedule a call
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactDialog;