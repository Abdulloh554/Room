import React from 'react';
import type { Color, Furniture, Decor, TranslationKey, Perspective } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { SaveIcon } from './icons/SaveIcon';

interface SummaryProps {
  selectedColor: Color | null;
  selectedFurniture: Furniture[];
  selectedDecor: Decor[];
  onRemoveItem: (instanceId: number, category: 'furniture' | 'decor') => void;
  onGenerate: () => void;
  isLoading: boolean;
  isRefining: boolean;
  selectedPerspective: Perspective;
  onPerspectiveChange: (perspective: Perspective) => void;
  onDownloadDesign: () => void;
}

const SummaryItem: React.FC<{ item: { nameKey: TranslationKey, instanceId: number }; onRemove: () => void; }> = ({ item, onRemove }) => {
    const { t } = useLanguage();
    return (
        <div className="flex items-center justify-between bg-gray-700/50 p-2 rounded-md">
            <span className="text-sm">{t(item.nameKey)}</span>
            <button onClick={onRemove} className="text-gray-400 hover:text-red-500 transition-colors">&times;</button>
        </div>
    );
};

const PERSPECTIVE_OPTIONS: { id: Perspective, nameKey: TranslationKey }[] = [
    { id: 'front', nameKey: 'perspective_front' },
    { id: 'corner', nameKey: 'perspective_corner' },
    { id: 'window', nameKey: 'perspective_window' },
    { id: 'closeup', nameKey: 'perspective_closeup' },
];


export const Summary: React.FC<SummaryProps> = ({ selectedColor, selectedFurniture, selectedDecor, onRemoveItem, onGenerate, isLoading, isRefining, selectedPerspective, onPerspectiveChange, onDownloadDesign }) => {
  const { t } = useLanguage();
  const canGenerate = selectedColor !== null;

  return (
    <aside className="w-full lg:w-72 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">{t('yourDesign')}</h2>
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <h3 className="font-semibold mb-2 text-indigo-400">{t('color')}</h3>
          {selectedColor ? (
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedColor.hex }}></div>
              <span>{t(selectedColor.nameKey)}</span>
            </div>
          ) : (
            <p className="text-sm text-gray-400">{t('noColorSelected')}</p>
          )}
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-indigo-400">{t('furniture')}</h3>
          {selectedFurniture.length > 0 ? (
            <div className="space-y-2">
              {selectedFurniture.map((item) => (
                <SummaryItem key={item.instanceId} item={item} onRemove={() => onRemoveItem(item.instanceId, 'furniture')} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">{t('noFurnitureAdded')}</p>
          )}
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-indigo-400">{t('decor')}</h3>
          {selectedDecor.length > 0 ? (
            <div className="space-y-2">
              {selectedDecor.map((item) => (
                <SummaryItem key={item.instanceId} item={item} onRemove={() => onRemoveItem(item.instanceId, 'decor')} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">{t('noDecorAdded')}</p>
          )}
        </div>
         <div>
          <h3 className="font-semibold mb-2 text-indigo-400">{t('perspective')}</h3>
          <div className="grid grid-cols-2 gap-2">
            {PERSPECTIVE_OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => onPerspectiveChange(option.id)}
                className={`text-sm py-2 px-2 rounded-md transition-colors ${
                  selectedPerspective === option.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-gray-700/50 hover:bg-gray-700'
                }`}
              >
                {t(option.nameKey)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={onGenerate}
          disabled={!canGenerate || isLoading || isRefining}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {isLoading ? (
             <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('generating')}
            </div>
          ) : t('generate')}
        </button>
        <button
          onClick={onDownloadDesign}
          disabled={!canGenerate}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          <SaveIcon className="w-5 h-5" />
          {t('downloadDesign')}
        </button>
      </div>
    </aside>
  );
};