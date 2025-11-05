import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from './ImageUploader';
import { supabase } from '../supabaseClient';
import { Edit } from 'lucide-react';


const Hero = ({ darkMode, data, onDataUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [localAvatarUrl, setLocalAvatarUrl] = useState(data?.avatar_url || null);

  const bgGradient = darkMode 
    ? 'from-gray-900 via-gray-800 to-gray-900' 
    : 'from-blue-50 via-teal-50 to-green-50';
  const avatarGradient = darkMode 
    ? 'from-blue-600 to-teal-600' 
    : 'from-blue-400 to-teal-500';
  const avatarBorder = darkMode ? 'border-gray-800' : 'border-white';
  const avatarBg = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  const avatarText = darkMode ? 'text-gray-400' : 'text-gray-500';
  const titleGradient = darkMode ? 'from-blue-400 to-teal-400' : 'from-blue-600 to-teal-600';
  const subtitleText = darkMode ? 'text-gray-300' : 'text-gray-700';
  const descText = darkMode ? 'text-gray-400' : 'text-gray-600';

  const handleAvatarUpload = async (newUrl) => {
    if (newUrl && data) {
      try {
        // Actualizar localmente
        setLocalAvatarUrl(newUrl);
        if (onDataUpdate) {
          onDataUpdate({ ...data, avatar_url: newUrl });
        }

        // Actualizar en Supabase
        const { error } = await supabase
          .from('portfolio_data')
          .update({ avatar_url: newUrl })
          .eq('id', data.id);

        if (error) throw error;
        setEditing(false);
      } catch (err) {
        console.error('Error updating avatar:', err);
        alert('¡Error al guardar la imagen de perfil! Intenta de nuevo.');
        // Revertir
        setLocalAvatarUrl(data.avatar_url);
      }
    }
  };

  const toggleEdit = () => {
    setEditing(!editing);
  };

  if (!data) return null;

  return (
    <section className={`min-h-screen flex items-center justify-center ${bgGradient} py-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`w-48 h-48 md:w-64 md:h-64 ${avatarGradient} rounded-full flex items-center justify-center mx-auto mb-8 overflow-hidden ${avatarBorder} shadow-xl relative`}
        >
          <div className="relative w-full h-full">
            {editing ? (
              <ImageUploader
                onUploadComplete={handleAvatarUpload}
                folder="avatars"
                initialImageUrl={localAvatarUrl}
                className="w-full h-full rounded-full"
              />
            ) : (
              <>
                {localAvatarUrl ? (
                  <img src={localAvatarUrl} alt={data.full_name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${avatarBg}`}>
                    <span className={`${avatarText} text-4xl`}>👩‍💻</span>
                  </div>
                )}
                <motion.button
                  onClick={toggleEdit}
                  className="absolute bottom-2 right-2 p-2 bg-blue-500 text-white rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Edit className="w-5 h-5" />
                </motion.button>
              </>
            )}
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}
        >
          {data.full_name}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`text-2xl md:text-3xl font-semibold ${subtitleText} mb-6`}
        >
          {data.title}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className={`text-lg md:text-xl ${descText} max-w-2xl mx-auto leading-relaxed`}
        >
          {data.hero_description}
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;