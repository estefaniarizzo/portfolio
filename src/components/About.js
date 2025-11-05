import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const About = ({ darkMode, data }) => {
  const sectionBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const iconBg = darkMode ? 'bg-blue-900/20' : 'bg-blue-100';
  const iconColor = darkMode ? 'text-blue-400' : 'text-blue-600';
  const titleText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const contentText = darkMode ? 'text-gray-300' : 'text-gray-700';
  const keyBg = darkMode 
    ? 'from-gray-700 to-gray-800' 
    : 'from-blue-50 to-teal-50';
  const keyTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const keyList = darkMode ? 'text-gray-400' : 'text-gray-600';

  if (!data) return null;

  return (
    <section id="about" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
            whileHover={{ scale: 1.1 }}
          >
            <User className={`w-8 h-8 ${iconColor}`} />
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold ${titleText} mb-4`}>Acerca de Mí</h2>
          <p className={`${descText} max-w-3xl mx-auto`}>Descubre quién soy y qué me impulsa en el mundo del desarrollo frontend.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <p className={`text-lg ${contentText} leading-relaxed mb-8`}>
              {data.about_text}
            </p>
          </div>
          <motion.div
            className={`bg-gradient-to-br ${keyBg} rounded-3xl p-8`}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className={`text-2xl font-semibold ${keyTitle} mb-4`}>Datos Clave</h3>
            <ul className={`space-y-4 ${keyList}`}>
              {data.about_key_facts && data.about_key_facts.map((fact, index) => (
                <li key={index}>• {fact}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;