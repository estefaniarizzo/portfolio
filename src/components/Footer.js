import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = ({ darkMode }) => {
  const footerBg = darkMode ? 'bg-gray-800' : 'bg-gray-900';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-800';

  return (
    <footer className={`${footerBg} text-white py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold mb-2">Lina Estefanía Rizo Forero</h3>
          <p className="text-gray-400">Frontend Developer apasionada por la innovación.</p>
        </motion.div>

        <div className={`border-t ${borderColor} pt-6 text-gray-400`}>
          <p>&copy; 2024 Lina Estefanía Rizo Forero. Hecho con <Heart className="w-4 h-4 inline text-red-500 mx-1" /> en Colombia.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;