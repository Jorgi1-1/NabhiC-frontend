import React, { useEffect } from 'react';
import { Link } from 'wasp/client/router';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="font-sans text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Banner */}
<div className="relative mt-16 h-[400px]">
  <motion.img
    src="/img/banner.jpg"
    alt="Tatuaje en proceso"
    className="w-full h-full object-cover"
    initial={{ scale: 1.2 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1.2 }}
  />
  <motion.h1
    className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl text-white font-extrabold"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
  >
    BIENVENIDO A NABHI C.
  </motion.h1>
</div>


        {/* Sobre mí */}
        <motion.section
          className="p-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-2">Sobre mí</h2>
          <p className="text-gray-700">
            Soy una tatuadora apasionada por crear tatuajes únicos con un alto nivel de calidad y técnica. Valoro la libertad artística, la diversidad y, sobre todo, la conexión humana. Trabajo con diferentes estilos que van desde las técnicas tradicionales, pasando por la fine line, el blackwork, el realismo, el lettering, y lo geométrico. Mi objetivo es hacer de cada tatuaje una obra de arte que refleje tu personalidad y tus emociones.
          </p>
        </motion.section>

        {/* Galería */}
        <section className="p-6" data-aos="fade-up">
          <h2 className="text-xl font-bold mb-4">Galería de tatuajes</h2>
          <h5 className="text-m font-bold mb-2">Favoritos</h5>
          <div className="flex flex-wrap justify-center gap-4">
            {['tatuaje1.jpg', 'tatuaje2.jpg', 'tatuaje3.jpg'].map((img, i) => (
              <img
                key={img}
                src={`/img/${img}`}
                alt={`Tatuaje ${i + 1}`}
                className="w-40 h-56 object-cover rounded shadow"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              />
            ))}
          </div>
          <Link to="/gallery">
            <button className="mt-4 bg-yellow-400 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-300">
              Ver más
            </button>
          </Link>
        </section>

        {/* Preguntas frecuentes */}
        <section className="bg-gray-100 py-6 px-4" data-aos="fade-up">
          <h2 className="text-xl font-bold mb-4">Preguntas frecuentes</h2>

          {[
            ['¿Cuánto tiempo tarda en hacerse un tatuaje?', 'El tiempo varía dependiendo del tamaño y la complejidad del diseño. Puede durar desde una hora hasta varias sesiones, según lo que busques.'],
            ['¿Es seguro tatuarse?', 'Sí, utilizo equipo completamente esterilizado y sigo normas estrictas de higiene para garantizar tu seguridad durante todo el proceso.'],
            ['¿Puedo llevar mi propio diseño para el tatuaje?', '¡Por supuesto! Si ya tienes un diseño en mente, estaré encantada de trabajar con él y ayudarte a hacerlo realidad. Para eso, contáctame por Whatsapp.'],
            ['¿Cuánto cuesta un tatuaje?', 'El costo depende de varios factores, como el tamaño, los detalles y la zona del cuerpo. Después de ver el diseño y saber dónde te lo quieres hacer, te proporcionaré un presupuesto estimado.'],
            ['¿Qué cuidados debo tener después de hacerme un tatuaje?', 'Después de tatuarte, es muy importante seguir algunos cuidados para asegurar que tu tatuaje cicatrice correctamente. Te proporcionaré una lista detallada de cuidados, que incluyen mantener la zona limpia, hidratada y protegida del sol.'],
            ['¿Puedo tatuarme si tengo la piel sensible o alguna condición médica?', 'Si tienes alguna condición médica específica, te recomiendo consultar con tu médico antes de hacerte un tatuaje. En general, muchas personas con piel sensible pueden tatuarse sin problemas, pero siempre es mejor asegurarse primero.'],
            ['¿Puedo pedir un diseño específico para un flash?', 'No, los flashes son diseños ya establecidos. Si quisieras cambiar algo tendría que cotizarlo aparte.']
          ].map(([q, a], i) => (
            <div key={i} className="bg-white shadow p-4 mb-4" data-aos="fade-up" data-aos-delay={i * 100}>
              <p className="font-semibold">{q}</p>
              <p>{a}</p>
            </div>
          ))}
        </section>

        {/* Botón flotante de WhatsApp */}
        <motion.a
          href="https://wa.me/522211912994?text=Tengo%20una%20duda"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <img src="/img/whatsapp_icon.png" alt="WhatsApp" className="w-6 h-6" />
          ¿Tienes alguna duda? ¡Contáctame!
        </motion.a>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;