import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, AlertCircle, Sparkles, ChevronRight, Check, RefreshCw } from 'lucide-react';
import { PreSellConfig, THEME_STYLES } from '../types';

interface AgeGateProps {
  config: PreSellConfig;
  onVerify: () => void;
}

export default function AgeGate({ config, onVerify }: AgeGateProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [denied, setDenied] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Date of birth state (used if verificationMode is 'birth-date')
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const styles = THEME_STYLES[config.theme];

  const handleVerifySuccess = () => {
    setErrorMessage(null);
    if (config.directRedirect) {
      setIsRedirecting(true);
      // Brief aesthetic delay so the user feels the secure check and confirmation, then direct redirection
      setTimeout(() => {
        try {
          if (window.parent && window.parent !== window) {
            window.parent.location.href = config.destinationUrl;
          } else {
            window.location.href = config.destinationUrl;
          }
        } catch (e) {
          window.location.href = config.destinationUrl;
        }
      }, 1200);
    } else {
      onVerify();
    }
  };

  const handleVerifyFailure = () => {
    setDenied(true);
    setErrorMessage('Acesso bloqueado. Este site é exclusivo para maiores de 18 anos.');
  };

  const handleQuickVerify = (isOver18: boolean) => {
    if (isOver18) {
      handleVerifySuccess();
    } else {
      handleVerifyFailure();
    }
  };

  const handleBirthDateVerify = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      setErrorMessage('Por favor, insira uma data válida.');
      return;
    }

    if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
      setErrorMessage('Por favor, insira uma data válida real.');
      return;
    }

    // Calculate age
    const today = new Date();
    const birthDate = new Date(y, m - 1, d);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 18) {
      handleVerifySuccess();
    } else {
      handleVerifyFailure();
    }
  };

  if (isRedirecting) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${styles.bg}`}>
        <div className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} opacity-80`} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-600/10 blur-[120px] animate-pulse-slow" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative z-10 w-full max-w-md p-8 rounded-2xl border backdrop-blur-xl shadow-2xl text-center ${styles.cardBg} border-emerald-500/20 shadow-emerald-500/5`}
          id="redirecting-card"
        >
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6">
            <RefreshCw className="animate-spin" size={32} />
          </div>

          <h2 className="text-2xl font-display font-bold tracking-tight text-white mb-3">
            Acesso Autorizado!
          </h2>
          
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            Sua maioridade foi confirmada. Redirecionando com segurança de forma criptografada...
          </p>

          <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/5 py-2 px-3 rounded-lg border border-emerald-500/10 break-all">
            {config.destinationUrl}
          </div>
        </motion.div>
      </div>
    );
  }

  if (denied) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${styles.bg}`}>
        {/* Ambient Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} opacity-80`} />
        
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-600/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-orange-600/5 blur-[120px]" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`relative z-10 w-full max-w-md p-8 rounded-2xl border backdrop-blur-xl shadow-2xl text-center ${styles.cardBg} ${styles.accentGlow}`}
          id="access-denied-card"
        >
          <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert size={32} />
          </div>

          <h2 className="text-2xl font-display font-bold tracking-tight text-white mb-3">
            Acesso Restrito
          </h2>
          
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            Lamentamos, mas você não atende aos requisitos de idade mínima para acessar este conteúdo.
          </p>

          <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-3 text-red-400 text-xs mb-8">
            Este site é estritamente proibido para menores de 18 anos devido à natureza de seu conteúdo.
          </div>

          <button
            onClick={() => {
              setDenied(false);
              setErrorMessage(null);
              setDay('');
              setMonth('');
              setYear('');
            }}
            className="w-full py-3 px-4 rounded-xl font-medium bg-neutral-800 hover:bg-neutral-700 text-white transition-all text-sm cursor-pointer"
            id="back-button"
          >
            Tentar Novamente
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${styles.bg}`}>
      {/* Ambient Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} opacity-80`} />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-red-600/10 blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neutral-600/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative z-10 w-full max-w-lg p-6 sm:p-10 rounded-3xl border backdrop-blur-xl shadow-2xl ${styles.cardBg} ${styles.accentGlow}`}
        id="age-gate-card"
      >
        {/* Top Header Badge */}
        <div className="flex justify-center mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${styles.badge}`}>
            <Sparkles size={12} />
            Aviso de Maioridade
          </span>
        </div>

        {/* 18+ Restrictive Circle */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-950 border border-neutral-800 relative shadow-inner">
            <span className="font-display text-3xl font-black tracking-tighter text-red-500">18+</span>
            <div className="absolute -inset-1 rounded-full border border-red-500/10 animate-ping opacity-30" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-center text-white mb-4">
          {config.nicheSubtitle}
        </h1>

        <p className="text-neutral-400 text-sm text-center leading-relaxed mb-8 max-w-sm mx-auto">
          {config.warningText}
        </p>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2"
          >
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {/* Interactive Verification Section */}
        {config.verificationMode === 'single-click' ? (
          <div className="space-y-4">
            <button
              onClick={() => handleQuickVerify(true)}
              className={`w-full py-4 px-6 rounded-xl font-display font-bold text-white transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-2 cursor-pointer ${styles.accentBg}`}
              id="confirm-age-button"
            >
              SIM, TENHO 18 ANOS OU MAIS
              <ChevronRight size={18} />
            </button>
            
            <button
              onClick={() => handleQuickVerify(false)}
              className="w-full py-3.5 px-6 rounded-xl font-medium bg-neutral-950/40 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-all text-sm cursor-pointer"
              id="deny-age-button"
            >
              NÃO, SOU MENOR DE 18 ANOS
            </button>
          </div>
        ) : (
          <form onSubmit={handleBirthDateVerify} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-neutral-400 uppercase tracking-wider text-center">
                Insira sua data de nascimento
              </label>
              
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  maxLength={2}
                  placeholder="Dia"
                  value={day}
                  onChange={(e) => setDay(e.target.value.replace(/\D/g, ''))}
                  className="bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-center text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-all font-mono"
                  id="birth-day"
                />
                <input
                  type="text"
                  maxLength={2}
                  placeholder="Mês"
                  value={month}
                  onChange={(e) => setMonth(e.target.value.replace(/\D/g, ''))}
                  className="bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-center text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-all font-mono"
                  id="birth-month"
                />
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Ano"
                  value={year}
                  onChange={(e) => setYear(e.target.value.replace(/\D/g, ''))}
                  className="bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-center text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 transition-all font-mono"
                  id="birth-year"
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                className={`w-full py-4 px-6 rounded-xl font-display font-bold text-white transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg flex items-center justify-center gap-2 cursor-pointer ${styles.accentBg}`}
                id="verify-birthdate-button"
              >
                VERIFICAR MINHA IDADE
                <ChevronRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => handleQuickVerify(false)}
                className="w-full py-2.5 text-neutral-500 hover:text-neutral-400 text-xs font-medium transition-all cursor-pointer"
                id="deny-birthdate-button"
              >
                Sou menor de idade, quero sair
              </button>
            </div>
          </form>
        )}

        {/* Footer Disclaimer */}
        <div className="mt-8 pt-6 border-t border-neutral-900 flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-1.5 text-neutral-500 text-[11px]">
            <Check size={12} className="text-neutral-400" />
            <span>Navegação Segura SSL Criptografada</span>
          </div>
          <p className="text-[10px] text-neutral-600 leading-normal max-w-[280px]">
            Ao confirmar sua idade, você concorda com nossos Termos de Uso e Políticas de Privacidade.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
