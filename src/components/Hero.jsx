import React from 'react';
import { ArrowRight, Code } from 'lucide-react';

const Hero = () => {
    return (
        <section className="min-h-screen bg-gray-950 flex items-center justify-start pt-20 p-6 sm:p-10 md:p-16 relative overflow-hidden">

            {/* Fondos con gradientes dinámicos (Glow) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse transition-delay-1000"></div>
            </div>

            {/* Contenedor Principal Alineado */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">

                {/* Columna 1: Texto y CTAs */}
                <div className="text-left space-y-8">

                    <div className="inline-flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 px-4 py-2 rounded-full text-sm font-mono tracking-wide">
                        <Code size={18} />
                        <span>{`const dev = "Emiliano Gonzalez";`}</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
                        Ingeniero en <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                            Sistemas Computacionales
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed">
                        Especialista en desarrollo móvil y arquitecturas de alta concurrencia.
                        He construido soluciones de logística en tiempo real, integración de pagos con Stripe y sistemas escalables para la industria tecnológica.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 pt-4">
                        <a href="#proyectos"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]">
                            Ver Mis Proyectos
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        {/* Nuevo Botón de Descarga */}
                        <a href="/CV_Emiliano_Gonzalez.pdf"
                            download
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cyan-500/50 bg-transparent text-cyan-400 font-semibold rounded-xl hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
                            Descargar CV (PDF)
                        </a>
                    </div>
                </div>

                {/* Columna 2: Elemento Visual Estilo Terminal */}
                <div className="hidden md:flex justify-center items-center">
                    <div className="relative w-full max-w-sm aspect-square">
                        {/* El marco con efecto de cristal */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl border border-white/10 backdrop-blur-[2px] shadow-2xl"></div>

                        {/* Contenido decorativo */}
                        <div className="absolute inset-4 rounded-2xl bg-gray-950 border border-white/5 flex flex-col p-6 font-mono text-sm overflow-hidden">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-cyan-400">const developer = {"{"}</p>
                                <p className="pl-4 text-gray-400 italic">name: 'Emiliano',</p>
                                <p className="pl-4 text-gray-400">skills: ['Flutter', 'Firebase', 'React'],</p>
                                <p className="pl-4 text-gray-400">passion: 'Mobile Development'</p>
                                <p className="text-cyan-400">{"}"}</p>
                            </div>
                            <div className="mt-auto flex justify-center opacity-20">
                                <span className="text-8xl font-bold">{'/>'}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;