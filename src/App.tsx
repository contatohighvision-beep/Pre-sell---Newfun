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

  const handleVerify = () => {
    setHasVerified(true);
  };

  const handleResetGate = () => {
    setHasVerified(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans w-full h-full overflow-y-auto">
      <AnimatePresence mode="wait">
        {!hasVerified ? (
          <motion.div
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <AgeGate config={config} onVerify={handleVerify} />
          </motion.div>
        ) : (
          <motion.div
            key="presell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen"
          >
            <PreSellPage config={config} onReset={handleResetGate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
