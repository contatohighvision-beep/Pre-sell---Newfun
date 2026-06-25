import { useState } from 'react';
import { Copy, Check, FileCode, Chrome, Info } from 'lucide-react';
import { PreSellConfig, THEME_STYLES } from '../types';

interface CodeExporterProps {
  config: PreSellConfig;
}

export default function CodeExporter({ config }: CodeExporterProps) {
  const [copiedType, setCopiedType] = useState<'html' | 'react' | null>(null);
  const [codeType, setCodeType] = useState<'html' | 'react'>('html');

  const handleCopy = (type: 'html' | 'react', codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const selectedThemeStyles = THEME_STYLES[config.theme];

  // Helper to extract theme parameters for HTML generation
  const getThemeHexColors = (theme: typeof config.theme) => {
    switch (theme) {
      case 'casino-green':
        return { primary: '#10b981', hover: '#059669', bg: '#020617', card: '#0f172a' };
      case 'midnight-purple':
        return { primary: '#a855f7', hover: '#9333ea', bg: '#09090b', card: '#18181b' };
      case 'neutral-blue':
        return { primary: '#3b82f6', hover: '#2563eb', bg: '#020617', card: '#0f172a' };
      case 'ruby-red':
        return { primary: '#f43f5e', hover: '#e11d48', bg: '#0c0a09', card: '#1c1917' };
      case 'luxury-dark':
      default:
        return { primary: '#ef4444', hover: '#dc2626', bg: '#0a0a0a', card: '#171717' };
    }
  };

  const colors = getThemeHexColors(config.theme);

  // Generate pure self-contained Single-File index.html code
  const getHtmlCode = () => {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aviso de Maioridade - ${config.companyName}</title>
  
  <!-- Tailwind CSS Play CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Font Google: Inter e Space Grotesk -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    .font-display {
      font-family: 'Space Grotesk', sans-serif;
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.6; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  </style>
</head>
<body class="bg-[${colors.bg}] text-neutral-100 min-h-screen relative overflow-hidden flex flex-col justify-between">

  <!-- Background decorative elements -->
  <div class="absolute inset-0 bg-gradient-to-b from-[${colors.primary}]/5 via-transparent to-transparent opacity-80 pointer-events-none"></div>
  <div class="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[${colors.primary}]/10 blur-[100px] animate-pulse-slow pointer-events-none"></div>

  <!-- HEADER -->
  <header class="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-md">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white shadow bg-[${colors.primary}]">
          ${config.logoText || '18+'}
        </div>
        <span class="font-display font-bold text-white tracking-tight">${config.companyName}</span>
      </div>
      <span class="text-[10px] bg-emerald-500/10 text-emerald-400 font-mono px-2.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        Conexão Segura
      </span>
    </div>
  </header>

  <!-- MAIN AREA (Holds the Gate and the Pre-Sell Page) -->
  <main class="relative z-10 flex-grow flex items-center justify-center p-4">
    
    <!-- 1. AGE WARNING GATE SCREEN -->
    <div id="age-gate" class="w-full max-w-lg p-6 sm:p-10 rounded-3xl border border-white/5 bg-[${colors.card}]/80 backdrop-blur-xl shadow-2xl transition-all duration-300">
      
      <!-- Top Badge -->
      <div class="flex justify-center mb-6">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-[${colors.primary}]/20 bg-[${colors.primary}]/10 text-[${colors.primary}]">
          🔞 Aviso de Maioridade
        </span>
      </div>

      <!-- Restrictive Circle -->
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/60 border border-white/10 relative">
          <span class="font-display text-3xl font-black text-[${colors.primary}]">18+</span>
        </div>
      </div>

      <h1 class="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-center text-white mb-4">
        ${config.nicheSubtitle}
      </h1>

      <p class="text-neutral-400 text-sm text-center leading-relaxed mb-8 max-w-sm mx-auto">
        ${config.warningText}
      </p>

      <div id="error-message" class="hidden mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center"></div>

      ${
        config.verificationMode === 'single-click'
          ? `<!-- Mode Single Click -->
      <div class="space-y-4">
        <button id="btn-confirm-age" class="w-full py-4 px-6 rounded-xl font-display font-bold text-white transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] bg-[${colors.primary}] hover:bg-[${colors.hover}] shadow-lg cursor-pointer">
          SIM, TENHO 18 ANOS OU MAIS
        </button>
        <button id="btn-deny-age" class="w-full py-3.5 px-6 rounded-xl font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-all text-sm cursor-pointer">
          NÃO, SOU MENOR DE 18 ANOS
        </button>
      </div>`
          : `<!-- Mode Birthdate -->
      <form id="form-birthdate" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-xs font-medium text-neutral-400 uppercase tracking-wider text-center">
            Insira sua data de nascimento
          </label>
          <div class="grid grid-cols-3 gap-3">
            <input type="text" id="input-day" max-length="2" placeholder="Dia" class="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-white/25 font-mono">
            <input type="text" id="input-month" max-length="2" placeholder="Mês" class="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-white/25 font-mono">
            <input type="text" id="input-year" max-length="4" placeholder="Ano" class="bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-center text-white focus:outline-none focus:border-white/25 font-mono">
          </div>
        </div>
        <div class="space-y-3">
          <button type="submit" class="w-full py-4 px-6 rounded-xl font-display font-bold text-white transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] bg-[${colors.primary}] hover:bg-[${colors.hover}] shadow-lg cursor-pointer">
            VERIFICAR MINHA IDADE
          </button>
          <button type="button" id="btn-deny-birth" class="w-full py-2.5 text-neutral-500 hover:text-neutral-400 text-xs font-medium cursor-pointer">
            Sou menor de idade, quero sair
          </button>
        </div>
      </form>`
      }

      <!-- Footer Disclaimer -->
      <div class="mt-8 pt-6 border-t border-white/5 text-center">
        <p class="text-[10px] text-neutral-500 leading-normal max-w-[280px] mx-auto">
          Ao confirmar sua idade, você concorda com nossos Termos de Uso e Políticas de Privacidade.
        </p>
      </div>
    </div>

    <!-- 2. PRE-SELL SCREEN (Initially Hidden) -->
    <div id="pre-sell-page" class="hidden w-full max-w-2xl p-6 sm:p-10 rounded-3xl border border-white/5 bg-[${colors.card}]/80 backdrop-blur-xl shadow-2xl transition-all duration-300">
      
      <!-- Success Icon -->
      <div class="flex flex-col items-center text-center mb-8">
        <div class="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        </div>
        <h2 class="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-1">Idade Verificada com Sucesso</h2>
        <h1 class="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-3">
          ${config.nicheTitle}
        </h1>
        <p class="text-neutral-400 text-sm max-w-md">
          Você cumpre todos os requisitos e foi autorizado(a) a prosseguir para o conteúdo principal.
        </p>
      </div>

      <!-- Urgency Countdown Timer -->
      ${
        config.showProgressTimer
          ? `<div class="bg-black/40 border border-white/5 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-xl bg-orange-500/10 text-orange-400">
            <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">Seu link seguro expira em breve</h3>
            <p class="text-xs text-neutral-500">Aproveite sua vaga reservada agora mesmo</p>
          </div>
        </div>
        <div id="countdown" class="font-mono text-2xl font-bold text-orange-400 bg-orange-500/5 px-4 py-1.5 rounded-xl border border-orange-500/10">
          ${String(config.countdownMinutes).padStart(2, '0')}:00
        </div>
      </div>`
          : ''
      }

      <!-- Core CTA Button -->
      <div class="space-y-4">
        <button id="btn-redirect" class="w-full py-5 px-8 rounded-2xl font-display font-extrabold text-white text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.01] hover:brightness-110 shadow-xl flex items-center justify-center gap-3 bg-[${colors.primary}] hover:bg-[${colors.hover}] cursor-pointer">
          ${config.ctaText}
        </button>
        <p class="text-center text-xs text-neutral-500">
          Você será redirecionado com segurança de forma criptografada.
        </p>
      </div>
    </div>

    <!-- 3. ACCESS RESTRICTED ERROR SCREEN -->
    <div id="access-denied" class="hidden w-full max-w-md p-8 rounded-2xl border border-red-500/20 bg-[${colors.card}]/80 backdrop-blur-xl shadow-2xl text-center">
      <div class="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <h2 class="text-2xl font-display font-bold tracking-tight text-white mb-3">Acesso Restrito</h2>
      <p class="text-neutral-400 text-sm leading-relaxed mb-8">
        Lamentamos, mas você não atende aos requisitos de idade mínima de 18 anos para visualizar este site.
      </p>
      <button id="btn-try-again" class="w-full py-3 px-4 rounded-xl font-medium bg-neutral-800 hover:bg-neutral-700 text-white transition-all text-sm cursor-pointer">
        Tentar Novamente
      </button>
    </div>

  </main>

  <!-- FOOTER -->
  <footer class="relative z-10 py-6 border-t border-white/5 bg-black/60 backdrop-blur">
    <div class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-neutral-600">
      <p>© ${new Date().getFullYear()} ${config.companyName}. Todos os direitos reservados.</p>
      <div class="flex items-center gap-4">
        <span>Termos de Uso</span>
        <span>Política de Privacidade</span>
      </div>
    </div>
  </footer>

  <!-- SCRIPT CONTROLLER -->
  <script>
    const REDIRECT_URL = "${config.destinationUrl}";
    const gateScreen = document.getElementById('age-gate');
    const preSellScreen = document.getElementById('pre-sell-page');
    const deniedScreen = document.getElementById('access-denied');
    const errorBox = document.getElementById('error-message');

    // Handler for successful age confirmation
    function unlockAccess() {
      gateScreen.classList.add('hidden');
      deniedScreen.classList.add('hidden');
      preSellScreen.classList.remove('hidden');
      
      // Start Countdown if element exists
      const countdownElement = document.getElementById('countdown');
      if (countdownElement) {
        let totalSeconds = ${config.countdownMinutes * 60};
        const timer = setInterval(() => {
          if (totalSeconds <= 0) {
            clearInterval(timer);
            return;
          }
          totalSeconds--;
          const mins = Math.floor(totalSeconds / 60);
          const secs = totalSeconds % 60;
          countdownElement.textContent = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
        }, 1000);
      }
    }

    // Handler for access denial
    function denyAccess() {
      gateScreen.classList.add('hidden');
      preSellScreen.classList.add('hidden');
      deniedScreen.classList.remove('hidden');
    }

    // Reset flow
    document.getElementById('btn-try-again').addEventListener('click', () => {
      deniedScreen.classList.add('hidden');
      gateScreen.classList.remove('hidden');
      errorBox.classList.add('hidden');
      errorBox.textContent = '';
      
      // Reset inputs
      if (document.getElementById('input-day')) {
        document.getElementById('input-day').value = '';
        document.getElementById('input-month').value = '';
        document.getElementById('input-year').value = '';
      }
    });

    // Redirection CTA Click Trigger
    document.getElementById('btn-redirect').addEventListener('click', () => {
      window.open(REDIRECT_URL, '_blank', 'noopener,noreferrer');
    });

    // Mode: Single Click Events
    const btnConfirm = document.getElementById('btn-confirm-age');
    if (btnConfirm) {
      btnConfirm.addEventListener('click', () => unlockAccess());
    }
    const btnDeny = document.getElementById('btn-deny-age');
    if (btnDeny) {
      btnDeny.addEventListener('click', () => denyAccess());
    }

    // Mode: Birth Date Form Events
    const formBirth = document.getElementById('form-birthdate');
    if (formBirth) {
      const btnDenyBirth = document.getElementById('btn-deny-birth');
      btnDenyBirth.addEventListener('click', () => denyAccess());

      formBirth.addEventListener('submit', (e) => {
        e.preventDefault();
        errorBox.classList.add('hidden');

        const d = parseInt(document.getElementById('input-day').value, 10);
        const m = parseInt(document.getElementById('input-month').value, 10);
        const y = parseInt(document.getElementById('input-year').value, 10);

        if (isNaN(d) || isNaN(m) || isNaN(y)) {
          errorBox.textContent = 'Por favor, insira uma data válida.';
          errorBox.classList.remove('hidden');
          return;
        }

        const today = new Date();
        const birthDate = new Date(y, m - 1, d);
        let age = today.getFullYear() - birthDate.getFullYear();
        const mDiff = today.getMonth() - birthDate.getMonth();
        if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        if (age >= 18) {
          unlockAccess();
        } else {
          denyAccess();
        }
      });
    }
  </script>
</body>
</html>`;
  };

  // Generate highly robust copyable React component code
  const getReactCode = () => {
    return `import React, { useState, useEffect } from 'react';

// Pre-Sell Age Gate Component with Tailwind CSS & Lucide Icons
export default function PreSellAgeGate() {
  const [stage, setStage] = useState<'gate' | 'approved' | 'denied'>('gate');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(${config.countdownMinutes * 60});
  const [errorMessage, setErrorMessage] = useState('');

  // Countdown timer for urgency
  useEffect(() => {
    if (stage !== 'approved' || !${config.showProgressTimer}) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [stage]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return \`\${String(m).padStart(2, '0')}:\${String(s).padStart(2, '0')}\`;
  };

  const handleVerify = (isOver18) => {
    if (isOver18) {
      setStage('approved');
    } else {
      setStage('denied');
    }
  };

  const handleBirthDateSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    if (isNaN(d) || isNaN(m) || isNaN(y)) {
      setErrorMessage('Data inválida.');
      return;
    }

    const today = new Date();
    const birth = new Date(y, m - 1, d);
    let age = today.getFullYear() - birth.getFullYear();
    const mDiff = today.getMonth() - birth.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age >= 18) {
      setStage('approved');
    } else {
      setStage('denied');
    }
  };

  const handleCtaClick = () => {
    window.open('${config.destinationUrl}', '_blank', 'noopener,noreferrer');
  };

  // 1. AGE GATE SCREEN
  if (stage === 'gate') {
    return (
      <div className="min-h-screen bg-[${colors.bg}] text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-lg p-8 rounded-3xl border border-white/5 bg-[${colors.card}]/80 backdrop-blur-xl shadow-2xl">
          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[${colors.primary}]/10 text-[${colors.primary}] border border-[${colors.primary}]/20">
              🔞 Aviso de Maioridade
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center text-white mb-4">
            ${config.nicheSubtitle}
          </h1>
          <p className="text-neutral-400 text-sm text-center leading-relaxed mb-8 max-w-sm mx-auto">
            ${config.warningText}
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
              {errorMessage}
            </div>
          )}

          {${config.verificationMode === 'single-click'} ? (
            <div className="space-y-4">
              <button onClick={() => handleVerify(true)} className="w-full py-4 px-6 rounded-xl font-bold text-white bg-[${colors.primary}] hover:bg-[${colors.hover}] transition-all cursor-pointer">
                SIM, TENHO 18 ANOS OU MAIS
              </button>
              <button onClick={() => handleVerify(false)} className="w-full py-3 px-6 rounded-xl font-medium bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer">
                NÃO, SOU MENOR
              </button>
            </div>
          ) : (
            <form onSubmit={handleBirthDateSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <input type="text" placeholder="Dia" value={day} onChange={e => setDay(e.target.value.replace(/\\D/g, ''))} className="bg-black/60 border border-white/10 rounded-xl py-3 text-center text-white focus:outline-none" />
                <input type="text" placeholder="Mês" value={month} onChange={e => setMonth(e.target.value.replace(/\\D/g, ''))} className="bg-black/60 border border-white/10 rounded-xl py-3 text-center text-white focus:outline-none" />
                <input type="text" placeholder="Ano" value={year} onChange={e => setYear(e.target.value.replace(/\\D/g, ''))} className="bg-black/60 border border-white/10 rounded-xl py-3 text-center text-white focus:outline-none" />
              </div>
              <button type="submit" className="w-full py-4 px-6 rounded-xl font-bold text-white bg-[${colors.primary}] hover:bg-[${colors.hover}] transition-all cursor-pointer">
                VERIFICAR MINHA IDADE
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // 2. APPROVED PRE-SELL SCREEN
  if (stage === 'approved') {
    return (
      <div className="min-h-screen bg-[${colors.bg}] text-white flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-2xl p-8 rounded-3xl border border-white/5 bg-[${colors.card}]/80 backdrop-blur-xl shadow-2xl text-center">
          <h1 className="text-3xl font-extrabold text-white mb-2">${config.nicheTitle}</h1>
          <p className="text-neutral-400 text-sm mb-6">Acesso autorizado com criptografia de ponta a ponta.</p>

          {${config.showProgressTimer} && (
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl mb-6 flex justify-between items-center text-left">
              <div>
                <p className="font-semibold text-white">Sua vaga expira em breve</p>
                <p className="text-xs text-neutral-500">Acesso por tempo limitado</p>
              </div>
              <span className="font-mono text-xl font-bold text-orange-400">{formatTime(secondsLeft)}</span>
            </div>
          )}

          <button onClick={handleCtaClick} className="w-full py-5 px-8 rounded-xl font-bold text-lg text-white bg-[${colors.primary}] hover:bg-[${colors.hover}] transition-all shadow-xl cursor-pointer">
            ${config.ctaText}
          </button>
        </div>
      </div>
    );
  }

  // 3. DENIED SCREEN
  return (
    <div className="min-h-screen bg-[${colors.bg}] text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md p-8 rounded-2xl border border-red-500/20 bg-[${colors.card}]/80 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Acesso Restrito</h2>
        <p className="text-neutral-400 text-sm mb-6">Este site é restrito apenas para maiores de 18 anos.</p>
        <button onClick={() => setStage('gate')} className="w-full py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer">
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}`;
  };

  return (
    <div className="space-y-6" id="code-exporter">
      {/* Code Type Tabs */}
      <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800">
        <button
          onClick={() => setCodeType('html')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            codeType === 'html'
              ? 'bg-red-600 text-white shadow'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          id="btn-code-html"
        >
          <Chrome size={12} />
          HTML Único (index.html)
        </button>
        <button
          onClick={() => setCodeType('react')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            codeType === 'react'
              ? 'bg-red-600 text-white shadow'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          id="btn-code-react"
        >
          <FileCode size={12} />
          Componente React
        </button>
      </div>

      {/* Copy Actions Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-medium">
            {codeType === 'html' ? 'Single-File HTML + CDN Tailwind' : 'Componente Funcional React'}
          </span>
          <button
            onClick={() => handleCopy(codeType, codeType === 'html' ? getHtmlCode() : getReactCode())}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              copiedType === codeType
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-800 hover:bg-neutral-750 text-white'
            }`}
            id="btn-copy-code"
          >
            {copiedType === codeType ? (
              <>
                <Check size={12} />
                Copiado!
              </>
            ) : (
              <>
                <Copy size={12} />
                Copiar Código
              </>
            )}
          </button>
        </div>

        {/* Code Block Container */}
        <div className="relative rounded-xl overflow-hidden bg-neutral-950 border border-neutral-850 max-h-[360px] flex flex-col">
          <pre className="p-4 overflow-auto text-[11px] font-mono text-neutral-300 leading-relaxed text-left flex-grow">
            <code>{codeType === 'html' ? getHtmlCode() : getReactCode()}</code>
          </pre>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3 text-left">
        <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-semibold text-blue-400">Como colocar no ar:</span>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            {codeType === 'html'
              ? 'Baixe ou copie o código acima, salve como "index.html" e hospede em qualquer servidor web gratuito como GitHub Pages, Netlify ou Vercel. O link de redirecionamento oficial já está embutido!'
              : 'Cole este arquivo na sua pasta de componentes, certifique-se de que o Tailwind CSS está configurado em sua aplicação React, e utilize-o como seu portão de entrada para maiores de 18 anos.'}
          </p>
        </div>
      </div>
    </div>
  );
}
