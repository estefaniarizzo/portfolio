import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

const Experience = ({ darkMode, data }) => {
  const sectionBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const iconBg = darkMode ? 'bg-green-900/20' : 'bg-green-100';
  const iconColor = darkMode ? 'text-green-400' : 'text-green-600';
  const titleText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const cardHover = darkMode ? 'hover:bg-gray-600' : 'hover:bg-white';
  const cardHoverShadow = 'hover:shadow-md';
  const expTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const periodText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const companyText = darkMode ? 'text-blue-400' : 'text-blue-600';
  const locationText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const descContent = darkMode ? 'text-gray-300' : 'text-gray-600';
  const lineGradient = darkMode 
    ? 'from-blue-400 to-teal-400' 
    : 'from-blue-500 to-teal-500';

  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
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
            <Calendar className={`w-8 h-8 ${iconColor}`} />
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold ${titleText} mb-4`}>Experiencia Laboral</h2>
          <p className={descText}>Mi trayectoria profesional en desarrollo frontend y roles relacionados.</p>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-6 p-6 ${cardBg} rounded-2xl ${cardHover} ${cardHoverShadow} transition-all`}
            >
              <div className={`w-2 h-full bg-gradient-to-b ${lineGradient} rounded-full flex-shrink-0`} />
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className={`text-xl font-semibold ${expTitle}`}>{exp.title}</h3>
                  <span className={periodText}>{exp.period}</span>
                </div>
                <h4 className={`text-lg font-medium ${companyText} mb-1`}>{exp.company}</h4>
                <div className={`flex items-center ${locationText} mb-3`}>
                  <MapPin className="w-4 h-4 mr-1" />
                  {exp.location}
                </div>
                <p className={descContent}>{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;