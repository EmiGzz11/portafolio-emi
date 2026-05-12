import React, { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import HondaCalculator from './components/HondaCalculator';

const App = () => {
  // Estado para controlar qué vista mostrar
  const [view, setView] = useState('portfolio');

  // Función para volver al portafolio
  const irAlPortfolio = () => {
    setView('portfolio');
    window.scrollTo(0, 0);
  };

  // Función para abrir el simulador
  const irAlSimulador = () => {
    setView('honda');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-950 min-h-screen text-gray-50 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* RENDERIZADO CONDICIONAL */}
      {view === 'portfolio' ? (
        <>
          <Navbar onOpenSimulador={irAlSimulador} />
          <main>
            <Hero />
            <Experience />
            <Projects />

            {/* CTA (Call to Action) para el Simulador dentro del portafolio */}
            <section className="py-20 px-8 md:px-16 flex justify-center">
              <div className="max-w-4xl w-full p-1 border border-dashed border-gray-800 rounded-3xl">
                <div className="bg-gray-900/40 p-10 rounded-[calc(1.5rem-1px)] text-center">
                  <h2 className="text-2xl font-bold mb-4">Herramientas de Venta Honda</h2>
                  <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                    Desarrollé un simulador lógico para optimizar las tasas de interés según los niveles de enganche de la financiera.
                  </p>
                  <button
                    onClick={irAlSimulador}
                    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all transform hover:scale-105"
                  >
                    Lanzar Simulador Oficial
                  </button>
                </div>
              </div>
            </section>

            <Contact />
          </main>

          <footer className="w-full py-12 border-t border-gray-900 bg-gray-950 px-8 md:px-16 flex justify-between items-center text-gray-500 text-sm">
            <p>© 2026 - Emi.dev</p>
            <div className="flex gap-6">
              <span className="hover:text-cyan-400 cursor-pointer transition">GitHub</span>
              <span className="hover:text-cyan-400 cursor-pointer transition">LinkedIn</span>
            </div>
          </footer>
        </>
      ) : (
        /* VISTA DEL SIMULADOR INDEPENDIENTE */
        <div className="animate-in fade-in duration-500">
          {/* Header simple para el simulador */}
          <header className="w-full py-6 px-8 md:px-16 border-b border-gray-900 flex justify-between items-center bg-gray-950/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center font-bold text-white">H</div>
              <span className="font-black tracking-tighter text-xl">HONDA <span className="text-gray-500 font-light italic">Rio Grande</span></span>
            </div>
            <button
              onClick={irAlPortfolio}
              className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Volver al Portafolio
            </button>
          </header>

          <HondaCalculator />

          <footer className="py-10 text-center text-gray-600 text-xs uppercase tracking-widest">
            Uso exclusivo para fuerza de ventas - Honda Rio Grande v2.1
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;