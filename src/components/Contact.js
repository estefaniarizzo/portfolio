import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Users } from 'lucide-react';

const Contact = ({ darkMode, data }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
    alert('¡Mensaje enviado! Te contactaré pronto. 😊');
  };

  const sectionBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const iconBg = darkMode ? 'bg-red-900/20' : 'bg-red-100';
  const iconColor = darkMode ? 'text-red-400' : 'text-red-600';
  const titleText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const infoTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const contactCardBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const labelText = darkMode ? 'text-gray-300' : 'text-gray-600';
  const linkText = darkMode ? 'text-blue-400' : 'text-blue-600';
  const iconGradient = darkMode 
    ? 'from-blue-600 to-teal-600' 
    : 'from-blue-500 to-teal-500';
  const formBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const inputBg = darkMode ? 'bg-gray-600' : 'bg-white';
  const inputText = darkMode ? 'text-gray-100' : 'text-gray-900';
  const inputBorder = darkMode ? 'border-gray-600' : 'border-gray-300';
  const inputPlaceholder = darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500';
  const focusRing = darkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-500';
  const formTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const btnGradient = darkMode 
    ? 'from-blue-600 to-teal-600' 
    : 'from-blue-500 to-teal-500';

  if (!data) return null;

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: data.contact_email,
      link: `mailto:${data.contact_email}`
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: data.contact_phone,
      link: `tel:${data.contact_phone}`
    },
    {
      icon: Users,
      label: 'LinkedIn',
      value: data.contact_linkedin ? data.contact_linkedin.replace('https://', '') : '',
      link: data.contact_linkedin
    }
  ].filter(info => info.value); // Filtrar si no hay valores

  return (
    <section id="contact" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
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
            <Mail className={`w-8 h-8 ${iconColor}`} />
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold ${titleText} mb-4`}>Contacto</h2>
          <p className={descText}>¡Hablemos de colaboraciones o proyectos! Estoy aquí para conectar.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className={`text-2xl font-semibold ${infoTitle}`}>Información de Contacto</h3>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className={`flex items-center space-x-4 p-4 ${contactCardBg} rounded-xl`}
                >
                  <div className={`w-10 h-10 ${iconGradient} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-medium ${labelText}`}>{info.label}</p>
                    <a href={info.link} className={`${linkText} hover:underline block mt-1`}>
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`${formBg} rounded-2xl p-8`}
          >
            <h3 className={`text-2xl font-semibold ${formTitle} mb-6`}>Envíame un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent ${inputBg} ${inputText} ${inputPlaceholder}`}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Tu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent ${inputBg} ${inputText} ${inputPlaceholder}`}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Tu mensaje"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border ${inputBorder} rounded-xl focus:outline-none focus:ring-2 ${focusRing} focus:border-transparent resize-none ${inputBg} ${inputText} ${inputPlaceholder}`}
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={0.95}
                className={`w-full bg-gradient-to-r ${btnGradient} text-white py-3 rounded-xl font-semibold`}
              >
                Enviar Mensaje
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;