import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Edit } from 'lucide-react';
import ImageUploader from './ImageUploader';
import { supabase } from '../supabaseClient';

const Projects = ({ darkMode, data, onDataUpdate }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(null);

  const sectionBg = darkMode ? 'bg-gray-800' : 'bg-gray-50';
  const iconBg = darkMode ? 'bg-orange-900/20' : 'bg-orange-100';
  const iconColor = darkMode ? 'text-orange-400' : 'text-orange-600';
  const titleText = darkMode ? 'text-gray-200' : 'text-gray-800';
  const descTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-700' : 'bg-white';
  const cardHover = 'hover:shadow-xl transition-shadow';
  const projTitle = darkMode ? 'text-gray-200' : 'text-gray-800';
  const projDesc = darkMode ? 'text-gray-300' : 'text-gray-600';
  const techBg = darkMode ? 'bg-blue-900/20' : 'bg-blue-100';
  const techText = darkMode ? 'text-blue-300' : 'text-blue-700';
  const linkText = darkMode ? 'text-gray-300' : 'text-gray-600';
  const linkHover = darkMode ? 'hover:text-blue-400' : 'hover:text-blue-600';

  const handleImageUpload = async (newUrl, projectId) => {
    if (newUrl && projectId) {
      setSaving(projectId);
      try {
        // Actualizar en Supabase
        const { error } = await supabase
          .from('projects')
          .update({ image_url: newUrl })
          .eq('id', projectId);

        if (error) throw error;

        // Actualizar estado local si existe callback
        if (onDataUpdate) {
          onDataUpdate(prevData => prevData.map(p => p.id === projectId ? { ...p, image_url: newUrl } : p));
        }

        setEditingProject(null);
        alert('¡Imagen actualizada exitosamente!');
      } catch (err) {
        console.error('Error updating project image:', err);
        alert('¡Error al guardar la imagen del proyecto! Intenta de nuevo.');
      } finally {
        setSaving(null);
      }
    }
  };

  const toggleEdit = (projectId) => {
    setEditingProject(editingProject === projectId ? null : projectId);
  };

  if (!data || data.length === 0) {
    return (
      <section id="projects" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
        <div className="text-center">
          <p className={descTextClass}>No hay proyectos para mostrar aún. ¡Añade algunos desde la base de datos!</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={`py-20 px-4 ${sectionBg} transition-colors duration-300`}>
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
            <Code className={`w-8 h-8 ${iconColor}`} />
          </motion.div>
          <h2 className={`text-3xl md:text-4xl font-bold ${titleText} mb-4`}>Proyectos Destacados</h2>
          <p className={descTextClass}>Algunos de mis trabajos recientes que muestran mi habilidad en desarrollo frontend.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.map((project, index) => {
            const isEditing = editingProject === project.id;
            const currentImage = project.image_url || 'https://via.placeholder.com/400x250?text=Project+Image';
            const isSaving = saving === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${cardBg} rounded-2xl overflow-hidden shadow-lg ${cardHover}`}
              >
                <div className="relative">
                  {isEditing ? (
                    <ImageUploader
                      onUploadComplete={(newUrl) => handleImageUpload(newUrl, project.id)}
                      folder="projects"
                      initialImageUrl={currentImage}
                      className="w-full h-48"
                    />
                  ) : (
                    <div className="group cursor-pointer relative">
                      <img src={currentImage} alt={project.title} className="w-full h-48 object-cover" />
                      <motion.button
                        onClick={() => toggleEdit(project.id)}
                        className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}
                  {isSaving && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <p className="text-white text-sm">¡Guardando imagen!</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${projTitle} mb-2`}>{project.title}</h3>
                  <p className={`${projDesc} mb-4`}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies && project.technologies.map((t, i) => (
                      <span key={i} className={`px-3 py-1 ${techBg} ${techText} rounded-full text-sm`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a 
                      href={project.repo_link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`flex items-center ${linkText} ${linkHover}`}
                    >
                      <Code className="w-4 h-4 mr-1" /> Repo
                    </a>
                    <a 
                      href={project.demo_link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`flex items-center ${linkText} ${linkHover}`}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" /> Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;