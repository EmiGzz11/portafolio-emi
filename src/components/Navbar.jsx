import React, { useState } from 'react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-gray-900 bg-gray-950/80 backdrop-blur-md py-4">
            <div className="w-full px-8 md:px-16 flex justify-between items-center">
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent tracking-tighter">
                    Emi.dev
                </h1>

                <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
                    <a href="#sobre-mi" className="hover:text-cyan-400 transition-colors">Sobre mí</a>
                    <a href="#proyectos" className="hover:text-cyan-400 transition-colors">Proyectos</a>
                    <a href="#contacto"
                        className="px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 hover:border-cyan-500 hover:text-white transition-all">
                        Contacto
                    </a>
                </div>
                <button
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <span className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 w-6 bg-gray-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden flex flex-col items-start gap-4 px-8 pt-4 pb-6 text-sm font-medium text-gray-400 border-t border-gray-900 bg-gray-950/95">
                    <a href="#sobre-mi" onClick={closeMenu} className="hover:text-cyan-400 transition-colors w-full">Sobre mí</a>
                    <a href="#proyectos" onClick={closeMenu} className="hover:text-cyan-400 transition-colors w-full">Proyectos</a>
                    <a href="#contacto" onClick={closeMenu}
                        className="px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-100 hover:border-cyan-500 hover:text-white transition-all">
                        Contacto
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;