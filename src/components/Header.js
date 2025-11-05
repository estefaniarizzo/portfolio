import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/about', label: 'Acerca de' },
    { to: '/skills', label: 'Habilidades' },
    { to: '/experience', label: 'Experiencia' },
    { to: '/education', label: 'Educación' },
    { to: '/certifications', label: 'Certificaciones' },
    { to: '/projects', label: 'Proyectos' },
    { to: '/contact', label: 'Contacto' }
  ];

  const headerBg = darkMode ? 'bg-gray-900/90' : 'bg-white/90';
  const borderColor = darkMode ? 'border-gray-700/50' : 'border-gray-200/50';
  const textColor = darkMode ? 'text-gray-200' : 'text-gray-800';
  const navText = darkMode ? 'text-gray-300' : 'text-gray-600';
  const navActive = darkMode ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600';
  const navHover = darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600';
  const logoGradient = darkMode ? 'from-blue-400 to-teal-400' : 'from-blue-600 to-teal-500';
  const menuBg = darkMode ? 'bg-gray-900/80' : 'bg-white/80';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full ${headerBg} backdrop-blur-md z-50 shadow-sm border-b ${borderColor}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-3">
          <motion.div
            className={`text-2xl font-bold bg-gradient-to-r ${logoGradient} bg-clip-text text-transparent`}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/">LERF</Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ scale: 1.05 }}
                className={`${
                  location.pathname === link.to
                    ? `${navActive}`
                    : `${navText} ${navHover}`
                }`}
              >
                <Link to={link.to}>{link.label}</Link>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleDarkMode}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} className={textColor} /> : <Menu size={24} className={textColor} />}
            </motion.button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`md:hidden pb-4 space-y-4 ${menuBg}`}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ x: 5 }}
                className={`${
                  location.pathname === link.to
                    ? `${navActive} font-semibold`
                    : `${navText} ${navHover}`
                }`}
              >
                <Link to={link.to} onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Header;