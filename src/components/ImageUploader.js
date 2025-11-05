import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Check } from 'lucide-react';
import { supabase } from '../supabaseClient';

const ImageUploader = ({ onUploadComplete, folder = 'general', initialImageUrl = null, className = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(initialImageUrl);
  const [error, setError] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('¡Solo imágenes permitidas, como JPG o PNG!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      setError('La imagen es demasiado grande – máximo 5MB, por favor.');
      return;
    }

    setUploading(true);
    setError(null);

    // Preview local
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);

    // Nombre único
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = fileName;

    try {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('portfolio-images') // Bucket requerido en Supabase
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      if (onUploadComplete) {
        onUploadComplete(publicUrl);
      }

      setPreviewUrl(publicUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError('¡Error al subir! Verifica tu conexión o el bucket en Supabase.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    if (onUploadComplete) {
      onUploadComplete(null);
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={!uploading ? { scale: 1.02 } : {}}
    >
      {previewUrl ? (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="Uploaded preview" 
            className="w-full h-full object-cover rounded-lg" 
          />
          <motion.button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            disabled={uploading}
          >
            <X size={14} />
          </motion.button>
          {uploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>
      ) : (
        <label className="w-full h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-700">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-blue-600">Subiendo imagen...</p>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Haz clic o arrastra para subir</p>
            </>
          )}
        </label>
      )}

      {error && (
        <motion.p 
          className="text-red-500 text-sm mt-2 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onAnimationComplete={() => setTimeout(() => setError(null), 5000)}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default ImageUploader;