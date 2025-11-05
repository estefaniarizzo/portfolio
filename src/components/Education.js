import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = ({ darkMode, data }) => {
  const sectionBg = darkMode ? 'bg-gray-800' : 'bg-gray-50';
  const iconBg = darkMode ? 'bg-purple-900/20' : 'bg-purple-100';
  const iconColor = darkMode ? 'text-purple-400' : 'text-purple-600';
  const titleText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-700' : 'bg-white';
  const cardBorder = darkMode ? 'border-gray-600' : 'border-gray-100';
  const cardHover = 'hover:shadow-md transition-shadow';
  const eduTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const periodBg = darkMode ? 'bg-blue-900/20' : 'bg-blue-100';
  const periodText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const instText = darkMode ? 'text-gray-300' : 'text-gray-700';
  const contentText = darkMode ? 'text-gray-400' : 'text-gray-600';

  if (!data || data.length === 0) return null;

  return (
    <section id="education" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
            whileHover={{ scale: 1.1 }}
          >
            <GraduationCap className={`w-8 h-8 ${iconColor}`} />
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold ${titleText} mb-4`}>Educación</h2>
          <p className={descText}>Mi formación académica y cursos que han moldeado mi carrera.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`${cardBg} rounded-xl p-6 shadow-sm ${cardHover} border ${cardBorder}`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-xl font-semibold ${eduTitle}`}>{edu.title}</h3>
                <span className={`text-sm ${periodText} ${periodBg} px-2 py-1 rounded-full`}>{edu.period}</span>
              </div>
              <h4 className={`text-lg font-medium ${instText} mb-2`}>{edu.institution}</h4>
              <p className={contentText}>{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;