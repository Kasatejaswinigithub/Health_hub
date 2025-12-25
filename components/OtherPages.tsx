
import React from 'react';
import { Doctor } from '../types';
import { MapPin, Star, Phone, Utensils, AlertCircle, Coffee, Heart, Music, Gamepad2, ChevronRight } from 'lucide-react';

export const HealthCare: React.FC = () => {
  const nutrition = [
    { title: "Leafy Greens", desc: "High in iron to replenish blood loss.", color: "bg-emerald-500", icon: "🥬" },
    { title: "Magnesium Boost", desc: "Dark chocolate & almonds reduce cramps.", color: "bg-amber-600", icon: "🍫" },
    { title: "Hydration Focus", desc: "Water prevents retention & headaches.", color: "bg-blue-500", icon: "💧" },
    { title: "Anti-Inflammatory", desc: "Ginger, turmeric & fatty fish.", color: "bg-orange-500", icon: "🫚" }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      <div className="relative rounded-[4rem] overflow-hidden h-[450px] shadow-2xl">
        <img src="https://picsum.photos/1600/800?spa" alt="Wellness" className="w-full h-full object-cover brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-rose-900/40 to-transparent flex flex-col justify-end p-12 md:p-20">
          <span className="text-rose-200 font-bold tracking-[0.4em] uppercase mb-4 text-sm">Vitality Guide</span>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">Self Care</h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-6 mb-10">
            <div className="p-5 bg-emerald-50 rounded-3xl text-emerald-600">
              <Utensils size={40} />
            </div>
            <h3 className="text-4xl font-black text-slate-800">Nourishment</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {nutrition.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-black text-slate-800 text-lg">{item.title}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-6 mb-10 text-rose-500">
            <div className="p-5 bg-rose-50 rounded-3xl">
              <AlertCircle size={40} />
            </div>
            <h3 className="text-4xl font-black text-slate-800">Mindful Choices</h3>
          </div>
          <ul className="space-y-6">
            {[
              { title: "Excessive Sodium", desc: "The main culprit behind painful bloating." },
              { title: "Caffeine Overload", desc: "Can narrow blood vessels & worsen cramps." },
              { title: "Alcohol Intake", desc: "Dehydrates and worsens mood fluctuations." }
            ].map((item, idx) => (
              <li key={idx} className="flex gap-5 items-start">
                <div className="mt-1.5 w-3 h-3 bg-rose-400 rounded-full flex-shrink-0"></div>
                <div>
                    <span className="font-black text-slate-800 block text-lg">{item.title}</span>
                    <span className="text-sm text-slate-500">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
            <Heart size={300} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-6 mb-12">
                <div className="p-5 bg-white/10 rounded-3xl backdrop-blur-xl">
                    <Coffee size={40} />
                </div>
                <h3 className="text-5xl font-black">Comfort Rituals</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
                {[
                  { t: "Thermal Relief", d: "Applying heat to the lower abdomen relaxes uterine muscles, providing immediate ease." },
                  { t: "Gentle Flow Yoga", d: "Low-impact movements stimulate circulation and release tension in the lower back." },
                  { t: "Herbal Infusions", d: "Chamomile or Peppermint teas act as natural antispasmodics for both body and mind." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-md">
                    <h4 className="font-black text-2xl mb-4">{item.t}</h4>
                    <p className="text-slate-400 leading-relaxed text-sm">{item.d}</p>
                  </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const DOCTORS_DATA: Doctor[] = [
    { id: 1, name: "Dr. Sarah Mitchell", specialty: "Senior Gynecologist", city: "Manhattan, NY", rating: 4.9, image: "https://picsum.photos/200/200?u=1" },
    { id: 2, name: "Dr. Emily Chen", specialty: "OB-GYN Specialist", city: "San Francisco, CA", rating: 4.8, image: "https://picsum.photos/200/200?u=2" },
    { id: 3, name: "Dr. Anita Roy", specialty: "Reproductive Wellness", city: "Chicago, IL", rating: 4.7, image: "https://picsum.photos/200/200?u=3" },
    { id: 4, name: "Dr. Elena Rodriguez", specialty: "Hormonal Health", city: "Miami, FL", rating: 4.9, image: "https://picsum.photos/200/200?u=4" },
];

export const DoctorFinder: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
            <div className="text-center space-y-4">
                <h2 className="text-5xl font-black text-slate-800">Specialist Network</h2>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">Connect with top-rated medical professionals for personalized hormonal care.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
                {DOCTORS_DATA.map(doc => (
                    <div key={doc.id} className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-8 hover:shadow-2xl transition-all group">
                        <div className="relative flex-shrink-0">
                            <img src={doc.image} alt={doc.name} className="w-28 h-28 rounded-3xl object-cover ring-8 ring-rose-50" />
                            <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-white p-2 rounded-xl shadow-lg">
                                <Star size={20} fill="currentColor" />
                            </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="text-2xl font-black text-slate-800 group-hover:text-rose-500 transition-colors">{doc.name}</h3>
                            <p className="text-rose-500 font-black text-sm mb-4 uppercase tracking-[0.2em]">{doc.specialty}</p>
                            <div className="flex items-center justify-center sm:justify-start text-slate-400 text-sm gap-2">
                                <MapPin size={18} /> {doc.city}
                            </div>
                        </div>
                        <button className="bg-rose-500 hover:bg-rose-600 text-white p-6 rounded-3xl shadow-xl shadow-rose-200 transition-all hover:-translate-y-2 active:scale-95">
                            <Phone size={28} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-blue-600 p-12 rounded-[3.5rem] text-white text-center shadow-xl shadow-blue-200">
                <h4 className="text-2xl font-black mb-2">Emergency?</h4>
                <p className="font-medium opacity-90">Please contact local emergency services immediately for urgent medical matters.</p>
            </div>
        </div>
    );
};

export const FunZone: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto space-y-16 animate-fade-in">
             <div className="text-center space-y-4">
                <h2 className="text-6xl font-black text-slate-800">Zen Space</h2>
                <p className="text-slate-500 text-xl">A peaceful digital escape for distraction and calm.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[21,22,23,24].map(i => (
                    <div key={i} className="group relative aspect-square overflow-hidden rounded-[2.5rem] shadow-2xl cursor-pointer">
                        <img src={`https://picsum.photos/800/800?random=${i}`} alt="Nature" className="w-full h-full object-cover group-hover:scale-125 transition duration-1000" />
                        <div className="absolute inset-0 bg-rose-500/10 group-hover:bg-rose-500/40 transition-colors duration-500"></div>
                        <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-xl p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                            <p className="text-white text-xs font-black text-center uppercase tracking-widest">Peaceful View</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-rose-50">
                    <div className="flex items-center gap-6 mb-10 text-rose-500">
                        <div className="p-5 bg-rose-50 rounded-3xl">
                            <Gamepad2 size={40} />
                        </div>
                        <h3 className="text-4xl font-black">Distractions</h3>
                    </div>
                    <div className="space-y-4">
                        {['Infinite Bubble Wrap', 'Zen Garden Sketch', 'Breathing Pulse'].map((game, i) => (
                           <button key={i} className="w-full text-left p-8 bg-rose-50/50 rounded-3xl hover:bg-rose-500 hover:text-white transition-all group flex items-center justify-between border border-rose-100/50">
                              <span className="font-black text-xl">{game}</span>
                              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                           </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[4rem] shadow-xl border border-purple-50">
                    <div className="flex items-center gap-6 mb-10 text-purple-600">
                        <div className="p-5 bg-purple-50 rounded-3xl">
                            <Music size={40} />
                        </div>
                        <h3 className="text-4xl font-black">Ambient</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {['Soft Rain', 'Ocean Waves', 'Forest Bird', 'Piano Solo'].map((sound, i) => (
                            <button key={i} className="p-10 bg-purple-50 hover:bg-purple-600 hover:text-white rounded-[2.5rem] transition-all text-center group border border-purple-100">
                                <p className="font-black text-lg">{sound}</p>
                                <p className="text-[10px] opacity-40 group-hover:opacity-80 mt-2 uppercase tracking-[0.2em] font-bold">Listen</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
