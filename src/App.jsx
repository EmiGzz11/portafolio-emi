import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';


const App = () => {
  return (
    // Eliminamos cualquier contenedor con ancho máximo aquí arriba
    <div className="bg-gray-950 min-h-screen text-gray-50 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* 1. Navegación (Ya configuramos que sea w-full con padding interno) */}
      <Navbar />

      {/* 2. Pantalla de Inicio */}
      <main>
        <Hero />
        <Experience />
        {/* 3. Sección de Proyectos (Asegúrate de que Projects.jsx también use w-full) */}
        <Projects />
        <Contact />
      </main>

      {/* 4. Footer */}
      <footer className="w-full py-12 border-t border-gray-900 bg-gray-950 px-8 md:px-16 flex justify-between items-center text-gray-500 text-sm">
        <p>© 2026 - Emi.dev</p>
        <div className="flex gap-6">
          <span className="hover:text-cyan-400 cursor-pointer transition">GitHub</span>
          <span className="hover:text-cyan-400 cursor-pointer transition">LinkedIn</span>
        </div>
      </footer>
    </div>
  );
};

export default App;