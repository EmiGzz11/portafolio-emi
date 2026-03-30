import React, { useState } from 'react';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    const [currentEvidence, setCurrentEvidence] = useState(0);

    if (!project) return null;

    const nextEvidence = () => {
        setCurrentEvidence((prev) => (prev === project.evidences.length - 1 ? 0 : prev + 1));
    };

    const prevEvidence = () => {
        setCurrentEvidence((prev) => (prev === 0 ? project.evidences.length - 1 : prev - 1));
    };

    const renderEvidence = (evidence) => {
        if (evidence.type === 'image') {
            return <img src={evidence.url} alt={`Evidencia ${currentEvidence}`} className="w-full h-full object-contain" />;
        } else if (evidence.type === 'video') {
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <video src={evidence.url} controls className="w-full h-full object-contain" />
                    {/* Opcional: Icono de Play si el video no auto-reproduce */}
                </div>
            );
        }
    };

    return (
        // Overlay de fondo (cierra al hacer clic fuera)
        <div className="fixed inset-0 z-[100] bg-gray-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8" onClick={onClose}>

            {/* Contenedor del Modal (detiene el clic para no cerrar) */}
            <div className="relative bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl shadow-cyan-950/20" onClick={(e) => e.stopPropagation()}>

                {/* Botón de Cerrar */}
                <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 rounded-full bg-gray-950/50 border border-gray-800 text-gray-400 hover:text-white hover:border-cyan-500 transition-all">
                    <X size={20} />
                </button>

                <div className="grid md:grid-cols-[2fr,1fr] h-full">

                    {/* Columna Izquierda: Galería */}
                    <div className="relative bg-gray-950 p-4 flex items-center justify-center border-r border-gray-800 min-h-[40vh] md:min-h-[70vh]">
                        <div className="w-full h-full max-h-[60vh] md:max-h-[70vh] flex items-center justify-center overflow-hidden">
                            {renderEvidence(project.evidences[currentEvidence])}
                        </div>

                        {/* Controles de Navegación (Solo si hay más de 1 evidencia) */}
                        {project.evidences.length > 1 && (
                            <>
                                <button onClick={prevEvidence} className="absolute left-4 p-3 rounded-full bg-gray-900/80 border border-gray-700 text-cyan-400 hover:bg-cyan-950/50 transition-all">
                                    <ChevronLeft size={24} />
                                </button>
                                <button onClick={nextEvidence} className="absolute right-4 p-3 rounded-full bg-gray-900/80 border border-gray-700 text-cyan-400 hover:bg-cyan-950/50 transition-all">
                                    <ChevronRight size={24} />
                                </button>
                                {/* Indicadores de posición */}
                                <div className="absolute bottom-6 flex gap-2">
                                    {project.evidences.map((_, index) => (
                                        <div key={index} className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentEvidence ? 'bg-cyan-400 w-6' : 'bg-gray-700'}`}></div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Columna Derecha: Información Detallada */}
                    <div className="p-10 space-y-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex items-center gap-5">
                                <img src={project.logo} alt={project.title} className="w-16 h-16 rounded-2xl border border-gray-800 p-2 bg-gray-950 object-contain" />
                                <h2 className="text-3xl font-black text-white">{project.title}</h2>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase tracking-wider bg-cyan-950/50 text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-900/50">{tag}</span>
                                ))}
                            </div>

                            <div className="space-y-4 text-gray-400 leading-relaxed text-sm">
                                <p className="font-semibold text-gray-200">Descripción Técnica:</p>
                                <p>{project.longDesc}</p>
                            </div>
                        </div>

                        {/* Enlaces Finales */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800 mt-auto">
                            {/* Botón Visitar Proyecto: Solo si existe el link */}
                            {project.link && project.link !== "#" && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 transition-all text-sm w-full">
                                    Visitar Proyecto <ExternalLink size={16} />
                                </a>
                            )}

                            {/* Botón Ver Código: Solo si el repo es público */}
                            {project.repo && project.repo !== "#" && (
                                <a href={project.repo} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-700 bg-gray-900 text-gray-200 font-semibold rounded-xl hover:bg-gray-800 transition-all text-sm w-full">
                                    Ver Código <Github size={16} />
                                </a>
                            )}

                            {/* Si AMBOS son privados, podrías mostrar un pequeño aviso o nada */}
                            {(!project.link || project.link === "#") && (!project.repo || project.repo === "#") && (
                                <p className="text-xs text-gray-500 italic">
                                    * Este proyecto es de propiedad privada bajo contrato de confidencialidad (NDA).
                                </p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectModal;