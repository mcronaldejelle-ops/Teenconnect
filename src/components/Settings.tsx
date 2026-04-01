import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Eye, MapPin, HelpCircle, Info, ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SettingsProps {
  onLogout: () => void;
  onBack: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ onLogout, onBack }) => {
  const sections = [
    {
      title: 'Account',
      items: [
        { icon: Bell, label: 'Notifications', value: 'On' },
        { icon: Shield, label: 'Privacy', value: 'Private' },
        { icon: Eye, label: 'Visibility', value: 'Everyone' },
      ],
    },
    {
      title: 'Discovery',
      items: [
        { icon: MapPin, label: 'Location', value: 'London, UK' },
        { icon: HelpCircle, label: 'Distance', value: '25 miles' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: Info, label: 'Help Center' },
        { icon: Shield, label: 'Safety Tips' },
        { icon: HelpCircle, label: 'Contact Us' },
      ],
    },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-24 animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-8 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black tracking-tight text-gray-900 uppercase italic">
            Settings
          </h1>
          <button
            onClick={onBack}
            className="p-2.5 bg-gray-50 rounded-2xl text-gray-400 hover:text-pink-500 transition-colors"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-8 space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">
              {section.title}
            </h3>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors group border-b border-gray-50 last:border-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-white transition-colors">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <span className="font-semibold text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className="text-sm font-medium text-pink-500">{item.value}</span>
                    )}
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={onLogout}
            className="w-full px-6 py-4 flex items-center gap-4 hover:bg-red-50 transition-colors group text-red-500"
          >
            <div className="p-2 bg-red-50 rounded-xl group-hover:bg-white transition-colors">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold">Logout</span>
          </button>
        </div>

        <div className="text-center space-y-2 py-8">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            TeenConnect v1.0.0
          </p>
          <p className="text-[10px] text-gray-300 px-12">
            Designed with ❤️ for teens everywhere.
          </p>
        </div>
      </div>
    </div>
  );
};
