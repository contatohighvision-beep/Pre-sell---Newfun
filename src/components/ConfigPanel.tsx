import { Settings, Eye, Code, Layers, Sparkles, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { PreSellConfig, PreSellTheme, VerificationMode } from '../types';

interface ConfigPanelProps {
  config: PreSellConfig;
  onChange: (newConfig: PreSellConfig) => void;
  onResetGate: () => void;
  activeTab: 'edit' | 'code';
  setActiveTab: (tab: 'edit' | 'code') => void;
}

export default function ConfigPanel({
  config,
  onChange,
  onResetGate,
  activeTab,
  setActiveTab,
}: ConfigPanelProps) {
  const updateField = (field: keyof PreSellConfig, value: any) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const themes: { id: PreSellTheme; label: string; color: string }[] = [
    { id: 'luxury-dark', label: 'Luxo Negro & Vermelho', color: 'bg-red-600' },
    { id: 'casino-green', label: 'Cassino Esmeralda', color: 'bg-emerald-600' },
    { id: 'midnight-purple', label: 'VIP Púrpura Imperial', color: 'bg-purple-600' },
    { id: 'neutral-blue', label: 'Clássico Azul Oceano', color: 'bg-blue-600' },
    { id: 'ruby-red', label: 'Rose Sensual', color: 'bg-rose-600' },
  ];

  const presets = [
    {
      name: '🔞 Adulto VIP',
      config: {
        nicheTitle: 'Acesso VIP ao Conteúdo Adulto',
        nicheSubtitle: 'Aviso de Conteúdo Adulto',
        warningText: 'Este site contém material adulto explícito e sensual reservado para maiores de idade. Ao entrar, você confirma que tem plena capacidade legal e é maior de 18 anos.',
        ctaText: 'ACESSAR CONTEÚDO VIP 🔞',
        theme: 'luxury-dark' as PreSellTheme,
      }
    },
    {
      name: '🎰 Cassino & Bets',
      config: {
        nicheTitle: 'Plataforma de Jogos Online Autenticada',
        nicheSubtitle: 'Verificação Obrigatória de Idade',
        warningText: 'Jogos de azar e apostas online envolvem riscos financeiros e são proibidos por lei para menores de 18 anos. Confirme sua maioridade para entrar.',
        ctaText: 'ENTRAR NO CASSINO OFICIAL 🎰',
        theme: 'casino-green' as PreSellTheme,
      }
    },
    {
      name: '🍾 Produtos +18',
      config: {
        nicheTitle: 'Loja Exclusiva de Produtos Sensoriais',
        nicheSubtitle: 'Ambiente Protegido para Maiores',
        warningText: 'Nossa loja online comercializa bebidas finas e produtos íntimos exclusivos para maiores de idade. Sua privacidade e sigilo na entrega são garantidos.',
        ctaText: 'VER CATÁLOGO COMPLETO 🛒',
        theme: 'ruby-red' as PreSellTheme,
      }
    },
    {
      name: '🔒 Geral / Seguro',
      config: {
        nicheTitle: 'Comunidade Fechada de Membros',
        nicheSubtitle: 'Área com Restrição de Idade',
        warningText: 'O acesso a esta área requer maioridade civil devido à natureza dos tópicos discutidos e privacidade dos membros participantes.',
        ctaText: 'PROSSEGUIR COM SEGURANÇA 🔒',
        theme: 'neutral-blue' as PreSellTheme,
      }
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    onChange({
      ...config,
      ...preset.config,
    });
    onResetGate();
  };

  return (
    <div className="h-full flex flex-col bg-neutral-900 border-l border-neutral-800 text-neutral-200 text-sm overflow-hidden" id="config-panel">
      {/* Panel Header */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="text-red-500 animate-spin-slow" size={18} />
          <h2 className="font-display font-bold tracking-tight text-white text-base">
            Painel do Produtor
          </h2>
        </div>
        <span className="text-[10px] bg-red-500/10 text-red-400 font-mono px-2 py-0.5 rounded border border-red-500/15">
          Modo Edição
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 border-b border-neutral-800 bg-neutral-950/40">
        <button
          onClick={() => setActiveTab('edit')}
          className={`py-3 text-center font-medium border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'edit'
              ? 'border-red-500 text-white bg-neutral-800/20'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
          id="tab-edit"
        >
          <Layers size={14} />
          Configurar Pre-Sell
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`py-3 text-center font-medium border-b-2 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'code'
              ? 'border-red-500 text-white bg-neutral-800/20'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
          id="tab-code"
        >
          <Code size={14} />
          Gerar Código
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        {activeTab === 'edit' ? (
          <>
            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={12} className="text-yellow-500" />
                Templates Rápidos (Nicho)
              </span>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="p-2 text-left rounded-xl bg-neutral-950/50 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all text-xs cursor-pointer text-neutral-300 font-medium"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Redirection Link */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Link de Destino (Redirect URL)
              </label>
              <input
                type="text"
                value={config.destinationUrl}
                onChange={(e) => updateField('destinationUrl', e.target.value)}
                placeholder="Ex: https://seu-link-afiliado.com"
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:outline-none rounded-xl px-3 py-2 text-white font-mono text-xs"
                id="config-destination-url"
              />
              <p className="text-[10px] text-neutral-500">
                O usuário será enviado para este link oficial de vendas ao clicar no botão da pré-venda.
              </p>
            </div>

            {/* Visual Theme Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Paleta de Cores & Vibe
              </label>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => updateField('theme', theme.id)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      config.theme === theme.id
                        ? 'border-red-500 bg-neutral-850 text-white'
                        : 'border-neutral-800 bg-neutral-950/30 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                    }`}
                  >
                    <span className="text-xs font-medium">{theme.label}</span>
                    <span className={`w-4 h-4 rounded-full ${theme.color} ring-2 ring-neutral-900`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Method */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Método de Verificação de Idade
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('verificationMode', 'single-click')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    config.verificationMode === 'single-click'
                      ? 'border-red-500 bg-neutral-850 text-white font-semibold'
                      : 'border-neutral-800 bg-neutral-950/30 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Clique Único (Sim/Não)
                </button>
                <button
                  type="button"
                  onClick={() => updateField('verificationMode', 'birth-date')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    config.verificationMode === 'birth-date'
                      ? 'border-red-500 bg-neutral-850 text-white font-semibold'
                      : 'border-neutral-800 bg-neutral-950/30 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Nascimento Obrigatório
                </button>
              </div>
              <p className="text-[10px] text-neutral-500">
                O modo 'Nascimento' força o usuário a digitar dia, mês e ano, validando se possui realmente +18 anos.
              </p>
            </div>

            {/* Custom Texts Section */}
            <div className="space-y-4 pt-2 border-t border-neutral-800">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Personalização de Textos
              </span>

              {/* Subtitle / Header */}
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400">Título do Aviso (No Gate)</label>
                <input
                  type="text"
                  value={config.nicheSubtitle}
                  onChange={(e) => updateField('nicheSubtitle', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              {/* Warning Text */}
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400">Texto de Aviso (No Gate)</label>
                <textarea
                  value={config.warningText}
                  onChange={(e) => updateField('warningText', e.target.value)}
                  rows={3}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:outline-none rounded-xl p-3 text-white text-xs resize-none"
                />
              </div>

              {/* Title / Header of Pre-Sell */}
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400">Título Principal (Pós-Aprovação)</label>
                <input
                  type="text"
                  value={config.nicheTitle}
                  onChange={(e) => updateField('nicheTitle', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              {/* Button Text */}
              <div className="space-y-1.5">
                <label className="text-xs text-neutral-400">Texto do Botão CTA (Redirecionamento)</label>
                <input
                  type="text"
                  value={config.ctaText}
                  onChange={(e) => updateField('ctaText', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              {/* Brand and Logo Text */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-400">Nome da Marca</label>
                  <input
                    type="text"
                    value={config.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-neutral-400">Texto do Logo</label>
                  <input
                    type="text"
                    value={config.logoText}
                    onChange={(e) => updateField('logoText', e.target.value)}
                    placeholder="Ex: 18+"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 focus:outline-none rounded-xl px-3 py-2 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Urgency Settings */}
            <div className="space-y-3 pt-2 border-t border-neutral-800">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Urgência & Cronômetro
              </span>

              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Mostrar Cronômetro Regressivo</span>
                <button
                  type="button"
                  onClick={() => updateField('showProgressTimer', !config.showProgressTimer)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    config.showProgressTimer ? 'bg-red-600' : 'bg-neutral-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      config.showProgressTimer ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {config.showProgressTimer && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Duração do Acesso Reservado</span>
                    <span className="font-mono text-red-400 font-semibold">{config.countdownMinutes} minutos</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={config.countdownMinutes}
                    onChange={(e) => updateField('countdownMinutes', parseInt(e.target.value, 10))}
                    className="w-full accent-red-600"
                  />
                </div>
              )}
            </div>

            {/* Actions Footer inside Sidebar */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <button
                onClick={onResetGate}
                className="w-full py-2.5 rounded-xl border border-neutral-850 hover:bg-neutral-800 text-neutral-300 font-medium transition-all text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw size={12} />
                Reiniciar Fluxo do Usuário
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-neutral-400 leading-relaxed">
              Aqui está o código gerado sob medida para o seu site! Copie e cole diretamente no seu projeto.
            </p>
            
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-red-400 uppercase">Aviso de Uso</span>
              <p className="text-[10px] text-neutral-500 leading-relaxed">
                Este código inclui a verificação de idade e o redirecionamento seguro para a pré-venda (Pre-Sell) com o link que você configurou.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
