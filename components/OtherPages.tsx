
import React from 'react';
import { Doctor } from '../types';
import { MapPin, Star, Phone, Utensils, AlertCircle, Coffee, Heart, Music, Gamepad2, Image as LucideImage } from 'lucide-react';

export const HealthCare: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="relative rounded-[3rem] overflow-hidden h-80 shadow-2xl">
                <img src="https://picsum.photos/1600/600?nature" alt="Wellness" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-rose-900/40 to-transparent flex flex-col justify-end p-12">
                    <span className="text-rose-200 font-bold tracking-widest uppercase mb-2">Essential Guide</span>
                    <h2 className="text-5xl font-black text-white">Self Care & Nutrition</h2>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-emerald-100">
                    <div className="flex items-center gap-4 mb-6 text-emerald-600">
                        <div className="p-3 bg-emerald-50 rounded-2xl">
                            <Utensils size={32} />
                        </div>
                        <h3 className="text-3xl font-black">Nourish Your Body</h3>
                    </div>
                    <ul className="space-y-5">
                        {[
                          { title: "Leafy Greens", desc: "High in iron to replenish blood loss." },
                          { title: "Magnesium Boost", desc: "Dark chocolate & almonds reduce cramps." },
                          { title: "Hydration Focus", desc: "Water prevents retention & headaches." },
                          { title: "Anti-Inflammatory", desc: "Ginger, turmeric & fatty fish." }
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-4">
                            <div className="mt-1.5 w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                            <div>
                                <span className="font-bold text-slate-800 block">{item.title}</span>
                                <span className="text-sm text-slate-500">{item.desc}</span>
                            </div>
                          </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-rose-100">
                    <div className="flex items-center gap-4 mb-6 text-rose-500">
                        <div className="p-3 bg-rose-50 rounded-2xl">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-3xl font-black">Limit These</h3>
                    </div>
                    <ul className="space-y-5">
                        {[
                          { title: "Excessive Sodium", desc: "The main culprit behind painful bloating." },
                          { title: "Caffeine Overload", desc: "Can narrow blood vessels & worsen cramps." },
                          { title: "Alcohol Intake", desc: "Dehydrates and worsens mood fluctuations." },
                          { title: "Spicy & Acidic", desc: "Might upset a sensitive stomach during flow." }
                        ].map((item, idx) => (
                          <li key={idx} className="flex gap-4">
                            <div className="mt-1.5 w-2 h-2 bg-rose-400 rounded-full flex-shrink-0"></div>
                            <div>
                                <span className="font-bold text-slate-800 block">{item.title}</span>
                                <span className="text-sm text-slate-500">{item.desc}</span>
                            </div>
                          </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-purple-900 rounded-[2.5rem] p-12 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Heart size={200} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                            <Coffee size={32} />
                        </div>
                        <h3 className="text-4xl font-black">Instant Comfort Remedies</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                            <h4 className="font-bold text-xl mb-3">Thermal Relief</h4>
                            <p className="text-sm text-purple-100 leading-relaxed">Applying heat to the lower abdomen relaxes the uterine muscles, providing immediate ease from severe contractions.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                            <h4 className="font-bold text-xl mb-3">Gentle Flow Yoga</h4>
                            <p className="text-sm text-purple-100 leading-relaxed">Low-impact movement like Child's Pose and Cat-Cow stimulates circulation and releases tension in the lower back.</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                            <h4 className="font-bold text-xl mb-3">Herbal Infusions</h4>
                            <p className="text-sm text-purple-100 leading-relaxed">Chamomile or Peppermint teas are natural antispasmodics that help soothe both the body and the mind.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const DOCTORS_DATA: Doctor[] = [
    { id: 1, name: "Dr. Sarah Mitchell", specialty: "Senior Gynecologist", city: "Manhattan, NY", rating: 4.9, image: "https://picsum.photos/200/200?u=1" },
    { id: 2, name: "Dr. Emily Chen", specialty: "OB-GYN Specialist", city: "San Francisco, CA", rating: 4.8, image: "https://picsum.photos/200/200?u=2" },
    { id: 3, name: "Dr. Anita Roy", specialty: "Reproductive Wellness", city: "Chicago, IL", rating: 4.7, image: "https://picsum.photos/200/200?u=3" },
    { id: 4, name: "Dr. Elena Rodriguez", specialty: "Hormonal Health", city: "Miami, FL", rating: 4.9, image: "https://picsum.photos/200/200?u=4" },
];

export const DoctorFinder: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
            <div className="text-center">
                <h2 className="text-4xl font-black text-slate-800 mb-4">Find a Specialist</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">Connect with top-rated gynecologists and obstetricians for personalized care and professional guidance.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                {DOCTORS_DATA.map(doc => (
                    <div key={doc.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition-all group">
                        <div className="relative flex-shrink-0">
                            <img src={doc.image} alt={doc.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-rose-50" />
                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-1 rounded-lg shadow-md">
                                <Star size={16} fill="white" />
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-xl font-black text-slate-800 group-hover:text-rose-500 transition-colors">{doc.name}</h3>
                            <p className="text-rose-500 font-bold text-sm mb-3 uppercase tracking-wider">{doc.specialty}</p>
                            <div className="flex items-center justify-center sm:justify-start text-slate-400 text-sm gap-2">
                                <MapPin size={16} /> {doc.city}
                            </div>
                        </div>
                        <button className="bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-2xl shadow-lg shadow-rose-200 transition-all hover:-translate-y-1">
                            <Phone size={24} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 text-center">
                <p className="text-blue-900 font-medium">Need immediate medical attention? Please contact local emergency services immediately.</p>
            </div>
        </div>
    );
}

export const FunZone: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
             <div className="text-center">
                <h2 className="text-5xl font-black text-slate-800 mb-4">The Relax Zone</h2>
                <p className="text-slate-500 text-lg">A peaceful corner to distract, relax, and spark a smile.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[11,12,13,14].map(i => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-3xl shadow-xl cursor-pointer">
                        <img src={`https://picsum.photos/500/500?random=${i}`} alt="Relaxing Visual" className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
                        <div className="absolute inset-0 bg-rose-500/20 group-hover:bg-rose-500/40 transition-colors"></div>
                        <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs font-bold text-center">Peaceful View</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-rose-50">
                    <div className="flex items-center gap-4 mb-8 text-rose-500">
                        <div className="p-3 bg-rose-50 rounded-2xl">
                            <Gamepad2 size={32} />
                        </div>
                        <h3 className="text-3xl font-black">Quick Distractions</h3>
                    </div>
                    <div className="space-y-4">
                        <button className="w-full text-left p-6 bg-rose-50 rounded-2xl hover:bg-rose-500 hover:text-white transition-all group flex items-center justify-between">
                            <span className="font-bold text-lg">Infinite Bubble Wrap</span>
                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        <button className="w-full text-left p-6 bg-emerald-50 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all group flex items-center justify-between">
                            <span className="font-bold text-lg">Zen Garden Drawing</span>
                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                        <button className="w-full text-left p-6 bg-blue-50 rounded-2xl hover:bg-blue-500 hover:text-white transition-all group flex items-center justify-between">
                            <span className="font-bold text-lg">Calm Breathing Pulse</span>
                            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-purple-50">
                    <div className="flex items-center gap-4 mb-8 text-purple-600">
                        <div className="p-3 bg-purple-50 rounded-2xl">
                            <Music size={32} />
                        </div>
                        <h3 className="text-3xl font-black">Comfort Sounds</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {['Soft Rain', 'Ocean Waves', 'Forest Birdsong', 'Piano Melodies'].map((sound, i) => (
                            <button key={i} className="p-6 bg-purple-50 hover:bg-purple-600 hover:text-white rounded-3xl transition-all text-center">
                                <p className="font-bold">{sound}</p>
                                <p className="text-xs opacity-60 mt-1 uppercase tracking-widest">Play</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChevronRight = ({className, size=20}: any) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
