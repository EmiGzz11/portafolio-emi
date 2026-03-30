import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contacto" className="py-24 px-8 md:px-16 bg-gray-950 border-t border-gray-900">
            <div className="w-full grid md:grid-cols-2 gap-16">

                {/* Información de contacto */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-4xl font-black mb-4 text-white">¿Hablamos de tu <span className="text-cyan-400">próximo proyecto</span>?</h3>
                        <p className="text-gray-400 text-lg">
                            Estoy abierto a nuevas oportunidades en desarrollo móvil y sistemas de alta escala.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-cyan-400">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email</p>
                                <p className="text-lg">fcoemiliano.gonzalez@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-cyan-400">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">WhatsApp</p>
                                <p className="text-lg">+52 878 101 5811</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-cyan-400">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Ubicación</p>
                                <p className="text-lg">Piedras Negras, Coahuila, MX</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
                    <form action="https://formspree.io/f/xyknonvj" method="POST" className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Nombre</label>
                                <input type="text" name="name" required className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Email</label>
                                <input type="email" name="email" required className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Mensaje</label>
                            <textarea name="message" rows="4" required className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition resize-none"></textarea>
                        </div>
                        <button type="submit" className="w-full py-4 bg-cyan-500 text-gray-950 font-bold rounded-xl hover:bg-cyan-400 flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                            Enviar Mensaje <Send size={18} />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default Contact;