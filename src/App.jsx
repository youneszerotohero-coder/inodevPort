import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactDialog from './components/ContactDialog'
import { ContactProvider } from './context/ContactContext'

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // For any other page navigation or home without hash, scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ContactProvider>
      <Router>
        <main className="w-full min-h-screen bg-white text-black relative">
          <Header />
          <AnimatedRoutes />
          <Footer />
          <ContactDialog />
        </main>
      </Router>
    </ContactProvider>
  )
}

export default App
