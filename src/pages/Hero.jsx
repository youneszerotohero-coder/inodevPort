import React from 'react';
import SplitText from '../components/SplitText';
import DotField from '../components/DotField';

const Hero = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed');
  };

  return (
    <section className="relative w-full h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Background DotField */}
      <div className="absolute inset-0 z-0">
        <div style={{ width: '100vw', height: '100%' }}>
          <DotField
            dotRadius={1.5}
            dotSpacing={30}
            bulgeStrength={67}
            glowRadius={0}
            sparkle={false}
            waveAmplitude={3}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly
            gradientFrom="#000000"
            gradientTo="#06b6d4"
            glowColor="#ffffffff"
          />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="mt-12 relative z-10 flex flex-col items-center justify-center pointer-events-none px-4 gap-6">
        <div className='flex flex-col items-center justify-center gap-2 md:gap-4 w-full'>
          {/* Main Headline */}
          <SplitText
            text="We Build Ideas Into"
            className="text-[11vw] sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.2] px-2"
            delay={50}
            duration={2}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            showCallback
          />

          {/* Gradient Accent Line */}
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap w-full px-2">
            <SplitText
              text="Digital"
              className="text-[11vw] sm:text-5xl md:text-6xl font-bold text-black tracking-tight leading-[1.2]"
              delay={120}
              duration={2}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <SplitText
              text="Reality."
              className="text-[11vw] sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.2]"
              delay={180}
              duration={2.5}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              gradientColors={['#6366f1', '#06b6d4']}
            />
          </div>
        </div>
      
        <SplitText
          text="We're a development agency that transforms your vision into high-performing digital products. From sleek web,desktop & mobile apps to scalable platforms"
          className="text-gray-500 text-lg md:text-lg text-center max-w-2xl font-light"
          delay={100}
          duration={1.5}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-50px"
        />

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a 
            href="#contact" 
            className="pointer-events-auto px-10 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.3)',
            }}
          >
            Let's Build Together →
          </a>
          <a 
            href="#work" 
            className="pointer-events-auto px-10 py-4 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 bg-transparent border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          >
            Our Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;