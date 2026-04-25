import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExpanded(true);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed top-8 z-50 w-full flex justify-center px-4">
            <motion.nav
                layout
                className={`h-13 bg-black text-white p-1 rounded-full flex items-center shadow-2xl border border-white/5 backdrop-blur-md ${isExpanded ? 'gap-6 md:gap-10' : 'gap-0'}`}
                transition={{ layout: { duration: 2, type: "spring", bounce: 0.15 } }}
            >
                {/* logo */}
                <motion.div
                    layout
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: isExpanded ? -360 : 0 }}
                    transition={{
                        scale: { duration: 0.5, type: "spring", bounce: 0.5 },
                        rotate: { duration: 2, type: "spring", bounce: 0.15 }
                    }}
                    className="shrink-0"
                >
                    <img src="inov.png" alt="logo" className="w-10 h-10 rounded-full" />
                </motion.div>

                {/* Links & CTA Wrapper */}
                <AnimatePresence>
                    {isExpanded && (
                        <>
                            {/* Links */}
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
                                className="hidden md:flex items-center font-medium text-[15px] whitespace-nowrap"
                            >
                                <div className="flex gap-8 px-2">
                                    {[
                                        { name: 'Services', href: '#work' },
                                        { name: 'Work', href: '#about' },
                                        { name: 'About', href: '#playground' },
                                        { name: 'Testimonial', href: '#resource' },
                                    ].map((link, i) => (
                                        <motion.a
                                            layout
                                            key={link.name}
                                            href={link.href}
                                            className="hover:text-gray-300 transition-colors"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 + (i * 0.15), duration: 0.5, type: "spring", bounce: 0.3 }}
                                        >
                                            {link.name}
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Contact CTA */}
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2, type: "spring", bounce: 0.15 }}
                                className="whitespace-nowrap"
                            >
                                <motion.a
                                    layout
                                    href="#contact"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5, type: "spring", bounce: 0.4 }}
                                    className="h-10 inline-flex items-center justify-center gap-2 px-5 text-white font-medium text-[14px] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(99,102,241,0.4)] shrink-0"
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                                    }}
                                >
                                    Contact
                                    <ArrowRight size={16} className="text-white" />
                                </motion.a>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
};

export default Header;
