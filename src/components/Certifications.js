import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Certifications = ({ darkMode, data }) => {
  const sectionBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const iconBg = darkMode ? 'bg-indigo-900/20' : 'bg-indigo-100';
  const iconColor = darkMode ? 'text-indigo-400' : 'text-indigo-600';
  const titleText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardGradient = darkMode 
    ? 'from-gray-700 to-gray-800' 
    : 'from-indigo-50 to-blue-50';
  const cardBorder = darkMode ? 'border-indigo-700' : 'border-indigo-200';
  const certTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const issuerText = darkMode ? 'text-blue-400' : 'text-blue-600';
  const yearText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const descContent = darkMode ? 'text-gray-300' : 'text-gray-600';

  if (!data || data.length === 0) return null;

  return (
    <section id="certifications" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.4 }}
          >
            <Shield className={`w-8 h-8 ${iconColor}`} />
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold ${titleText} mb-4`}>Certificaciones</h2>
          <p className={descText}>Credenciales que validan mi expertise en tecnologías clave.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {data.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${cardGradient} rounded-2xl p-6 text-center border ${cardBorder}`}
            >
              <h3 className={`text-xl font-bold ${certTitle} mb-2`}>{cert.title}</h3>
              <p className={`${issuerText} font-medium mb-1`}>{cert.issuer}</p>
              <p className={`text-sm ${yearText} mb-3`}>{cert.year}</p>
              <p className={`text-sm ${descContent}`}>{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;