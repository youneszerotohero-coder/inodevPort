import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import Header from './components/Header'
import Footer from './components/Footer'

const AnimatedRoutes = () => {
  const location = useLocation();
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
    <Router>
      <main className="w-full min-h-screen bg-white text-black relative">
        <Header />
        <AnimatedRoutes />
        <Footer />
      </main>
    </Router>
  )
}

export default App
