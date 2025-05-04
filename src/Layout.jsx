import { Link } from "wasp/client/router";
import { useAuth, logout } from "wasp/client/auth";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import "./Main.css";

export const Layout = () => {
  const { data: user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white text-gray-900 p-4 shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-semibold">Nabhi ta2's</h1>
          </Link>
          {user ? (
            <span className="text-sm flex items-center">
              Hola, {user.identities.username?.id}!{' '}
              <button
                onClick={logout}
                className="ml-4 text-yellow-500 hover:text-yellow-400 font-semibold"
              >
                Cerrar sesión
              </button>
            </span>
          ) : (
            <Link to="/login" className="underline text-sm text-yellow-500 hover:text-yellow-400">
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
