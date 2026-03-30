import React, { useState, useEffect } from 'react';
import { Zap, ExternalLink, Github } from 'lucide-react';
import ProjectModal from './ProjectModal';

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject]);

    const misProyectos = [
        {
            id: 1,
            title: "Futboliz",
            logo: "/logos/futboliz.png",
            color: "#00f301",
            shortDesc: "Juego móvil de trivia de fútbol con ranking global y tiempo real.",
            longDesc: "Desarrollé un juego de trivia altamente interactivo utilizando Flutter. Implementé un sistema de ranking en tiempo real con Firebase y gestioné la base de datos de preguntas dinámicas.",
            tags: ["Flutter", "Firebase", "Trivia"],
            link: "https://linktr.ee/futboliz",
            repo: "#",
            evidences: [{ type: 'image', url: '/evidences/futboliz_ev1.png' },
            { type: 'image', url: '/evidences/futboliz_ev2.png' },
            { type: 'image', url: '/evidences/futboliz_ev3.png' }]
        },
        {
            id: 2,
            title: "Maistros",
            logo: "/logos/maistros.png",
            color: "#ff8f00",
            shortDesc: "Marketplace de servicios para el hogar con pagos integrados vía Stripe.",
            longDesc: "Plataforma que conecta usuarios con técnicos independientes. Diseñé el flujo de contratación y la pasarela de pagos segura. Utilicé Firebase para mensajería instantánea.",
            tags: ["Flutter", "Firebase", "Stripe"],
            link: "#",
            repo: "#",
        },
        {
            id: 3,
            title: "Mach3 Logistics",
            logo: "/logos/mach3.png",
            color: "#ec774f",
            shortDesc: "Plataforma logística tipo 'Uber' con licitaciones y geolocalización.",
            longDesc: "Desarrollé el algoritmo de licitaciones basado en geolocalización dinámica. Los repartidores reciben ofertas en tiempo real y el sistema calcula tarifas automáticas.",
            tags: ["Flutter", "Firebase", "Google Maps"],
            link: "#",
            repo: "#",
        },
        {
            id: 4,
            title: "BeastFit",
            logo: "/logos/beastfit.png",
            color: "#ffffff",
            shortDesc: "Gestión de suscripciones fitness y cobros recurrentes con Stripe.",
            longDesc: "Implementé la lógica financiera para gimnasios: membresías automáticas, cupones de descuento y reintentos de cobro mediante Cloud Functions.",
            tags: ["Flutter", "Stripe API"],
            link: "#",
            repo: "#",
        },
        {
            id: 5,
            title: "BabyHands",
            logo: "/logos/babyhands.png",
            color: "#ffffff",
            shortDesc: "Monitoreo infantil con video IP en tiempo real (1er Lugar Regional).",
            longDesc: "Ganador de InnovaTecNM 2023. Sistema de seguridad que transmite video de cámaras IP a una app móvil, optimizando protocolos de red y latencia.",
            tags: ["Flutter", "Camaras IP", "VLC"],
            link: "#",
            repo: "https://github.com/EmiGzz11/Baby-Hands-Cross-Platform",
        },
        {
            id: 6,
            title: "SafeNRelax",
            logo: "/logos/safenrelax.png",
            color: "#c29eee",
            shortDesc: "Control de consumo automatizado mediante tecnología NFC.",
            longDesc: "Proyecto InnovaTecNM 2024. Los clientes gestionan su cuenta en bares mediante tarjetas NFC, optimizando el cobro y la trazabilidad de transacciones.",
            tags: ["Kotlin", "Firebase", "NFC"],
            link: "#",
            repo: "#",
        },
        {
            id: 7,
            title: "Rutinas con IA",
            logo: "/logos/rutinaia.png",
            color: "#ffffff",
            shortDesc: "Entrenador personal inteligente basado en GPT-4.",
            longDesc: "App que genera planes de entrenamiento personalizados procesando datos del usuario mediante la API de OpenAI e integra videos de Youtube.",
            tags: ["Flutter", "OpenAI", "Youtube API"],
            link: "#",
            repo: "https://github.com/EmiGzz11/Flutter-OpenAI",
        },
        {
            id: 8,
            title: "Yochivoy - UI/UX",
            logo: "/logos/yochivoy.png",
            color: "#ffffff",
            shortDesc: "Optimización de rutas y rediseño de interfaz para repartidores.",
            longDesc: "Rediseñé la UX para maximizar seguridad al conducir. Programé la lógica de priorización de paradas, reduciendo tiempos de entrega significativamente.",
            tags: ["Ionic", "TypeScript", "Google Maps"],
            link: "#",
            repo: "#",
            evidences: [{ type: 'image', url: '/evidences/yochivoy_ev1.png' }, { type: 'image', url: '/evidences/yochivoy_ev2.png' }, { type: 'image', url: '/evidences/yochivoy_ev3.png' }, { type: 'image', url: '/evidences/yochivoy_ev4.png' }]
        },
        {
            id: 9,
            title: "LocalShop",
            logo: "/logos/localshop.png",
            color: "#ffffff",
            shortDesc: "Infraestructura de delivery de última milla para comercios.",
            longDesc: "Ecosistema completo: App cliente, repartidor y panel administrativo. Incluye tracking en vivo y notificaciones push geolocalizadas.",
            tags: ["Flutter", "Google Maps", "Logistics"],
            link: "#",
            repo: "#",
        },
        {
            id: 10,
            title: "Smartroute",
            logo: "/logos/smartroute.png",
            color: "#ffffff",
            shortDesc: "Sistema ERP para la gestion de inventarios y ventas, sincronice ventas mediante integracion de impresoras termicas.",
            longDesc: "Ecosistema completo: App cliente, repartidor y panel administrativo. Incluye tracking en vivo y notificaciones push geolocalizadas.",
            tags: ["Flutter", "Firebase", "Google Maps", "Impresoras termicas"],
            link: "#",
            repo: "#",
        }
    ];

    return (
        <section id="proyectos" className="py-24 bg-gray-950">
            {/* Contenedor de Ancho Total con Padding */}
            <div className="w-full px-8 md:px-16">
                <div className="flex items-center gap-4 mb-16">
                    <span className="text-cyan-500 font-mono text-xl">02.</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white">Proyectos Destacados</h3>
                    <div className="h-[1px] bg-gray-800 flex-grow hidden md:block ml-4"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {misProyectos.map((proy) => {
                        // 1. Verificamos si el proyecto tiene un arreglo de evidencias y si tiene al menos 1 elemento
                        const tieneEvidencias = proy.evidences && proy.evidences.length > 0;

                        return (
                            <div
                                key={proy.id}
                                // 2. Solo ejecutamos el setSelectedProject si tieneEvidencias es verdadero
                                onClick={() => tieneEvidencias && setSelectedProject(proy)}
                                // 3. Clases dinámicas: Si no hay evidencias, quitamos el hover azul y cambiamos el cursor
                                className={`group relative bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-500 
                ${tieneEvidencias
                                        ? 'cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]'
                                        : 'cursor-default opacity-80' // Se vuelve un poco opaco si no está activo
                                    }`}
                            >
                                {/* Header de la Card con Fondo Sólido Suave */}
                                <div
                                    className="h-52 flex items-center justify-center p-10 relative overflow-hidden transition-colors duration-500"
                                    style={{
                                        backgroundColor: `${proy.color}`
                                    }}
                                >
                                    {/* Contenedor del logo (simple, sin borde extra) */}
                                    <div className="w-50 h-50 rounded-3xl p-4 relative z-10 transform group-hover:scale-110 transition-transform duration-500 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={proy.logo}
                                            alt={proy.title}
                                            className="w-full h-full object-contain"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                                        />
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-8 flex flex-col flex-grow">
                                    {/* El título no se pinta de cyan en el hover si no tiene evidencias */}
                                    <h4 className={`text-2xl font-bold mb-3 transition-colors ${tieneEvidencias ? 'text-white group-hover:text-cyan-400' : 'text-gray-300'}`}>
                                        {proy.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                                        {proy.shortDesc}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {proy.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-tighter bg-gray-950 text-cyan-500 border border-cyan-500/20 px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">

                                        {/* 4. Renderizado Condicional del texto inferior */}
                                        {tieneEvidencias ? (
                                            <span className="text-cyan-400 text-xs font-bold flex items-center gap-2 group-hover:gap-3 transition-all tracking-widest">
                                                DETALLES <Zap size={14} fill="currentColor" />
                                            </span>
                                        ) : (
                                            <span className="text-gray-600 text-[10px] font-bold tracking-widest uppercase">
                                                Evidencias Pendientes
                                            </span>
                                        )}

                                        {/* Enlaces Externos Condicionales */}
                                        <div className="flex gap-4 text-gray-500">
                                            {proy.repo && proy.repo !== "#" && (
                                                <a
                                                    href={proy.repo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-white transition-colors p-1"
                                                    onClick={(e) => e.stopPropagation()} // Evita que se abra el modal al hacer clic aquí
                                                >
                                                    <Github size={20} />
                                                </a>
                                            )}

                                            {proy.link && proy.link !== "#" && (
                                                <a
                                                    href={proy.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-white transition-colors p-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal de Galería */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
};

export default Projects;