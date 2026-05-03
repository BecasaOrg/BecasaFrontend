"use client";
import React, { useState, useEffect } from 'react';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import BecasaBanner from '@/components/dashboard/BecasaBanner';
import Loader from '../../../components/dashboard/Loader';
import { Trophy, Users, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { getCamps } from '../actions/camp.action';

interface City {
  id: number;
  name: string;
  state_id: string;
  created_at: string;
  updated_at: string;
}

interface Camp {
  id: number;
  name: string;
  address?: string;
  capacity: string;
  city: City;
  city_id: string;
  created_at: string;
  deleted_at: null | string;
  description: string;
  end_date: string;
  extraordinary_price: string;
  is_active: boolean;
  max_age: string;
  min_age: string;
  price: string;
  registration_end_date: string;
  registration_start_date: string;
  schedule: string;
  sport_type: string;
  start_date: string;
  updated_at: string;
  img?: string;
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState('TABLERO');
    const [camps, setCamps] = useState<Camp[]>([]);
    const [loadingCamps, setLoadingCamps] = useState(false);

    useEffect(() => {
        if (activeTab === 'CAMPAMENTOS') {
            fetchCamps();
        }
    }, [activeTab]);

    const fetchCamps = async () => {
        setLoadingCamps(true);
        try {
            const { data } = await getCamps();
            setCamps(data || []);
        } catch (e) {
            console.error(e);
            setCamps([]);
        } finally {
            setLoadingCamps(false);
        }
    };

    const renderTablero = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stat Card 1 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#AAFF00]/10 rounded-full flex items-center justify-center mb-4 text-[#AAFF00]">
                    <Trophy className="w-5 h-5" />
                </div>
                <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Puntos Ganados</h4>
                <p className="text-2xl font-black text-gray-800">1,250</p>
                <div className="mt-2 text-[10px] text-green-500 font-bold">+12% esta semana</div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#00aaff]/10 rounded-full flex items-center justify-center mb-4 text-[#00aaff]">
                    <Users className="w-5 h-5" />
                </div>
                <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Conexiones</h4>
                <p className="text-2xl font-black text-gray-800">24</p>
                <div className="mt-2 text-[10px] text-gray-400 font-bold">5 scouts pendientes</div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#ff00aa]/10 rounded-full flex items-center justify-center mb-4 text-[#ff00aa]">
                    <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Cursos</h4>
                <p className="text-2xl font-black text-gray-800">3/5</p>
                <div className="mt-2 text-[10px] text-[#ff00aa] font-bold">60% completado</div>
            </div>

            {/* Profile Completion Card */}
            <div className="md:col-span-3 bg-[#1a1c2c] rounded-[40px] p-8 flex items-center justify-between text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#AAFF00]/10 rounded-full blur-[80px]" />
                <div className="relative z-10 flex-1">
                    <h3 className="text-2xl font-black mb-2 italic">Completa tu perfil de Atleta</h3>
                    <p className="text-white/60 text-xs max-w-md mb-6">Aumenta tus posibilidades de ser descubierto por scouts internacionales completando tu información académica y deportiva.</p>
                    <div className="flex items-center gap-6">
                        <div className="flex-1 max-w-xs h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#AAFF00] w-[78%] rounded-full shadow-[0_0_10px_rgba(170,255,0,0.5)]" />
                        </div>
                        <span className="text-xl font-black text-[#AAFF00]">78%</span>
                    </div>
                </div>
                <button className="relative z-10 bg-[#AAFF00] text-black px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                    Completar Ahora
                </button>
            </div>

            {/* Recent Activity */}
            <div className="md:col-span-3 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-gray-800 font-black text-lg mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#AAFF00]" />
                    Actividad Reciente
                </h3>
                <div className="space-y-6">
                    {[
                        { title: 'Inscripción Confirmada', desc: 'Tu registro en el Becasa Camp Voleibol 2026 ha sido aprobado.', date: 'Hace 2 horas', status: 'success' },
                        { title: 'Documento Validado', desc: 'Tu promedio académico ha sido verificado satisfactoriamente.', date: 'Ayer', status: 'success' },
                        { title: 'Mensaje de Scout', desc: 'Un scout de Miami Hawks ha revisado tu perfil.', date: 'Hace 2 días', status: 'info' },
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start border-l-2 border-gray-100 pl-6 relative">
                            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#AAFF00]" />
                            <div className="flex-1">
                                <h5 className="text-sm font-bold text-gray-800">{item.title}</h5>
                                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                            </div>
                            <span className="text-[10px] font-bold text-gray-300 uppercase">{item.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderCampamentos = () => {
        if (loadingCamps) return <Loader />;

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {camps.map((camp: Camp, idx) => (
                    <div key={idx} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer">
                        <div className="h-40 relative bg-gray-200 flex items-center justify-center">
                            {camp.img ? (
                                <img src={camp.img} alt={camp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <span className="text-gray-400 text-xs font-bold uppercase">Sin imagen</span>
                            )}
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase border border-white/20">
                                {camp.is_active ? 'Activo' : 'Inactivo'}
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="text-sm font-black text-gray-800 mb-1">{camp.name}</h4>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                <span>{camp.city?.name || 'N/A'}</span>
                                <span>•</span>
                                <span>{new Date(camp.start_date).toLocaleDateString()} - {new Date(camp.end_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-1">
                                <span>{camp.sport_type}</span>
                                <span>•</span>
                                <span>${camp.price}</span>
                            </div>
                            <button className="mt-4 w-full py-2 bg-gray-50 text-gray-500 font-bold text-xs rounded-xl hover:bg-[#AAFF00] hover:text-black transition-colors uppercase tracking-widest">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderVerificarPerfil = () => (
        <div className="bg-gray-50 rounded-[40px] p-10 border border-gray-100 animate-in fade-in zoom-in duration-500">
            <h3 className="text-gray-800 font-black text-xl mb-2 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-[#AAFF00]" />
                Verificación de Perfil
            </h3>
            <p className="text-gray-400 text-xs mb-8">Completa la siguiente lista de documentos para elevar tu perfil a <span className="text-[#AAFF00] font-black uppercase">Verificado</span>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    { label: 'Documento de Identidad', status: 'Completado' },
                    { label: 'Notas Académicas (Último año)', status: 'Pendiente' },
                    { label: 'Video de Highlights', status: 'En Revisión' },
                    { label: 'Certificado de Idiomas', status: 'Pendiente' },
                    { label: 'Examen Físico Reciente', status: 'Pendiente' },
                    { label: 'Carta de Recomendación', status: 'Completado' }
                ].map((doc, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${doc.status === 'Completado' ? 'bg-[#AAFF00]/10 text-[#AAFF00]' :
                                doc.status === 'En Revisión' ? 'bg-blue-50 text-blue-400' : 'bg-gray-50 text-gray-300'
                                }`}>
                                {doc.status === 'Completado' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            </div>
                            <span className="text-xs font-bold text-gray-700">{doc.label}</span>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-tighter ${doc.status === 'Completado' ? 'text-[#AAFF00]' :
                            doc.status === 'En Revisión' ? 'text-blue-400' : 'text-gray-300'
                            }`}>
                            {doc.status}
                        </span>
                    </div>
                ))}
            </div>

            <button className="mt-8 mx-auto flex items-center gap-2 bg-[#1a1c2c] text-[#AAFF00] px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
                Subir Documentos Pendientes
            </button>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'TABLERO': return renderTablero();
            case 'CAMPAMENTOS': return renderCampamentos();
            case 'VERIFICAR PERFIL': return renderVerificarPerfil();
            default: return (
                <div className="mt-10 p-20 text-center animate-in fade-in duration-700">
                    <p className="text-gray-200 font-black text-4xl uppercase tracking-[0.2em] mb-4 opacity-50">{activeTab}</p>
                    <p className="text-gray-400 font-bold text-sm tracking-widest lowercase">Próximamente estaremos habilitando este módulo para ti.</p>
                </div>
            );
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Top Section with Banner */}
            <BecasaBanner />

            {/* Main Content Card */}
            <div className="flex-1 bg-white rounded-t-[48px] p-8 pb-0 flex flex-col border-t border-x overflow-y-scroll border-gray-100 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
                <div className="mb-8 overflow-x-auto no-scrollbar">
                    <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
                </div>

                {/* Tab Content Area */}
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
