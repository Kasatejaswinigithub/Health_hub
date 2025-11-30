import React from 'react';
import { Doctor } from '../types';
import { MapPin, Star, Phone, Utensils, AlertOctagon, Coffee } from 'lucide-react';

// Health Care Component
export const HealthCare: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden h-64 shadow-lg">
                <img src="https://picsum.photos/1200/400?grayscale" alt="Wellness" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-900/80 to-transparent flex items-center p-10">
                    <h2 className="text-4xl font-bold text-white">Self Care & Nutrition</h2>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-green-100">
                    <div className="flex items-center gap-3 mb-4 text-green-600">
                        <Utensils size={28} />
                        <h3 className="text-2xl font-bold">Foods to Eat</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Leafy green vegetables (Iron rich)</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Dark Chocolate (Magnesium)</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Ginger tea (Anti-inflammatory)</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Fish & Nuts (Omega-3)</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Yoghurt & Turmeric</li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-100">
                    <div className="flex items-center gap-3 mb-4 text-red-600">
                        <AlertOctagon size={28} />
                        <h3 className="text-2xl font-bold">Foods to Avoid</h3>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Excessive Salt (Bloating)</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Caffeine (Can increase cramps)</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Alcohol</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Spicy Foods</li>
                        <li className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full"></div>High processed sugary snacks</li>
                    </ul>
                </div>
            </div>

            <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100">
                <div className="flex items-center gap-3 mb-4 text-purple-700">
                    <Coffee size={28} />
                    <h3 className="text-2xl font-bold">Remedies</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2">Heat Therapy</h4>
                        <p className="text-sm text-gray-600">Use a heating pad or hot water bottle on your lower abdomen to relax muscles.</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2">Gentle Yoga</h4>
                        <p className="text-sm text-gray-600">Child's Pose and Cat-Cow stretches can help relieve back pain and cramping.</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm">
                        <h4 className="font-bold text-lg mb-2">Hydration</h4>
                        <p className="text-sm text-gray-600">Drinking plenty of water prevents water retention and bloating.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Doctor Finder Component
const DOCTORS_DATA: Doctor[] = [
    { id: 1, name: "Dr. Sarah Smith", specialty: "Gynecologist", city: "New York", rating: 4.8, image: "https://picsum.photos/100/100?random=1" },
    { id: 2, name: "Dr. Emily Chen", specialty: "Obstetrician", city: "San Francisco", rating: 4.9, image: "https://picsum.photos/100/100?random=2" },
    { id: 3, name: "Dr. Anita Roy", specialty: "Reproductive Health", city: "Chicago", rating: 4.7, image: "https://picsum.photos/100/100?random=3" },
    { id: 4, name: "Dr. Maria Garcia", specialty: "Gynecologist", city: "Miami", rating: 4.8, image: "https://picsum.photos/100/100?random=4" },
];

export const DoctorFinder: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800">Find a Specialist</h2>
            <p className="text-gray-500">Top rated gynecologists and obstetricians near you.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {DOCTORS_DATA.map(doc => (
                    <div key={doc.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
                        <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900">{doc.name}</h3>
                            <p className="text-rose-500 font-medium">{doc.specialty}</p>
                            <div className="flex items-center text-gray-500 text-sm mt-1 gap-1">
                                <MapPin size={14} /> {doc.city}
                            </div>
                            <div className="flex items-center text-yellow-500 text-sm mt-1 gap-1">
                                <Star size={14} fill="currentColor" /> {doc.rating}/5.0
                            </div>
                        </div>
                        <button className="bg-gray-100 hover:bg-rose-500 hover:text-white p-3 rounded-xl transition">
                            <Phone size={20} />
                        </button>
                    </div>
                ))}
            </div>
             <div className="bg-blue-50 p-6 rounded-2xl text-center">
                <p className="text-blue-800">Need immediate help? Call local emergency services or a helpline.</p>
            </div>
        </div>
    );
}

// Fun Zone Component
export const FunZone: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
             <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">The Fun Zone</h2>
                <p className="text-gray-500 mt-2">Distract yourself, relax, and smile.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer">
                        <img src={`https://picsum.photos/300/300?random=${i + 10}`} alt="Meme" className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <span className="text-white font-bold">Open</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Relaxing Games & Links</h3>
                <div className="grid gap-4">
                    <a href="#" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition text-purple-700 font-medium">
                        🎮 Play Bubble Wrap Simulator
                    </a>
                    <a href="#" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition text-blue-700 font-medium">
                        🧩 Color Puzzle
                    </a>
                    <a href="#" className="block p-4 bg-green-50 rounded-xl hover:bg-green-100 transition text-green-700 font-medium">
                        🌿 Zen Garden
                    </a>
                </div>
            </div>
        </div>
    )
}
