import React, { useState, useEffect } from 'react';
import { HelpCircle, Settings as SettingsIcon, Sliders, Wifi, Battery, Mic, Sparkles } from 'lucide-react';
import { triggerVibration } from '../utils/sound';
import { AppTheme } from '../types';

interface TopBarProps {
  statusText: string;
  isListening: boolean;
  onOpenHelp: () => void;
  onOpenSettings: () => void;
  onOpenRemote: () => void;
  theme?: AppTheme;
}

export const TopBar: React.FC<TopBarProps> = ({
  statusText,
  isListening,
  onOpenHelp,
  onOpenSettings,
  onOpenRemote,
  theme = 'dark',
}) => {
  const isIOS = theme === 'ios';
  const isLight = theme === 'light';
  const isCyber = theme === 'cyber';

  // Live time
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isIOS) {
    return (
      <header id="topBar_ios" className="w-full select-none shrink-0 z-30">
        {/* iOS Clean Status Bar with Embedded Dynamic Island and Quick Actions */}
        <div className="w-full px-4 pt-3 pb-2 flex items-center justify-between text-xs text-white font-medium bg-black/90 backdrop-blur-xl border-b border-white/10">
          {/* Left: Time & Signal */}
          <div className="flex items-center gap-1.5 min-w-[70px]">
            <span className="font-semibold tracking-tight text-xs text-white/95 font-mono">
              {currentTime}
            </span>
          </div>

          {/* Center: Interactive Dynamic Island Pill */}
          <div
            className={`transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer active:scale-95 ${
              isListening
                ? 'w-40 h-7.5 bg-[#1C1C1E] border border-red-500/50 px-3 gap-2 shadow-lg shadow-red-500/25 ring-2 ring-red-500/20'
                : 'w-32 h-6.5 bg-[#141416] border border-white/15 px-2.5 shadow-md shadow-black/60'
            }`}
          >
            {isListening ? (
              <div className="flex items-center justify-between w-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[11px] text-red-400 font-semibold tracking-tight">Слушаю...</span>
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-4 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-1">
                <span className="w-2 h-2 rounded-full bg-[#00E676] opacity-80 animate-pulse" />
                <span className="text-[10px] font-semibold text-white/75 uppercase tracking-wider truncate max-w-[75px]">
                  {statusText}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            )}
          </div>

          {/* Right: Glass Quick Action Buttons (Пульт, Справка, Настройки) */}
          <div className="flex items-center gap-1.5 min-w-[70px] justify-end">
            <button
              type="button"
              aria-label="Пульт"
              title="Быстрый пульт (Контекстное меню)"
              onClick={() => {
                triggerVibration('selection');
                onOpenRemote();
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-[#00E676] transition-all cursor-pointer shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              aria-label="Справка"
              title="Справка"
              onClick={() => {
                triggerVibration('tap');
                onOpenHelp();
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/80 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              aria-label="Настройки"
              title="Настройки"
              onClick={() => {
                triggerVibration('tap');
                onOpenSettings();
              }}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/80 transition-all cursor-pointer"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Modern Dynamic Capsule Top Bar for Dark, Light, Cyberpunk Themes
  return (
    <header
      id="topBar"
      className={`w-full px-3.5 py-2.5 flex items-center justify-between select-none shrink-0 transition-all duration-200 border-b ${
        isCyber
          ? 'bg-[#0B0B16]/90 backdrop-blur-md border-[#00F0FF]/30 text-white shadow-lg shadow-[#00F0FF]/10'
          : isLight
          ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-[#D8DFD5] text-[#1E2520] shadow-xs'
          : 'bg-[#141416]/90 backdrop-blur-md border-white/10 text-white shadow-md'
      }`}
    >
      {/* Left: App Brand & Time */}
      <div className="flex items-center gap-2">
        <div
          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
            isCyber
              ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
              : isLight
              ? 'bg-[#00E676]/20 text-[#00A352] border border-[#00E676]/30'
              : 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="font-mono text-xs font-semibold opacity-75">{currentTime}</span>
      </div>

      {/* Center: Dynamic Mic / Status Capsule */}
      <div
        className={`px-3 py-1 rounded-full flex items-center gap-2 transition-all ${
          isListening
            ? isCyber
              ? 'bg-red-500/20 border border-red-500 text-red-400 shadow-md shadow-red-500/30 ring-2 ring-red-500/20'
              : 'bg-red-500/15 border border-red-500/50 text-red-400 shadow-sm'
            : isCyber
            ? 'bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF]'
            : isLight
            ? 'bg-[#E8ECE5] border border-[#CBD4C8] text-[#1E2520]'
            : 'bg-[#222226] border border-white/10 text-white/90'
        }`}
      >
        {isListening ? (
          <>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[11px] font-bold tracking-tight">Запись речи</span>
            <Mic className="w-3 h-3 text-red-400 animate-pulse" />
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase font-mono">
              {statusText}
            </span>
          </>
        )}
      </div>

      {/* Right: Quick Actions (Пульт, Справка, Настройки) */}
      <div className="flex items-center gap-1.5">
        <button
          id="btnRemote"
          type="button"
          aria-label="Пульт"
          title="Быстрый пульт (Контекстное меню)"
          onClick={() => {
            triggerVibration('selection');
            onOpenRemote();
          }}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isCyber
              ? 'bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 text-[#00F0FF] border border-[#00F0FF]/30 active:scale-95'
              : isLight
              ? 'bg-[#E8ECE5] hover:bg-[#DCE1D9] text-[#1E2520] border border-[#CBD4C8] active:scale-95'
              : 'bg-white/10 hover:bg-white/15 text-[#00E676] border border-white/5 active:scale-95'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        <button
          id="btnHelp"
          type="button"
          aria-label="Справка"
          title="Справка"
          onClick={() => {
            triggerVibration('tap');
            onOpenHelp();
          }}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isCyber
              ? 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 active:scale-95'
              : isLight
              ? 'bg-[#E8ECE5] hover:bg-[#DCE1D9] text-[#1E2520] border border-[#CBD4C8] active:scale-95'
              : 'bg-white/10 hover:bg-white/15 text-white/80 border border-white/5 active:scale-95'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>

        <button
          id="btnSettings"
          type="button"
          aria-label="Настройки"
          title="Настройки"
          onClick={() => {
            triggerVibration('tap');
            onOpenSettings();
          }}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
            isCyber
              ? 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 active:scale-95'
              : isLight
              ? 'bg-[#E8ECE5] hover:bg-[#DCE1D9] text-[#1E2520] border border-[#CBD4C8] active:scale-95'
              : 'bg-white/10 hover:bg-white/15 text-white/80 border border-white/5 active:scale-95'
          }`}
        >
          <SettingsIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
