/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, 
  ChevronLeft, 
  Check, 
  Lock, 
  Sparkles, 
  Smile, 
  Palette, 
  ShieldCheck,
  User,
  Zap,
  ChevronRight,
  Settings,
  Bell,
  LogOut,
  MessageSquare,
  Compass,
  Users,
  ExternalLink,
  Copy,
  Heart
} from 'lucide-react';

// --- Types & Constants ---

type ProfileState = {
  displayName: string;
  email: string;
  icon: string;
  flair: string;
  nameColor: string;
  badge: string;
  reactions: string[];
};

// Expanded Libraries (50+ Icons)
const ICONS = [
  { emoji: '🐱', premium: false }, { emoji: '🐶', premium: false }, { emoji: '🦊', premium: false },
  { emoji: '🐼', premium: true }, { emoji: '🐨', premium: true }, { emoji: '🐯', premium: true },
  { emoji: '🦁', premium: true }, { emoji: '🐮', premium: true }, { emoji: '🐷', premium: true },
  { emoji: '🐸', premium: true }, { emoji: '🦄', premium: true }, { emoji: '🐙', premium: true },
  { emoji: '🦖', premium: true }, { emoji: '👽', premium: true }, { emoji: '🤖', premium: true },
  { emoji: '🎃', premium: true }, { emoji: '👻', premium: true }, { emoji: '🎅', premium: true },
  { emoji: '🧛', premium: true }, { emoji: '🧟', premium: true }, { emoji: '🧞', premium: true },
  { emoji: '🧜', premium: true }, { emoji: '🧚', premium: true }, { emoji: '🧙', premium: true },
  { emoji: '🦋', premium: true }, { emoji: '🐌', premium: true }, { emoji: '🐞', premium: true },
  { emoji: '🐝', premium: true }, { emoji: '🐢', premium: true }, { emoji: '🐍', premium: true },
  { emoji: '🦎', premium: true }, { emoji: '🦖', premium: true }, { emoji: '🦕', premium: true },
  { emoji: '🐙', premium: true }, { emoji: '🦑', premium: true }, { emoji: '🦐', premium: true },
  { emoji: '🦞', premium: true }, { emoji: '🦀', premium: true }, { emoji: '🐡', premium: true },
  { emoji: '🐠', premium: true }, { emoji: '🐟', premium: true }, { emoji: '🐬', premium: true },
  { emoji: '🐳', premium: true }, { emoji: '🐋', premium: true }, { emoji: '🦈', premium: true },
  { emoji: '🐊', premium: true }, { emoji: '🐅', premium: true }, { emoji: '🐆', premium: true },
  { emoji: '🦓', premium: true }, { emoji: '🦍', premium: true }, { emoji: '🦧', premium: true },
  { emoji: '🐘', premium: true }, { emoji: '🦛', premium: true }, { emoji: '🦏', premium: true },
  { emoji: '🐪', premium: true }, { emoji: '🐫', premium: true }, { emoji: '🦒', premium: true },
  { emoji: '🦘', premium: true }, { emoji: '🐃', premium: true }, { emoji: '🐂', premium: true }
];

// Expanded Flairs (20+ Flairs)
const FLAIRS = [
  { id: 'none', label: 'None', class: '', premium: false },
  { id: 'neon', label: 'Neon', class: 'ring-4 ring-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]', premium: true },
  { id: 'gold', label: 'Gold', class: 'ring-4 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]', premium: true },
  { id: 'fire', label: 'Fire', class: 'ring-4 ring-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]', premium: true },
  { id: 'ice', label: 'Ice', class: 'ring-4 ring-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]', premium: true },
  { id: 'toxic', label: 'Toxic', class: 'ring-4 ring-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.5)]', premium: true },
  { id: 'void', label: 'Void', class: 'ring-4 ring-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.3)]', premium: true },
  { id: 'love', label: 'Love', class: 'ring-4 ring-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]', premium: true },
  { id: 'plasma', label: 'Plasma', class: 'ring-4 ring-fuchsia-600 shadow-[0_0_15px_rgba(192,38,211,0.5)]', premium: true },
  { id: 'emerald', label: 'Emerald', class: 'ring-4 ring-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]', premium: true },
  { id: 'sunset', label: 'Sunset', class: 'ring-4 ring-rose-400 shadow-[0_0_15px_rgba(251,113,133,0.5)]', premium: true },
  { id: 'ocean', label: 'Ocean', class: 'ring-4 ring-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]', premium: true },
  { id: 'forest', label: 'Forest', class: 'ring-4 ring-green-700 shadow-[0_0_15px_rgba(21,128,61,0.5)]', premium: true },
  { id: 'shadow', label: 'Shadow', class: 'ring-4 ring-black shadow-[0_0_15px_rgba(0,0,0,0.8)]', premium: true },
  { id: 'ghost', label: 'Ghost', class: 'ring-4 ring-slate-300 opacity-70 shadow-[0_0_15px_rgba(203,213,225,0.5)]', premium: true },
  { id: 'cyber', label: 'Cyber', class: 'ring-4 ring-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.5)]', premium: true },
  { id: 'candy', label: 'Candy', class: 'ring-4 ring-pink-300 shadow-[0_0_15px_rgba(249,168,212,0.5)]', premium: true },
  { id: 'galaxy', label: 'Galaxy', class: 'ring-4 ring-violet-900 shadow-[0_0_15px_rgba(76,29,149,0.5)]', premium: true },
  { id: 'ruby', label: 'Ruby', class: 'ring-4 ring-red-700 shadow-[0_0_15px_rgba(185,28,28,0.5)]', premium: true },
  { id: 'mint', label: 'Mint', class: 'ring-4 ring-teal-300 shadow-[0_0_15px_rgba(153,246,228,0.5)]', premium: true },
  { id: 'coffee', label: 'Coffee', class: 'ring-4 ring-amber-900 shadow-[0_0_15px_rgba(120,53,15,0.5)]', premium: true },
  { id: 'storm', label: 'Storm', class: 'ring-4 ring-gray-600 shadow-[0_0_15px_rgba(75,85,99,0.5)]', premium: true }
];

const COLORS = [
  { hex: '#FFFFFF', premium: false }, { hex: '#94A3B8', premium: false },
  { hex: '#F87171', premium: true }, { hex: '#FBBF24', premium: true },
  { hex: '#34D399', premium: true }, { hex: '#60A5FA', premium: true },
  { hex: '#A78BFA', premium: true }, { hex: '#F472B6', premium: true },
  { hex: '#FB923C', premium: true }, { hex: '#2DD4BF', premium: true }
];

const BADGES = [
  { emoji: '💎', premium: true }, { emoji: '⭐', premium: true }, { emoji: '👑', premium: true },
  { emoji: '❤️', premium: true }, { emoji: '🏆', premium: true }, { emoji: '🚀', premium: true },
  { emoji: '🔥', premium: true }, { emoji: '✨', premium: true }, { emoji: '🍕', premium: true }
];

const ALL_REACTIONS = [
  '😍', '😂', '🔥', '😱', '😢', '😡', '👏', '🙌', '💯', '✨', 
  '👀', '🤔', '💀', '🎉', '💔', '🍕', '🍦', '🎮', '🍿', '🎬',
  '🌈', '🌙', '⚡', '🍀', '💎', '🎈', '🎁', '🧸', '🐱', '🐶'
];

const INITIAL_STATE: ProfileState = {
  displayName: 'Raymond S',
  email: 'raymond.s@teleparty.com',
  icon: '🐱',
  flair: 'none',
  nameColor: '#FFFFFF',
  badge: '',
  reactions: ['😍', '😂', '🔥', '😱', '✨', '👏'],
};

// --- Components ---

const PremiumBadge = () => (
  <div className="absolute top-1 right-1 bg-yellow-400 text-black rounded-full p-0.5 shadow-sm z-10">
    <Crown size={10} fill="currentColor" />
  </div>
);

const SectionHeader = ({ icon: Icon, title, isPremium, isFree }: { icon: any, title: string, isPremium?: boolean, isFree?: boolean }) => (
  <div className="flex items-center gap-2 text-zinc-400 mb-4">
    <Icon size={16} />
    <h3 className="text-xs font-bold uppercase tracking-widest">{title}</h3>
    {isFree && <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-500 font-bold">FREE</span>}
    {isPremium && <Crown size={12} className="text-yellow-400" fill="currentColor" />}
  </div>
);

const MenuItem = ({ icon: Icon, label, sublabel, onClick, variant = 'default' }: { icon: any, label: string, sublabel?: string, onClick?: () => void, variant?: 'default' | 'danger' }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 transition-all active:scale-[0.98] ${variant === 'danger' ? 'bg-red-500/5 text-red-500' : 'bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900'}`}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-xl ${variant === 'danger' ? 'bg-red-500/10' : 'bg-zinc-800'}`}>
        <Icon size={18} />
      </div>
      <div className="text-left">
        <p className="font-bold text-sm">{label}</p>
        {sublabel && <p className="text-[10px] text-zinc-500 font-medium">{sublabel}</p>}
      </div>
    </div>
    {variant === 'default' && <ChevronRight size={16} className="text-zinc-600" />}
  </button>
);

export default function App() {
  const [view, setView] = useState<'home' | 'customize'>('home');
  const [profile, setProfile] = useState<ProfileState>(INITIAL_STATE);
  const [isPremium, setIsPremium] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);

  const handleSelection = (type: keyof ProfileState, value: any, premium: boolean) => {
    if (premium && !isPremium) {
      setShowUpgrade(true);
      return;
    }
    setProfile(prev => ({ ...prev, [type]: value }));
  };

  const toggleReaction = (emoji: string) => {
    if (!isPremium) {
      setShowUpgrade(true);
      return;
    }
    setProfile(prev => {
      if (prev.reactions.includes(emoji)) {
        return { ...prev, reactions: prev.reactions.filter(r => r !== emoji) };
      }
      if (prev.reactions.length >= 6) return prev;
      return { ...prev, reactions: [...prev.reactions, emoji] };
    });
  };

  const currentFlair = FLAIRS.find(f => f.id === profile.flair);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex justify-center selection:bg-purple-500/30">
      <div className="w-full max-w-md h-screen flex flex-col relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            /* --- Profile Home Screen --- */
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col overflow-y-auto no-scrollbar"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="w-10" /> {/* Spacer */}
                <h1 className="text-lg font-bold tracking-tight">My Profile</h1>
                <button className="p-2 rounded-full bg-zinc-900 border border-white/5 text-zinc-400">
                  <Bell size={20} />
                </button>
              </div>

              {/* Avatar Hero */}
              <div className="flex flex-col items-center py-8">
                <div className="relative">
                  <div className={`w-32 h-32 rounded-full bg-zinc-900 flex items-center justify-center text-6xl transition-all duration-500 ${currentFlair?.class}`}>
                    {profile.icon}
                  </div>
                  <button 
                    onClick={() => setView('customize')}
                    className="absolute bottom-0 right-0 p-3 bg-purple-600 rounded-full shadow-lg border-4 border-[#0A0A0A] hover:scale-110 transition-transform"
                  >
                    <Palette size={20} />
                  </button>
                </div>
                
                <div className="mt-6 text-center space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    {profile.badge && <span className="text-xl">{profile.badge}</span>}
                    <h2 className="text-2xl font-bold" style={{ color: profile.nameColor }}>{profile.displayName}</h2>
                    {isPremium && <Crown size={16} className="text-yellow-400" fill="currentColor" />}
                  </div>
                  <p className="text-zinc-500 text-xs font-medium">{profile.email}</p>
                  <p className="text-yellow-400/80 text-[10px] font-bold uppercase tracking-widest pt-1">Premium Member • Till 23 Jun 2026</p>
                </div>
              </div>

              {/* Menu Sections */}
              <div className="px-6 space-y-8 pb-32">
                {/* Identity Card */}
                <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Chat Identity</p>
                    <button onClick={() => setView('customize')} className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Customize</button>
                  </div>
                  <div className="bg-zinc-800/50 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-xl">{profile.icon}</div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: profile.nameColor }}>{profile.displayName}</p>
                      <div className="flex gap-1 mt-1">
                        {profile.reactions.slice(0, 4).map(r => <span key={r} className="text-xs">{r}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Services</p>
                  <MenuItem icon={Zap} label="Manage my accounts" sublabel="Connected to Netflix, Disney+" />
                </div>

                {/* Support */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Support / Community</p>
                  <MenuItem icon={ExternalLink} label="Contact Us" />
                  <MenuItem icon={Users} label="Join Teleparty Discord" />
                </div>

                {/* App Info */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">App Information</p>
                  <div className="bg-zinc-900/50 border border-white/5 rounded-3xl divide-y divide-white/5">
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-zinc-300">ID: f245a48e4a232780</p>
                        <p className="text-[10px] text-zinc-500">v64 Nightly Release</p>
                      </div>
                      <button className="p-2 text-zinc-500 hover:text-white"><Copy size={16} /></button>
                    </div>
                    <button className="w-full p-4 flex items-center justify-between text-zinc-300 hover:bg-zinc-900/50 transition-colors">
                      <span className="text-xs font-bold">Additional App Information</span>
                      <ChevronRight size={16} className="text-zinc-600" />
                    </button>
                  </div>
                </div>

                <MenuItem icon={LogOut} label="Sign out" variant="danger" />
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 left-0 w-full bg-zinc-950/80 backdrop-blur-lg border-t border-white/5 px-8 py-4 flex justify-between items-center z-20">
                <div className="flex flex-col items-center gap-1 text-purple-500">
                  <User size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-zinc-600">
                  <Compass size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Browse</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-zinc-600">
                  <MessageSquare size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Party</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-zinc-600">
                  <Heart size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Feedback</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* --- Customization Screen --- */
            <motion.div 
              key="customize"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex flex-col overflow-y-auto no-scrollbar"
            >
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
                <button 
                  onClick={() => setView('home')}
                  className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold tracking-tight">Style Your Identity</h1>
                <div className="w-10" />
              </div>

              {/* Hero Preview */}
              <div className="p-6 bg-gradient-to-b from-zinc-900/50 to-transparent">
                <div className="flex items-center gap-2 mb-4 text-zinc-500">
                  <Zap size={14} className="text-purple-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Live Preview</span>
                </div>
                
                <motion.div layout className="bg-zinc-900 border border-white/10 rounded-[32px] p-6 shadow-2xl shadow-purple-500/5">
                  <div className="flex items-start gap-4">
                    <div className={`relative w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-3xl transition-all duration-500 ${currentFlair?.class}`}>
                      {profile.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {profile.badge && <span className="text-sm">{profile.badge}</span>}
                        <span className="text-lg font-bold" style={{ color: profile.nameColor }}>{profile.displayName}</span>
                      </div>
                      <div className="bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 text-zinc-200 text-sm inline-block shadow-inner">
                        I love this scene! {profile.reactions.join(' ')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Customization Sections */}
              <div className="px-6 space-y-10 pb-32">
                
                {/* 1. Display Name */}
                <section>
                  <SectionHeader icon={User} title="Display Name" isFree />
                  <input 
                    type="text" 
                    value={profile.displayName}
                    onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                    placeholder="Enter name..."
                  />
                </section>

                {/* 2. Icons & Flairs */}
                <section className="space-y-8">
                  <div>
                    <SectionHeader icon={Sparkles} title={`Icons (${ICONS.length})`} />
                    <div className="grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                      {ICONS.map((item) => (
                        <button
                          key={item.emoji}
                          onClick={() => handleSelection('icon', item.emoji, item.premium)}
                          className={`relative aspect-square rounded-xl flex items-center justify-center text-xl transition-all ${profile.icon === item.emoji ? 'bg-purple-600 scale-105 shadow-lg shadow-purple-600/20' : 'bg-zinc-900 hover:bg-zinc-800'}`}
                        >
                          <span className={item.premium && !isPremium ? 'blur-[2px] opacity-50' : ''}>{item.emoji}</span>
                          {item.premium && !isPremium && <PremiumBadge />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <SectionHeader icon={Crown} title={`Flairs (${FLAIRS.length})`} isPremium />
                    <div className="grid grid-cols-4 gap-3 max-h-[250px] overflow-y-auto pr-2 no-scrollbar">
                      {FLAIRS.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelection('flair', item.id, item.premium)}
                          className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${profile.flair === item.id ? 'bg-purple-600 scale-105 shadow-lg shadow-purple-600/20' : 'bg-zinc-900 hover:bg-zinc-800'}`}
                        >
                          <div className={`w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] ${item.class}`}>
                            {profile.icon}
                          </div>
                          <span className="text-[8px] font-bold uppercase tracking-tighter truncate w-full px-1">{item.label}</span>
                          {item.premium && !isPremium && <PremiumBadge />}
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 3. Name Color */}
                <section>
                  <SectionHeader icon={Palette} title="Name Color" isPremium />
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map((item) => (
                      <button
                        key={item.hex}
                        onClick={() => handleSelection('nameColor', item.hex, item.premium)}
                        className={`relative w-10 h-10 rounded-full border-4 transition-all ${profile.nameColor === item.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent'}`}
                        style={{ backgroundColor: item.hex }}
                      >
                        {item.premium && !isPremium && <PremiumBadge />}
                      </button>
                    ))}
                  </div>
                </section>

                {/* 4. Chat Badge */}
                <section>
                  <SectionHeader icon={ShieldCheck} title="Chat Badge" isPremium />
                  <div className="grid grid-cols-4 gap-3">
                    {BADGES.map((item) => (
                      <button
                        key={item.emoji}
                        onClick={() => handleSelection('badge', item.emoji, item.premium)}
                        className={`relative aspect-square rounded-2xl flex items-center justify-center text-xl transition-all ${profile.badge === item.emoji ? 'bg-purple-600 scale-105 shadow-lg shadow-purple-600/20' : 'bg-zinc-900 hover:bg-zinc-800'}`}
                      >
                        <span className={item.premium && !isPremium ? 'blur-[2px] opacity-50' : ''}>{item.emoji}</span>
                        {item.premium && !isPremium && <PremiumBadge />}
                      </button>
                    ))}
                    <button
                      onClick={() => setProfile({ ...profile, badge: '' })}
                      className={`aspect-square rounded-2xl flex items-center justify-center text-xs font-bold uppercase tracking-tighter transition-all ${profile.badge === '' ? 'bg-zinc-700' : 'bg-zinc-900 text-zinc-500'}`}
                    >
                      None
                    </button>
                  </div>
                </section>

                {/* 5. Reactions */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <SectionHeader icon={Smile} title="Quick Reactions" isPremium />
                    <button 
                      onClick={() => setShowReactionPicker(true)}
                      className="text-[10px] font-bold text-purple-400 uppercase tracking-widest"
                    >
                      Change
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {profile.reactions.map((r, i) => (
                      <div key={i} className="aspect-square bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center text-xl">
                        {r}
                      </div>
                    ))}
                    {Array.from({ length: 6 - profile.reactions.length }).map((_, i) => (
                      <div key={i} className="aspect-square bg-zinc-900/30 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-700">
                        <Lock size={12} />
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sticky Save */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A] to-transparent z-10">
                <button 
                  onClick={() => setView('home')}
                  className="w-full bg-white text-black font-bold py-4 rounded-2xl shadow-xl hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                  Save Identity
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Modals --- */}
        
        <AnimatePresence>
          {showReactionPicker && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                className="w-full bg-zinc-900 rounded-t-[32px] p-6 max-h-[80vh] flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold">Pick Reactions</h3>
                    <p className="text-xs text-zinc-500">Choose up to 6 for quick access</p>
                  </div>
                  <button onClick={() => setShowReactionPicker(false)} className="p-2 bg-zinc-800 rounded-full text-zinc-400"><Check size={20} /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto grid grid-cols-5 gap-3 pb-6 no-scrollbar">
                  {ALL_REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => toggleReaction(emoji)}
                      className={`aspect-square rounded-2xl text-2xl flex items-center justify-center transition-all relative ${profile.reactions.includes(emoji) ? 'bg-purple-600 scale-110 shadow-lg' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                    >
                      {emoji}
                      {profile.reactions.includes(emoji) && (
                        <div className="absolute -top-1 -right-1 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">
                          {profile.reactions.indexOf(emoji) + 1}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {showUpgrade && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-zinc-900 border border-white/10 rounded-[32px] p-8 w-full max-w-sm text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" />
                <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Crown size={32} className="text-yellow-400" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Unlock Premium</h3>
                <p className="text-zinc-400 text-sm mb-8">Get exclusive icons, neon flairs, custom name colors, and unique chat badges.</p>
                <button className="w-full bg-white text-black font-bold py-4 rounded-2xl mb-3 hover:bg-zinc-200 transition-colors">Upgrade for $4.99/mo</button>
                <button onClick={() => setShowUpgrade(false)} className="text-zinc-500 text-sm font-medium hover:text-white transition-colors">Maybe later</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
