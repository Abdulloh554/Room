import React, { useState } from 'react';
import type { CatalogCategory, Room, Color, Furniture, Decor, TranslationKey } from '../types';
import { ROOMS, COLORS, FURNITURE, DECOR, ROOM_COLOR_MAP } from '../constants';
import { RoomIcon } from './icons/RoomIcon';
import { ColorIcon } from './icons/ColorIcon';
import { FurnitureIcon } from './icons/FurnitureIcon';
import { DecorIcon } from './icons/DecorIcon';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';


interface SidebarProps {
  onSelectRoom: (room: Room) => void;
  onSelectColor: (color: Color) => void;
  onAddItem: (item: Omit<Furniture, 'instanceId'> | Omit<Decor, 'instanceId'>, category: 'furniture' | 'decor') => void;
  selectedRoomId?: string;
  selectedColorId?: string;
}

const ICONS: Record<CatalogCategory, React.ElementType> = {
  rooms: RoomIcon,
  colors: ColorIcon,
  furniture: FurnitureIcon,
  decor: DecorIcon,
};

export const Sidebar: React.FC<SidebarProps> = ({ onSelectRoom, onSelectColor, onAddItem, selectedRoomId, selectedColorId }) => {
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('rooms');
  const { t } = useLanguage();

  const renderContent = () => {
    switch (activeCategory) {
      case 'rooms':
        return ROOMS.map(room => (
          <button key={room.id} onClick={() => onSelectRoom(room)} className={`w-full text-left p-2 rounded-lg transition-colors ${selectedRoomId === room.id ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}>
            <img src={room.imageUrl} alt={room.name} className="w-full h-24 object-cover rounded-md mb-2" />
            <span className="font-medium">{t(room.nameKey)}</span>
          </button>
        ));
      case 'colors':
        const selectedRoom = selectedRoomId ? ROOMS.find(r => r.id === selectedRoomId) : null;
        const recommendedColorIds = selectedRoom && ROOM_COLOR_MAP[selectedRoom.id] ? ROOM_COLOR_MAP[selectedRoom.id] : null;

        if (selectedRoom && recommendedColorIds) {
          const recommendedColors = COLORS.filter(c => recommendedColorIds.includes(c.id));
          const otherColors = COLORS.filter(c => !recommendedColorIds.includes(c.id));

          return (
            <>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">{t('recommendedFor')} {t(selectedRoom.nameKey)}</h4>
              <div className="grid grid-cols-4 gap-3">
                {recommendedColors.map(color => (
                  <button key={color.id} onClick={() => onSelectColor(color)} className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColorId === color.id ? 'border-indigo-400 scale-110' : 'border-transparent hover:border-gray-400'}`} style={{ backgroundColor: color.hex }} title={t(color.nameKey)} />
                ))}
              </div>
              {otherColors.length > 0 && (
                <>
                  <div className="h-px bg-gray-700 my-4"></div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">{t('allColors')}</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {otherColors.map(color => (
                      <button key={color.id} onClick={() => onSelectColor(color)} className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColorId === color.id ? 'border-indigo-400 scale-110' : 'border-transparent hover:border-gray-400'}`} style={{ backgroundColor: color.hex }} title={t(color.nameKey)} />
                    ))}
                  </div>
                </>
              )}
            </>
          );
        } else {
          return (
            <>
              <h4 className="text-sm font-semibold text-gray-400 mb-3">{t('allColors')}</h4>
              <div className="grid grid-cols-4 gap-3">
                {COLORS.map(color => (
                  <button key={color.id} onClick={() => onSelectColor(color)} className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColorId === color.id ? 'border-indigo-400 scale-110' : 'border-transparent hover:border-gray-400'}`} style={{ backgroundColor: color.hex }} title={t(color.nameKey)} />
                ))}
              </div>
            </>
          );
        }
      case 'furniture':
        return FURNITURE.map(item => (
          <div key={item.id} className="bg-gray-700/50 p-2 rounded-lg flex flex-col">
            <img src={item.imageUrl} alt={item.name} className="w-full h-24 object-cover rounded-md mb-2" />
            <span className="font-medium flex-grow">{t(item.nameKey)}</span>
            <button onClick={() => onAddItem(item, 'furniture')} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">{t('add')}</button>
          </div>
        ));
      case 'decor':
        return DECOR.map(item => (
          <div key={item.id} className="bg-gray-700/50 p-2 rounded-lg flex flex-col">
            <img src={item.imageUrl} alt={item.name} className="w-full h-24 object-cover rounded-md mb-2" />
            <span className="font-medium flex-grow">{t(item.nameKey)}</span>
            <button onClick={() => onAddItem(item, 'decor')} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">{t('add')}</button>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <aside className="w-full lg:w-80 bg-gray-800 text-white p-4 flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{t('designStudio')}</h2>
        <LanguageSwitcher />
      </div>
      <div className="flex justify-around mb-4 bg-gray-900/50 p-1 rounded-lg">
        {(['rooms', 'colors', 'furniture', 'decor'] as CatalogCategory[]).map(cat => {
          const Icon = ICONS[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`p-2 rounded-md transition-colors w-full flex flex-col items-center ${activeCategory === cat ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
              title={t(cat as TranslationKey)}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{t(cat as TranslationKey)}</span>
            </button>
          );
        })}
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto pr-2 -mr-2">
        {renderContent()}
      </div>
    </aside>
  );
};