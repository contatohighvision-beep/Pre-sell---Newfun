import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Clock, CreditCard, ChevronRight, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-react';
import { PreSellConfig, THEME_STYLES } from '../types';

interface PreSellPageProps {
  config: PreSellConfig;
  onReset: () => void;
}

export default function PreSellPage({ config, onReset }: PreSellPageProps) {
  const [secondsLeft, setSecondsLeft] = useState(config.countdownMinutes * 60);
  const [clickCount, setClickCount] = useState(0);

  const styles = THEME_STYLES[config.theme];

  // Countdown timer effect
  useEffect(() => {
    if (!config.showProgressTimer) return;
    
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [config.showProgressTimer]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleCtaClick = () => {
    setClickCount((prev) => prev + 1);
    
    // Simulate real-world redirection
    // In our preview iframe, window.open might be blocked, so we direct the current tab, or show an alert,
    // or let the iframe redirect. Let's make it behave like a real button that tries window.open or window.location.href.
    // Also, we can show a nice "Redirecionando..." modal!
    
    // Attempt window open. In many sandboxed environments, we should fallback gracefully.
    try {
      window.open(config.destinationUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      // Fallback
      window.location.href = config.destinationUrl;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-500 ${styles.bg}`}>
      {/* Background Decor */}
      <div className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} opacity-80`} />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-neutral-800/10 blur-[120px] animate-pulse-slow" />
      
      {/* Navigation Top Bar */}
      <header className="relative z-10 border-b border-neutral-900 bg-neutral-950/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white shadow ${styles.accentBg}`}>
              {config.logoText || '18+'}
            </div>
            <span className="font-display font-bold text-white tracking-tight">
              {config.companyName || 'Acesso Restrito'}
            </span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-400 transition-colors"
            id="reset-preview-button"
          >
            <RefreshCw size={12} />
            <span>Refazer Teste</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl py-6 sm:py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`p-6 sm:p-10 rounded-3xl border backdrop-blur-xl shadow-2xl ${styles.cardBg} ${styles.accentGlow}`}
            id="pre-sell-container"
          >
            {/* Header Success State */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-1">
                Idade Verificada com Sucesso
              </h2>
              <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-3">
                {config.nicheTitle}
              </h1>
              <p className="text-neutral-400 text-sm max-w-md">
                Você cumpre todos os requisitos e foi autorizado(a) a prosseguir para o conteúdo principal.
              </p>
            </div>

            {/* Countdown Urgency Warning */}
            {config.showProgressTimer && (
              <div className="bg-neutral-950/60 border border-neutral-900 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                    <Clock size={20} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Seu link seguro expira em breve</h3>
                    <p className="text-xs text-neutral-500">Aproveite sua vaga reservada agora mesmo</p>
                  </div>
                </div>
                <div className="font-mono text-2xl font-bold text-orange-400 bg-orange-500/5 px-4 py-1.5 rounded-xl border border-orange-500/10">
                  {formatTime(secondsLeft)}
                </div>
              </div>
            )}

            {/* Guarantees / Social Proof Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-neutral-950/40 rounded-xl border border-neutral-900 flex items-start gap-3">
                <div className={`p-1.5 rounded-lg bg-neutral-900 ${styles.accentColor}`}>
                  <Lock size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white mb-0.5">Navegação Blindada</h4>
                  <p className="text-[11px] text-neutral-500 leading-normal">Criptografia de ponta a ponta que protege seu IP e dados de rastreamento.</p>
                </div>
              </div>

              <div className="p-4 bg-neutral-950/40 rounded-xl border border-neutral-900 flex items-start gap-3">
                <div className={`p-1.5 rounded-lg bg-neutral-900 ${styles.accentColor}`}>
                  <CreditCard size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white mb-0.5">Fatura Discreta</h4>
                  <p className="text-[11px] text-neutral-500 leading-normal">Cobranças seguras aparecem com nome neutro e confidencial na sua fatura.</p>
                </div>
              </div>
            </div>

            {/* Core Action Button (Pre-sell Conversion CTA) */}
            <div className="space-y-4">
              <button
                onClick={handleCtaClick}
                className={`w-full py-5 px-8 rounded-2xl font-display font-extrabold text-white text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] shadow-xl flex items-center justify-center gap-3 cursor-pointer ${styles.accentBg}`}
                id="pre-sell-cta"
              >
                {config.ctaText}
                <ChevronRight size={22} className="animate-bounce-horizontal" />
              </button>
              
              <div className="text-center">
                <p className="text-xs text-neutral-500">
                  Ao clicar, você será redirecionado com segurança para: <span className="text-neutral-400 font-mono break-all">{config.destinationUrl}</span>
                </p>
                {clickCount > 0 && (
                  <p className="text-[11px] text-emerald-400 mt-2">
                    Simulado: Redirecionamento disparado ({clickCount}x)
                  </p>
                )}
              </div>
            </div>

            {/* Simulated Reviews/Comments to boost conversion */}
            <div className="mt-8 pt-6 border-t border-neutral-900/80">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 text-center sm:text-left">
                O que dizem os membros recentes
              </h3>
              
              <div className="space-y-3">
                <div className="text-xs bg-neutral-950/30 p-3 rounded-lg border border-neutral-900/60">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-white">Gabriel S.</span>
                    <span className="text-neutral-600 font-mono">Há 2 minutos</span>
                  </div>
                  <p className="text-neutral-400">Passou direto pela confirmação e o site oficial carregou super rápido. Muito seguro!</p>
                </div>
                <div className="text-xs bg-neutral-950/30 p-3 rounded-lg border border-neutral-900/60">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-white">Juliana M.</span>
                    <span className="text-neutral-600 font-mono">Há 8 minutos</span>
                  </div>
                  <p className="text-neutral-400">A página de aviso me deixou segura. A cobrança no cartão realmente veio com nome neutro.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Trust Badges Footer */}
      <footer className="relative z-10 py-6 border-t border-neutral-950 bg-neutral-950/80 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-neutral-600">
          <p>© {new Date().getFullYear()} {config.companyName}. Todos os direitos reservados. Proibida reprodução total ou parcial.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-neutral-400 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-neutral-400 cursor-pointer">Contato</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
