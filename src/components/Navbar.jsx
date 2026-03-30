import React from 'react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-gray-900 bg-gray-950/80 backdrop-blur-md py-4">
            {/* Cambiamos max-w-7xl por w-full 
                Añadimos px-8 (móvil) y md:px-16 (escritorio) para que respire en los bordes
            */}
            <div className="w-full px-8 md:px-16 flex justify-between items-center">
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent tracking-tighter">
                    Emi.dev
                </h1>

                <div className="flex items-center gap-10 text-sm font-medium text-gray-400">
                    <a href="#sobre-mi" className="hover:text-cyan-400 transition-colors">Sobre mí</a>
                    <a href="#proyectos" className="hover:text-cyan-400 transition-colors">Proyectos</a>
                    <a href="#contacto"
                        className="px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 hover:border-cyan-500 hover:text-white transition-all">
                        Contacto
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;