import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Users, 
  ArrowRight,
  Globe,
  Plus,
  Search,
  Zap,
  Navigation,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// Leaflet icon fix
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const locations = [
  { id: 1, name: 'City Central Food Bank', coords: [40.7128, -74.0060], type: 'Bank', needs: 'High' },
  { id: 2, name: 'Community Kitchen NW', coords: [40.7228, -74.0160], type: 'Shelter', needs: 'Medium' },
  { id: 3, name: 'Eco-Share Hub', coords: [40.7028, -73.9960], type: 'Collection', needs: 'Low' },
];

export const Donate = () => {
  const [radius, setRadius] = useState(5);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-2 italic">Donation & Map</h1>
          <p className="text-slate-400">Find nearby active donation points or list your surplus for pickup.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-8 py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center gap-2"
          >
            <Plus size={20} />
            <span>Post Donation</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:h-[700px]">
        {/* Map Section */}
        <div className="lg:col-span-2 min-h-[400px] bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden relative group">
          <MapContainer center={[40.7128, -74.0060]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map(loc => (
              <Marker key={loc.id} position={loc.coords as [number, number]}>
                <Popup>
                  <div className="p-2">
                    <h4 className="font-bold text-slate-900">{loc.name}</h4>
                    <p className="text-xs text-slate-500 italic">{loc.type} - {loc.needs} Urgent</p>
                    <button className="mt-2 text-[10px] bg-emerald-500 text-white px-2 py-1 rounded font-bold uppercase">View Directions</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Overlays */}
          <div className="absolute top-4 left-4 right-4 sm:right-auto sm:top-6 sm:left-6 z-[1000] sm:w-64 p-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>Search Radius</span>
              <span className="text-emerald-400 font-mono">{radius}km</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={radius} 
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full accent-emerald-500" 
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] flex gap-2 w-[calc(100%-2rem)] sm:w-auto overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 px-4 sm:px-0 no-scrollbar">
             <button className="whitespace-nowrap px-6 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-full border border-slate-800 flex items-center gap-2 hover:bg-slate-900 transition-colors">
               <Navigation size={14} /> My Location
             </button>
             <button className="whitespace-nowrap px-6 py-2.5 bg-slate-950 text-white text-xs font-bold rounded-full border border-slate-800 flex items-center gap-2 hover:bg-slate-900 transition-colors">
               <Globe size={14} /> Recenter
             </button>
          </div>
        </div>

        {/* Sidebar Info/Form */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] flex flex-col h-full overflow-hidden">
          {showForm ? (
            <div className="p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">Create Listing</h3>
               <form className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Food Item Name</label>
                    <input type="text" placeholder="e.g. Fresh Tomatoes" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Qty (kg/units)</label>
                      <input type="text" placeholder="2.5kg" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all font-mono" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Expiry Date</label>
                      <input type="date" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all text-slate-500" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Listing Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                      <input type="text" placeholder="Current Location" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
                    </div>
                  </div>
                  <button className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-slate-200 transition-all mt-4 uppercase tracking-tighter">
                    Post Donation
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full py-3 text-xs font-bold text-slate-500 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
               </form>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-8 pb-4">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tight mb-2">Nearby Points</h3>
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input type="text" placeholder="Search by name..." className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm border-2 border-transparent focus:border-emerald-500/30 transition-all" />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto px-8 space-y-4 custom-scrollbar">
                {locations.map(loc => (
                   <div key={loc.id} className="p-5 bg-slate-950/50 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-200 tracking-tight">{loc.name}</h4>
                        <span className={cn(
                          "text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest",
                          loc.needs === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-orange-500/10 text-orange-500'
                        )}>{loc.needs}</span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                         <span className="flex items-center gap-1"><MapPin size={10} /> 1.2km</span>
                         <span className="flex items-center gap-1"><Users size={10} /> {loc.type}</span>
                      </div>
                      <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex-1 py-2 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-black uppercase text-slate-400 hover:text-white transition-colors">Guide Me</button>
                        <button className="px-3 py-2 bg-emerald-500 text-slate-950 rounded-lg"><ArrowRight size={14} /></button>
                      </div>
                   </div>
                ))}
              </div>

              <div className="p-8 bg-slate-950/30 border-t border-slate-800">
                <div className="flex items-center gap-4 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                   <Info className="text-emerald-500 shrink-0" size={20} />
                   <p className="text-[10px] text-slate-400 leading-relaxed italic uppercase font-bold tracking-tight">
                     Helping others saves <span className="text-white">12kg</span> of CO2 per average donation.
                   </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
