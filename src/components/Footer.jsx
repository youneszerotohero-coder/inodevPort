import React from 'react';
import RotatingText from './RotatingText';
import { ArrowUpRight, Mail } from 'lucide-react';

const Instagram = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Tiktok = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.39 6.39 0 005.4 15.6 6.39 6.39 0 0011.8 22a6.28 6.28 0 006.35-6.19v-5.24a8.31 8.31 0 004.85 1.55v-3.41a4.93 4.93 0 01-3.41-2.02z" /></svg>;
import { motion } from 'framer-motion';
import { useContact } from '../context/ContactContext';

export default function Footer() {
  const { openContact } = useContact();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black text-white pt-16 px-6 md:px-12 w-full min-h-[80vh] relative overflow-hidden flex flex-col items-center justify-between border-t border-white/10">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-gradient-to-b from-[#6366f1]/20 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10 flex flex-col flex-grow">
        
        {/* Main CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-24 flex-grow">
          <div className="max-w-4xl">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-[6vw] font-extrabold tracking-tighter leading-[1.1] mb-10 flex flex-col items-start"
            >
              <span className="text-[#888888] mb-2">Have an idea?</span>
              <span className="flex items-center gap-3 md:gap-6 flex-wrap text-white">
                Let's
                <RotatingText
                  texts={['build', 'design', 'launch', 'scale']}
                  mainClassName="text-white overflow-hidden py-1 md:py-2 justify-center rounded-2xl inline-flex"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
                it.
              </span>
            </motion.h2>
          </div>

          {/* Socials & Location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-10 w-full md:w-auto mb-0 md:mb-20 mr-14"
          >
            <div>
              <p className="text-gray-500 font-bold mb-5 uppercase tracking-[0.2em] text-xs">Socials</p>
              <div className="flex gap-4 mt-2">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/yuzusii" },
                  { icon: Tiktok, href: "https://www.tiktok.com/@inodev.dz" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank"
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:border-transparent transition-all duration-300 hover:scale-110 group hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    <social.icon size={22} className="text-gray-400 group-hover:text-black transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-0 bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500 mb-8 gap-6 z-10 relative">
          <p>© {currentYear} INODEV. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Huge Background Text */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center items-end overflow-hidden pointer-events-none z-0">
        <h2 
          className="text-[22vw] leading-[0.75] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/[0.3] to-transparent uppercase select-none w-full text-center translate-y-[1em] md:translate-y-[15%]"
        >
          INODEV
        </h2>
      </div>
    </footer>
  );
}
