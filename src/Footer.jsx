import React from 'react';
import { Link } from 'wasp/client/router';
import { useLocation } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();
  const hiddenOnPaths = ['/appointments', '/login', '/signup'];
  const shouldHideButton = hiddenOnPaths.includes(location.pathname);

  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold mb-4">Contacto</h2>
        <p className="text-sm mb-2">📧 nannarts3069@gmail.com</p>
        <p className="text-sm mb-2">📞 +52 (221) 191 2994</p>
        <p className="text-sm mb-6">📍 Black Dreams Collective</p>

        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://www.instagram.com/nabhi.tatto?igsh=MWZ2dnl0b3Joc3g0eA=="
            aria-label="Instagram"
            className="flex items-center gap-2 hover:text-yellow-500 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/instagram_icon.png" alt="Instagram" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-medium">Mi Instagram!</span>
          </a>
        </div>

        {/* Botón visible solo si no estamos en alguna de las rutas ocultas */}
        {!shouldHideButton && (
          <Link to="/appointments">
            <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-300 mt-6">
              Agendar cita
            </button>
          </Link>
        )}

        <p className="mt-6 text-xs text-gray-400">© 2025 Nabhi C. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
