import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { supabase } from './supabaseClient'; // Importa el cliente Supabase

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cargar preferencia de modo oscuro
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
    }
    
    // Cargar datos del portafolio desde Supabase
    async function fetchAllData() {
      setLoading(true);
      try {
        // Fetch portfolio_data
        const { data: mainData, error: mainError } = await supabase
          .from('portfolio_data')
          .select('*')
          .limit(1);

        if (mainError) throw mainError;
        if (!mainData || mainData.length === 0) {
          setError('No portfolio data found.');
          setLoading(false);
          return;
        }

        const portfolioId = mainData[0].id;
        
        // Fetch related data
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('portfolio_id', portfolioId)
          .order('order_index', { ascending: true });

        const { data: skills, error: skillsError } = await supabase
          .from('skills')
          .select('*')
          .eq('portfolio_id', portfolioId)
          .order('order_index', { ascending: true });
        
        const { data: experience, error: experienceError } = await supabase
          .from('experience')
          .select('*')
          .eq('portfolio_id', portfolioId)
          .order('order_index', { ascending: true });

        const { data: education, error: educationError } = await supabase
          .from('education')
          .select('*')
          .eq('portfolio_id', portfolioId)
          .order('order_index', { ascending: true });

        const { data: certifications, error: certificationsError } = await supabase
          .from('certifications')
          .select('*')
          .eq('portfolio_id', portfolioId)
          .order('order_index', { ascending: true });


        if (projectsError) throw projectsError;
        if (skillsError) throw skillsError;
        if (experienceError) throw experienceError;
        if (educationError) throw educationError;
        if (certificationsError) throw certificationsError;


        // Group skills by category
        const skillsByCategory = skills.reduce((acc, skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = [];
          }
          acc[skill.category].push(skill);
          return acc;
        }, {});

        setPortfolioData({
          ...mainData[0],
          projects,
          skills: skillsByCategory,
          experience,
          education,
          certifications
        });

      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError('Failed to load portfolio data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p>Cargando los datos de Lina... ¡esto va a quedar genial!</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
  
  if (!portfolioData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p>Parece que no hay datos de portafolio para mostrar. ¡Es hora de agregar algunos!</p>
      </div>
    );
  }


  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero darkMode={darkMode} data={portfolioData} />
              <About darkMode={darkMode} data={portfolioData} />
              <Skills darkMode={darkMode} data={portfolioData} />
              <Experience darkMode={darkMode} data={portfolioData.experience} />
              <Education darkMode={darkMode} data={portfolioData.education} />
              <Certifications darkMode={darkMode} data={portfolioData.certifications} />
              <Projects darkMode={darkMode} data={portfolioData.projects} />
              <Contact darkMode={darkMode} data={portfolioData} />
            </>
          } />
          <Route path="/about" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <About darkMode={darkMode} data={portfolioData} />
            </motion.main>
          } />
          <Route path="/skills" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Skills darkMode={darkMode} data={portfolioData} />
            </motion.main>
          } />
          <Route path="/experience" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Experience darkMode={darkMode} data={portfolioData.experience} />
            </motion.main>
          } />
          <Route path="/education" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Education darkMode={darkMode} data={portfolioData.education} />
            </motion.main>
          } />
          <Route path="/certifications" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Certifications darkMode={darkMode} data={portfolioData.certifications} />
            </motion.main>
          } />
          <Route path="/projects" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Projects darkMode={darkMode} data={portfolioData.projects} />
            </motion.main>
          } />
          <Route path="/contact" element={
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Contact darkMode={darkMode} data={portfolioData} />
            </motion.main>
          } />
        </Routes>
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;