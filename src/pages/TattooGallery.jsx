import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Galeria() {
  const [categoriaActiva, setCategoriaActiva] = useState('Tatuajes');
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const categorias = ['Tatuajes', 'Flashes'];

  const imagenes = {
    Tatuajes: Array.from({ length: 9 }, (_, i) => `/img/galeria/tatuaje${i + 1}.JPG`),
    Flashes: Array.from({ length: 9 }, (_, i) => `/img/galeria/flash${i + 1}.jpg`),
  };

  const abrirImagen = (src) => setImagenSeleccionada(src);
  const cerrarImagen = () => setImagenSeleccionada(null);

  return (
    <motion.div
      className="bg-gray-50 text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="relative w-full">
        <img
          src="/img/banner.jpg"
          alt="Tatuaje en proceso"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">GALERÍA</h1>
        </div>
      </div>

      {/* Botones de categoría */}
      <div className="flex justify-center gap-6 py-6">
        {categorias.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 font-semibold border rounded-lg transition duration-300 ease-in-out ${
              categoriaActiva === cat
                ? 'bg-black text-yellow-400 border-yellow-400'
                : 'bg-yellow-400 text-black border-yellow-500 hover:bg-yellow-300'
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Galería con animaciones por categoría */}
      <div className="max-w-6xl mx-auto px-4 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {imagenes[categoriaActiva].map((src, i) => (
            <motion.div
              key={src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="relative group cursor-pointer"
              onClick={() => abrirImagen(src)}
            >
              <img
                src={src}
                alt={`${categoriaActiva} ${i + 1}`}
                className="aspect-square object-cover rounded-lg shadow-lg group-hover:scale-105 transition duration-300 ease-in-out"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal con animación */}
      <AnimatePresence>
        {imagenSeleccionada && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-pointer"
            onClick={cerrarImagen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-black p-2"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={cerrarImagen}
                className="absolute top-0 right-0 text-white text-2xl bg-black p-2 rounded-full hover:bg-red-500 transition"
              >
                X
              </button>
              <img
                src={imagenSeleccionada}
                alt="Imagen ampliada"
                className="max-w-screen-md max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-white text-black text-center py-4 text-sm">
        © 2025 Nabhi C. Todos los derechos reservados.
      </footer>
    </motion.div>
  );
}