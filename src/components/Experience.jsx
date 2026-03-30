import React from 'react';
import { Cpu, Globe, Smartphone, Zap } from 'lucide-react';

const Experience = () => {
    const skills = [
        { title: "Mobile Expert", desc: "Flutter, Firebase, Ionic, Android Studio", icon: <Smartphone className="text-cyan-400" /> },
        { title: "High Concurrency", desc: "Arquitecturas escalables y logística en tiempo real", icon: <Zap className="text-yellow-400" /> },
        { title: "Hardware Integration", desc: "NFC, Impresoras térmicas, Cámaras IP", icon: <Cpu className="text-purple-400" /> },
        { title: "Global Ready", desc: "Inglés C1 (TOEFL 490), Mentor en Congresos", icon: <Globe className="text-blue-400" /> },
    ];

    return (
        <section id="sobre-mi" className="py-24 px-8 md:px-16 bg-gray-950">
            <div className="w-full grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h3 className="text-4xl font-black mb-6">Más de 2 años creando <br /> <span className="text-cyan-400">Soluciones de Ingeniería</span></h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Egresado con especialidad en desarrollo móvil y redes. Mi enfoque va más allá de la pantalla:
                        he liderado proyectos de logística tipo "Uber", optimizado sistemas ERP con integración de hardware
                        y ganado competencias nacionales de innovación (InnovaTecNM).
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        {skills.map((skill, i) => (
                            <div key={i} className="p-4 rounded-2xl border border-gray-900 bg-gray-900/30">
                                <div className="mb-3">{skill.icon}</div>
                                <h4 className="font-bold text-white mb-1">{skill.title}</h4>
                                <p className="text-xs text-gray-500">{skill.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Espacio para una foto profesional o un gráfico de tus lenguajes más usados */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-gray-900 rounded-2xl p-8 border border-white/5">
                        <h4 className="text-cyan-400 font-mono mb-4 text-sm">{`// Premios Recientes`}</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="text-yellow-500">🏆</span>
                                <div>
                                    <p className="text-white font-bold text-sm">1er Lugar Regional InnovaTecNM</p>
                                    <p className="text-gray-500 text-xs">Industrias Creativas · 2023</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-blue-500">🎤</span>
                                <div>
                                    <p className="text-white font-bold text-sm">Speaker en 14° Congreso Int. Sistemas</p>
                                    <p className="text-gray-500 text-xs">Taller de Flutter & Firebase · 2025</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;