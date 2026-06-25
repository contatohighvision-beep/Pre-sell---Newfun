export type PreSellTheme = 'luxury-dark' | 'casino-green' | 'midnight-purple' | 'neutral-blue' | 'ruby-red';

export type VerificationMode = 'single-click' | 'birth-date';

export interface PreSellConfig {
  destinationUrl: string;
  nicheTitle: string;
  nicheSubtitle: string;
  warningText: string;
  theme: PreSellTheme;
  verificationMode: VerificationMode;
  ctaText: string;
  countdownMinutes: number;
  showProgressTimer: boolean;
  companyName: string;
  logoText: string;
}

export const THEME_STYLES = {
  'luxury-dark': {
    bg: 'bg-neutral-950 text-neutral-100',
    cardBg: 'bg-neutral-900/80 border-neutral-800/80',
    accentColor: 'text-red-500',
    accentBg: 'bg-red-600 hover:bg-red-700 focus:ring-red-500/50',
    accentBorder: 'border-red-500/30',
    gradient: 'from-red-950/20 via-neutral-950 to-neutral-950',
    accentGlow: 'shadow-red-500/10',
    badge: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  'casino-green': {
    bg: 'bg-slate-950 text-slate-100',
    cardBg: 'bg-slate-900/80 border-slate-800/80',
    accentColor: 'text-emerald-500',
    accentBg: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500/50',
    accentBorder: 'border-emerald-500/30',
    gradient: 'from-emerald-950/20 via-slate-950 to-slate-950',
    accentGlow: 'shadow-emerald-500/10',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  'midnight-purple': {
    bg: 'bg-zinc-950 text-zinc-100',
    cardBg: 'bg-zinc-900/80 border-zinc-800/80',
    accentColor: 'text-purple-500',
    accentBg: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500/50',
    accentBorder: 'border-purple-500/30',
    gradient: 'from-purple-950/20 via-zinc-950 to-zinc-950',
    accentGlow: 'shadow-purple-500/10',
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  'neutral-blue': {
    bg: 'bg-slate-950 text-slate-100',
    cardBg: 'bg-slate-900/80 border-slate-800/80',
    accentColor: 'text-blue-500',
    accentBg: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/50',
    accentBorder: 'border-blue-500/30',
    gradient: 'from-blue-950/20 via-slate-950 to-slate-950',
    accentGlow: 'shadow-blue-500/10',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  'ruby-red': {
    bg: 'bg-stone-950 text-stone-100',
    cardBg: 'bg-stone-900/80 border-stone-800/80',
    accentColor: 'text-rose-500',
    accentBg: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500/50',
    accentBorder: 'border-rose-500/30',
    gradient: 'from-rose-950/20 via-stone-950 to-stone-950',
    accentGlow: 'shadow-rose-500/10',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
};
