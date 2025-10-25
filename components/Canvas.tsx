import React, { useState } from 'react';
import type { Room, Color } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { TranslationKey } from '../translations';
import { DownloadIcon } from './icons/DownloadIcon';

interface CanvasProps {
  selectedRoom: Room | null;
  selectedColor: Color | null;
  generatedImage: string | null;
  isLoading: boolean;
  isRefining: boolean;
  onRefine: (prompt: string) => void;
  error: string | null;
}

const LoadingState: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <svg className="animate-spin h-12 w-12 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <h3 className="text-xl font-semibold">{t('generatingMasterpiece')}</h3>
      <p className="text-gray-400 mt-2">{t('aiWarmingUp')}</p>
    </div>
  );
};

const InitialState: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <h3 className="text-2xl font-bold">{t('dreamRoomTitle')}</h3>
      <p className="text-gray-400 mt-2">{t('dreamRoomSubtitle')}</p>
    </div>
  );
};

const PREVIEW_BG_OPTIONS: { class: string, nameKey: TranslationKey }[] = [
  { class: 'bg-gray-800', nameKey: 'previewBgDark' },
  { class: 'bg-gray-200', nameKey: 'previewBgLight' },
  { class: 'bg-indigo-900', nameKey: 'previewBgIndigo' },
  { class: 'bg-stone-500', nameKey: 'previewBgStone' },
];

const RoomPreview: React.FC<{
  room: Room;
  color: Color | null;
  previewBgClass: string;
  onBgChange: (className: string) => void;
}> = ({ room, color, previewBgClass, onBgChange }) => {
  const { t } = useLanguage();
  return (
    <div className={`relative w-full h-full flex items-center justify-center p-8 transition-colors duration-500 ${previewBgClass}`}>
      <div className="text-center bg-black/30 p-8 rounded-xl backdrop-blur-sm">
        <h2 className="text-4xl font-bold mb-2">{t(room.nameKey)}</h2>
        {color && <p className="text-xl">{t('wallColor')}: {t(color.nameKey)}</p>}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 p-2 rounded-full flex gap-2" role="toolbar" aria-label="Preview background color picker">
        {PREVIEW_BG_OPTIONS.map(opt => (
          <button
            key={opt.class}
            onClick={() => onBgChange(opt.class)}
            className={`w-8 h-8 rounded-full transition-all border-2 border-transparent ${opt.class} ${previewBgClass === opt.class ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : 'hover:border-white/50'}`}
            title={`${t('setPreviewBg')} ${t(opt.nameKey)}`}
            aria-label={`${t('setPreviewBg')} ${t(opt.nameKey)}`}
          />
        ))}
      </div>
    </div>
  );
};


export const Canvas: React.FC<CanvasProps> = ({ selectedRoom, selectedColor, generatedImage, isLoading, isRefining, onRefine, error }) => {
  const [previewBgClass, setPreviewBgClass] = useState('bg-gray-700');
  const [refinePrompt, setRefinePrompt] = useState('');
  const { t } = useLanguage();

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'room-design.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refinePrompt.trim() && !isRefining) {
        onRefine(refinePrompt.trim());
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>;
    if (generatedImage) {
      return (
        <div className="relative w-full h-full">
          <img src={generatedImage} alt="AI generated room design" className="w-full h-full object-contain" />
          
          {isRefining && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-8 backdrop-blur-sm z-10">
              <svg className="animate-spin h-10 w-10 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-lg font-semibold">{t('refining')}</p>
            </div>
          )}

          <button
            onClick={handleDownload}
            className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-colors backdrop-blur-sm z-20"
            title={t('download')}
          >
            <DownloadIcon className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded-lg backdrop-blur-sm z-20">
            <form onSubmit={handleRefineSubmit} className="flex gap-2">
              <input 
                type="text"
                value={refinePrompt}
                onChange={(e) => setRefinePrompt(e.target.value)}
                placeholder={t('refinePlaceholder')}
                className="flex-grow bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                disabled={isRefining}
              />
              <button 
                type="submit"
                className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={isRefining || !refinePrompt.trim()}
              >
                {isRefining ? t('refining') : t('refineDesign')}
              </button>
            </form>
          </div>

        </div>
      );
    }
    if (selectedRoom) {
      return <RoomPreview
        room={selectedRoom}
        color={selectedColor}
        previewBgClass={previewBgClass}
        onBgChange={setPreviewBgClass}
      />;
    }
    return <InitialState />;
  };

  return (
    <main className="flex-1 bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="w-full h-full aspect-video bg-gray-700 rounded-lg shadow-2xl flex items-center justify-center">
        {renderContent()}
      </div>
    </main>
  );
};