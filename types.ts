import { TranslationKey } from './translations';

export interface CatalogItem {
  id: string;
  name: string; // English name for prompt generation
  nameKey: TranslationKey;
  imageUrl: string;
  description: string;
}

export interface Room extends CatalogItem {}

export interface Color {
  id:string;
  name: string; // English name for prompt generation
  nameKey: TranslationKey;
  hex: string;
  tailwindClass: string;
}

export interface Furniture extends CatalogItem {
  instanceId: number;
}

export interface Decor extends CatalogItem {
  instanceId: number;
}

export type CatalogCategory = 'rooms' | 'colors' | 'furniture' | 'decor';

export type Perspective = 'front' | 'corner' | 'window' | 'closeup';

export interface SavedDesign {
  version: number;
  roomId: string | undefined;
  colorId: string | undefined;
  furniture: { id: string }[];
  decor: { id: string }[];
  perspective: Perspective;
}

export type { TranslationKey };