import React, { useState, useCallback } from 'react';
import type { Room, Color, Furniture, Decor, Perspective, SavedDesign } from './types';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { Summary } from './components/Summary';
import { generateRoomImage, refineRoomImage } from './services/geminiService';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { TranslationKey } from './translations';

const AppContent: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedFurniture, setSelectedFurniture] = useState<Furniture[]>([]);
  const [selectedDecor, setSelectedDecor] = useState<Decor[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [perspective, setPerspective] = useState<Perspective>('front');
  const { language, t } = useLanguage();

  const handleSelectRoom = useCallback((room: Room) => {
    setSelectedRoom(room);
    setGeneratedImage(null); // Reset image when room changes
    setError(null);
  }, []);

  const handleSelectColor = useCallback((color: Color) => {
    setSelectedColor(color);
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleAddItem = useCallback((item: Omit<Furniture, 'instanceId'> | Omit<Decor, 'instanceId'>, category: 'furniture' | 'decor') => {
    const newItem = { ...item, instanceId: Date.now() + Math.random() };
    if (category === 'furniture') {
      setSelectedFurniture(prev => [...prev, newItem as Furniture]);
    } else {
      setSelectedDecor(prev => [...prev, newItem as Decor]);
    }
    setGeneratedImage(null);
  }, []);

  const handleRemoveItem = useCallback((instanceId: number, category: 'furniture' | 'decor') => {
    if (category === 'furniture') {
      setSelectedFurniture(prev => prev.filter(item => item.instanceId !== instanceId));
    } else {
      setSelectedDecor(prev => prev.filter(item => item.instanceId !== instanceId));
    }
    setGeneratedImage(null);
  }, []);

  const handleGenerateDesign = async () => {
    if (!selectedRoom || !selectedColor) {
      setError(t("error_select_room_and_color"));
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageB64 = await generateRoomImage(selectedRoom, selectedColor, selectedFurniture, selectedDecor, perspective);
      setGeneratedImage(`data:image/jpeg;base64,${imageB64}`);
    } catch (err: any) {
      console.error(err);
      setError(`${t('error_failed_to_generate_prefix')} ${err.message}. ${t('error_failed_to_generate_suffix')}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRefineDesign = async (refinePrompt: string) => {
    if (!generatedImage) {
      setError("No image to refine.");
      return;
    }

    setIsRefining(true);
    setError(null);
    
    const base64Image = generatedImage.split(',')[1];

    try {
      const langName = t(`lang_${language}` as TranslationKey);
      const newImageB64 = await refineRoomImage(base64Image, refinePrompt, langName);
      setGeneratedImage(`data:image/jpeg;base64,${newImageB64}`);
    } catch (err: any) {
      console.error(err);
      setError(`${t('error_refine_failed')} ${err.message}.`);
    } finally {
      setIsRefining(false);
    }
  };

  const handleDownloadDesign = useCallback(() => {
    if (!selectedRoom || !selectedColor) {
        setError(t('error_save_incomplete_design'));
        return;
    }

    const design: SavedDesign = {
        version: 1,
        roomId: selectedRoom?.id,
        colorId: selectedColor?.id,
        furniture: selectedFurniture.map(f => ({ id: f.id })),
        decor: selectedDecor.map(d => ({ id: d.id })),
        perspective: perspective,
    };

    const designJson = JSON.stringify(design, null, 2);
    const blob = new Blob([designJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const roomName = selectedRoom?.name.replace(/\s+/g, '-') || 'room';
    link.download = `${roomName}-design.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [selectedRoom, selectedColor, selectedFurniture, selectedDecor, perspective, t]);


  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col lg:flex-row overflow-hidden">
      <Sidebar 
        onSelectRoom={handleSelectRoom}
        onSelectColor={handleSelectColor}
        onAddItem={handleAddItem}
        selectedRoomId={selectedRoom?.id}
        selectedColorId={selectedColor?.id}
      />
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        <Canvas 
          selectedRoom={selectedRoom}
          selectedColor={selectedColor}
          generatedImage={generatedImage}
          isLoading={isLoading}
          isRefining={isRefining}
          onRefine={handleRefineDesign}
          error={error}
        />
      </div>
       <Summary
        selectedColor={selectedColor}
        selectedFurniture={selectedFurniture}
        selectedDecor={selectedDecor}
        onRemoveItem={handleRemoveItem}
        onGenerate={handleGenerateDesign}
        isLoading={isLoading}
        isRefining={isRefining}
        selectedPerspective={perspective}
        onPerspectiveChange={setPerspective}
        onDownloadDesign={handleDownloadDesign}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;