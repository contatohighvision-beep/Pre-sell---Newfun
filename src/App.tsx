/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Monitor, Eye, SlidersHorizontal, Settings2, Sparkles, AlertCircle } from 'lucide-react';
import AgeGate from './components/AgeGate';
import PreSellPage from './components/PreSellPage';
import ConfigPanel from './components/ConfigPanel';
import CodeExporter from './components/CodeExporter';
import { PreSellConfig, PreSellTheme } from './types';

export default function App() {
  // Initial pre-sell config (perfectly responsive & optimized for conversion)
  const [config, setConfig] = useState<PreSellConfig>({
    destinationUrl: 'https://playnew.fun/?id=588086680&currency=BRL&type=2',
    nicheTitle: 'Plataforma de Jogos Online Autenticada',
    nicheSubtitle: 'Verificação Obrigatória de Idade',
    warningText: 'Jogos de azar e apostas online envolvem riscos financeiros e são proibidos por lei para menores de 18 anos. Confirme sua maioridade para entrar.',
    theme: 'casino-green',
    verificationMode: 'single-click',
    ctaText: 'ENTRAR NO CASSINO OFICIAL 🎰',
    countdownMinutes: 5,
    showProgressTimer: true,
    companyName: 'PLATAFORMA AUTORIZADA',
    logoText: '18+',
    directRedirect: true,
  });

  // Flow State
  const [hasVerified, setHasVerified] = useState(false);
  const [sidebarActiveTab, setSidebarActiveTab] = useState<'edit' | 'code'>('edit');
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showMobileConfig, setShowMobileConfig] = useState(false);

  const handleVerify = () => {
    setHasVerified(true);
  };

  const handleResetGate = () => {
    setHasVerified(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col lg:flex-row overflow-hidden">
      
      {/* 1. LEFT CONTAINER: Live Emulator & Workspace Header */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden bg-neutral-950">
        
        {/* Workspace Mini-Header */}
        <header className="h-14 border-b border-neutral-900 bg-neutral-950/80 px-4 flex items-center justify-between shrink-0 relative z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h1 className="font-display font-black text-white text-sm tracking-tight uppercase flex items-center gap-1.5">
              Pre-Sell Builder +18
            </h1>
          </div>

          {/* Viewport Toggles (Only on large screens) */}
          <div className="hidden sm:flex items-center gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
            <button
              onClick={() => setViewportMode('desktop')}
              className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                viewportMode === 'desktop'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="Visualização Computador"
              id="view-desktop-button"
            >
              <Monitor size={14} />
              <span>Computador</span>
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                viewportMode === 'mobile'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
              title="Visualização Celular"
              id="view-mobile-button"
            >
              <Smartphone size={14} />
              <span>Celular</span>
            </button>
          </div>

          {/* Mobile Config Toggle */}
          <button
            onClick={() => setShowMobileConfig(!showMobileConfig)}
            className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            id="mobile-config-toggle"
          >
            <SlidersHorizontal size={14} />
            <span>Configurações</span>
          </button>
        </header>

        {/* Dynamic Emulator Screen */}
        <div className="flex-grow bg-neutral-950 flex items-center justify-center p-2 sm:p-6 overflow-y-auto relative">
          
          {/* Outer Ring/Chassis for Mobile Emulator */}
          <div
            className={`transition-all duration-300 ease-out w-full flex justify-center ${
              viewportMode === 'mobile'
                ? 'max-w-[400px] h-[780px] border-8 sm:border-12 border-neutral-900 rounded-[3rem] shadow-2xl relative overflow-hidden bg-neutral-950 ring-2 ring-neutral-800/50'
                : 'max-w-full h-full'
            }`}
            id="viewport-frame"
          >
            {/* If in mobile viewport mode, simulate ear-speaker/camera bezel */}
            {viewportMode === 'mobile' && (
              <div className="absolute top-0 inset-x-0 h-6 bg-neutral-900 z-50 flex justify-center items-center pointer-events-none">
                <div className="w-16 h-4 bg-black rounded-b-xl" />
              </div>
            )}

            {/* Inner viewport container */}
            <div className={`w-full h-full overflow-y-auto ${viewportMode === 'mobile' ? 'pt-6' : ''}`}>
              <AnimatePresence mode="wait">
                {!hasVerified ? (
                  <motion.div
                    key="gate"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <AgeGate config={config} onVerify={handleVerify} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="presell"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full"
                  >
                    <PreSellPage config={config} onReset={handleResetGate} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RIGHT CONTAINER: Sidebar customizer (Desktop) */}
      <aside className="hidden lg:block w-[420px] shrink-0 h-screen overflow-hidden shadow-2xl relative z-30">
        {sidebarActiveTab === 'edit' ? (
          <ConfigPanel
            config={config}
            onChange={setConfig}
            onResetGate={handleResetGate}
            activeTab={sidebarActiveTab}
            setActiveTab={setSidebarActiveTab}
          />
        ) : (
          <div className="h-full flex flex-col bg-neutral-900 border-l border-neutral-800 text-neutral-200 text-sm overflow-hidden">
            <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings2 className="text-red-500" size={18} />
                <h2 className="font-display font-bold tracking-tight text-white text-base">
                  Painel do Produtor
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-neutral-800 bg-neutral-950/40">
              <button
                onClick={() => setSidebarActiveTab('edit')}
                className="py-3 text-center font-medium border-b-2 border-transparent text-neutral-400 hover:text-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Configurar Pre-Sell
              </button>
              <button
                onClick={() => setSidebarActiveTab('code')}
                className="py-3 text-center font-medium border-b-2 border-red-500 text-white bg-neutral-800/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Gerar Código
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              <CodeExporter config={config} />
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Drawer (Only displayed when mobile config is expanded) */}
      <AnimatePresence>
        {showMobileConfig && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 top-14 bg-neutral-900 border-t border-neutral-800 z-40 overflow-y-auto shadow-2xl flex flex-col lg:hidden"
            id="mobile-config-drawer"
          >
            <div className="flex-grow">
              {sidebarActiveTab === 'edit' ? (
                <ConfigPanel
                  config={config}
                  onChange={setConfig}
                  onResetGate={handleResetGate}
                  activeTab={sidebarActiveTab}
                  setActiveTab={setSidebarActiveTab}
                />
              ) : (
                <div className="flex flex-col bg-neutral-900 text-neutral-200 text-sm overflow-hidden">
                  <div className="grid grid-cols-2 border-b border-neutral-800 bg-neutral-950/40">
                    <button
                      onClick={() => setSidebarActiveTab('edit')}
                      className="py-3 text-center font-medium border-b-2 border-transparent text-neutral-400 hover:text-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Configurar Pre-Sell
                    </button>
                    <button
                      onClick={() => setSidebarActiveTab('code')}
                      className="py-3 text-center font-medium border-b-2 border-red-500 text-white bg-neutral-800/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Gerar Código
                    </button>
                  </div>
                  <div className="p-6">
                    <CodeExporter config={config} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
