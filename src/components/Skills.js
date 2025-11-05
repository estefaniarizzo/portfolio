import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react'; // Eliminadas Iconos no usados

const Skills = ({ darkMode, data }) => {
  const sectionBg = darkMode ? 'bg-gray-800' : 'bg-gray-50';
  const iconBg = darkMode ? 'bg-teal-900/20' : 'bg-teal-100';
  const iconColor = darkMode ? 'text-teal-400' : 'text-teal-600';
  const titleText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-700' : 'bg-white';
  const cardHover = 'hover:shadow-lg';
  const cardTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const listItem = darkMode ? 'text-gray-400' : 'text-gray-600';
  const dotBg = darkMode ? 'bg-blue-400' : 'bg-blue-500';
  const iconGradient = darkMode 
    ? 'from-blue-600 to-teal-600' 
    : 'from-blue-500 to-teal-500';

  if (!data || !data.skills) return null;

  const skillCategories = Object.keys(data.skills);

  return (
    <section id="skills" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Code className={`w-8 h-8 ${iconColor}`} />
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold ${titleText} mb-4`}>Habilidades Técnicas</h2>
          <p className={descText}>Herramientas y tecnologías que domino para crear soluciones frontend de alto impacto.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((categoryName, index) => {
            const items = data.skills[categoryName];
            // Se usa un icono genérico, ya que los iconos individuales no están en la bd
            const Icon = Code; 
            return (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${cardBg} rounded-2xl p-6 shadow-md ${cardHover} transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-r ${iconGradient} rounded-xl flex items-center justify-center mr-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-semibold ${cardTitle}`}>{categoryName}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index + i) * 0.05 }}
                      className={`flex items-center ${listItem}`}
                    >
                      <div className={`w-2 h-2 ${dotBg} rounded-full mr-3`} />
                      {item.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;