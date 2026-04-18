import React from 'react';
import { 
  Search, 
  ChevronDown, 
  MessageCircle, 
  HelpCircle, 
  ArrowRight,
  Send,
  Mail,
  Smartphone
} from 'lucide-react';

const FAQItem = ({ question, answer }: any) => (
  <div className="border-b border-slate-800 last:border-0 py-6 group">
    <div className="flex justify-between items-center cursor-pointer group-hover:text-emerald-400 transition-colors">
      <h4 className="font-bold text-lg text-slate-200">{question}</h4>
      <ChevronDown size={20} className="text-slate-600 transition-transform group-hover:rotate-180" />
    </div>
    <p className="mt-4 text-slate-500 leading-relaxed text-sm">
      {answer}
    </p>
  </div>
);

export const Support = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <header className="text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">How can we help?</h1>
        <p className="text-slate-400 max-w-xl mx-auto font-medium text-sm sm:text-base px-4">Search our documentation or reach out to our team of sustainability experts.</p>
        
        <div className="max-w-2xl mx-auto relative mt-10">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
          <input 
            type="text" 
            placeholder="Search keywords (e.g., expiry, scanner, points)..."
            className="w-full bg-slate-900 border-2 border-slate-800 rounded-[2rem] py-5 pl-16 pr-8 text-white focus:outline-none focus:border-emerald-500 transition-all shadow-2xl"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem]">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <HelpCircle className="text-emerald-500" size={28} />
              Frequently Asked Questions
            </h3>
            <div className="divide-y divide-slate-800">
              <FAQItem 
                question="How does the AI Scanner work?" 
                answer="Our AI scanner uses advanced computer vision to identify items on your receipt or from direct camera input. It automatically calculates estimated shelf lives based on a global food safety database."
              />
              <FAQItem 
                question="Can I donate opened products?" 
                answer="For food safety reasons, most charities only accept unopened and properly sealed non-perishable goods. Check individual organization profiles for their specific requirements."
              />
              <FAQItem 
                question="Is my location data private?" 
                answer="Yes. We only use your location to find nearby charities and other donors. This data is never shared with third parties or used for tracking."
              />
              <FAQItem 
                question="How are Sustainability Points calculated?" 
                answer="Points are awarded for inventory tracking, successful use of expiring items, and verified donations. Higher frequency of zero-waste actions yields point multipliers."
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-500">
              <MessageCircle size={100} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Support</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">Our team typically responds within 4 hours during business days.</p>
            
            <form className="space-y-4">
              <input type="text" placeholder="Subject" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
              <textarea placeholder="How can we help?" rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all" />
              <button className="w-full py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
                Send Message <Send size={16} />
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-[2.5rem] text-white">
            <h3 className="text-xl font-black uppercase tracking-tight italic mb-4">Direct Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg"><Mail size={18} /></div>
                <span className="text-sm font-bold">support@intellifood.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg"><Smartphone size={18} /></div>
                <span className="text-sm font-bold">+1 (888) INTELLI-FOOD</span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm">
              View Status Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
