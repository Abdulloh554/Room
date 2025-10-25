import type { Room, Color, Furniture, Decor } from './types';

export const ROOMS: Room[] = [
  { id: 'gaming-room', name: 'Gaming Room', nameKey: 'gamingRoom', imageUrl: 'https://images.unsplash.com/photo-1616588589676-62b3bd4d2e84?w=400&h=400&fit=crop', description: 'modern gaming room with RGB lighting' },
  { id: 'bedroom', name: 'Bedroom', nameKey: 'bedroom', imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop', description: 'cozy and serene bedroom' },
  { id: 'living-room', name: 'Living Room', nameKey: 'livingRoom', imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=400&fit=crop', description: 'spacious, minimalist living room' },
  { id: 'home-office', name: 'Home Office', nameKey: 'homeOffice', imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3?w=400&h=400&fit=crop', description: 'productive and clean home office' },
  { id: 'kitchen', name: 'Kitchen', nameKey: 'kitchen', imageUrl: 'https://images.unsplash.com/photo-1604342416049-1d37a25902c6?w=400&h=400&fit=crop', description: 'a modern, bright kitchen with an island' },
  { id: 'kids-room', name: 'Kids Room', nameKey: 'kidsRoom', imageUrl: 'https://images.unsplash.com/photo-1596431713294-8924c4c57fb7?w=400&h=400&fit=crop', description: 'a fun and colorful kids room' },
  { id: 'bathroom', name: 'Bathroom', nameKey: 'bathroom', imageUrl: 'https://images.unsplash.com/photo-1582914101152-16782762a42a?w=400&h=400&fit=crop', description: 'a modern and clean bathroom' },
];

export const COLORS: Color[] = [
  { id: 'slate-blue', name: 'Slate Blue', nameKey: 'slateBlue', hex: '#4A5568', tailwindClass: 'bg-slate-700' },
  { id: 'forest-green', name: 'Forest Green', nameKey: 'forestGreen', hex: '#2F855A', tailwindClass: 'bg-green-800' },
  { id: 'warm-beige', name: 'Warm Beige', nameKey: 'warmBeige', hex: '#F7FAFC', tailwindClass: 'bg-gray-100' },
  { id: 'terracotta', name: 'Terracotta', nameKey: 'terracotta', hex: '#DD6B20', tailwindClass: 'bg-orange-600' },
  { id: 'charcoal-gray', name: 'Charcoal Gray', nameKey: 'charcoalGray', hex: '#2D3748', tailwindClass: 'bg-gray-800' },
  { id: 'dusty-rose', name: 'Dusty Rose', nameKey: 'dustyRose', hex: '#F56565', tailwindClass: 'bg-red-500' },
  { id: 'deep-purple', name: 'Deep Purple', nameKey: 'deepPurple', hex: '#5B21B6', tailwindClass: 'bg-violet-700' },
  { id: 'electric-lime', name: 'Electric Lime', nameKey: 'electricLime', hex: '#A3E635', tailwindClass: 'bg-lime-400' },
  { id: 'sky-blue', name: 'Sky Blue', nameKey: 'skyBlue', hex: '#3B82F6', tailwindClass: 'bg-blue-500' },
  { id: 'lavender', name: 'Lavender', nameKey: 'lavender', hex: '#A78BFA', tailwindClass: 'bg-violet-400' },
  { id: 'olive-green', name: 'Olive Green', nameKey: 'oliveGreen', hex: '#4D7C0F', tailwindClass: 'bg-lime-700' },
  { id: 'cream', name: 'Cream', nameKey: 'cream', hex: '#FEFCE8', tailwindClass: 'bg-yellow-50' },
  { id: 'mustard-yellow', name: 'Mustard Yellow', nameKey: 'mustardYellow', hex: '#D97706', tailwindClass: 'bg-amber-600' },
  { id: 'beige', name: 'Beige', nameKey: 'beige', hex: '#F5F5DC', tailwindClass: 'bg-stone-200' },
  { id: 'light-gray', name: 'Light Gray', nameKey: 'lightGray', hex: '#D1D5DB', tailwindClass: 'bg-gray-300' },
  { id: 'warm-brown', name: 'Warm Brown', nameKey: 'warmBrown', hex: '#8C5A3B', tailwindClass: 'bg-amber-800' },
  { id: 'caramel', name: 'Caramel', nameKey: 'caramel', hex: '#C68E17', tailwindClass: 'bg-yellow-600' },
  { id: 'blue-gray', name: 'Blue-Gray', nameKey: 'blueGray', hex: '#778899', tailwindClass: 'bg-slate-500' },
  { id: 'pastel-blue', name: 'Pastel Blue', nameKey: 'pastelBlue', hex: '#A7C7E7', tailwindClass: 'bg-blue-200' },
  { id: 'dark-blue', name: 'Dark Blue', nameKey: 'darkBlue', hex: '#00008B', tailwindClass: 'bg-blue-900' },
  { id: 'soft-pink', name: 'Soft Pink', nameKey: 'softPink', hex: '#F8C8DC', tailwindClass: 'bg-pink-200' },
  { id: 'white', name: 'White', nameKey: 'white', hex: '#FFFFFF', tailwindClass: 'bg-white' },
  { id: 'apricot', name: 'Apricot', nameKey: 'apricot', hex: '#FBCEB1', tailwindClass: 'bg-orange-200' },
  { id: 'light-yellow', name: 'Light Yellow', nameKey: 'lightYellow', hex: '#FFFACD', tailwindClass: 'bg-yellow-100' },
  { id: 'cream-brown', name: 'Cream Brown', nameKey: 'creamBrown', hex: '#B5A691', tailwindClass: 'bg-stone-400' },
  { id: 'green-blue', name: 'Green-Blue', nameKey: 'greenBlue', hex: '#2F9C95', tailwindClass: 'bg-teal-600' },
  { id: 'graphite', name: 'Graphite', nameKey: 'graphite', hex: '#525252', tailwindClass: 'bg-neutral-600' },
];

export const FURNITURE: Omit<Furniture, 'instanceId'>[] = [
  { id: 'gaming-chair', name: 'Gaming Chair', nameKey: 'gamingChair', imageUrl: 'https://images.unsplash.com/photo-1619420574218-758237c1514a?w=400&h=400&fit=crop', description: 'an ergonomic leather gaming chair' },
  { id: 'l-shaped-desk', name: 'L-Shaped Desk', nameKey: 'lShapedDesk', imageUrl: 'https://images.unsplash.com/photo-1611095789689-54d5c07c427c?w=400&h=400&fit=crop', description: 'a large L-shaped wooden desk' },
  { id: 'modern-sofa', name: 'Modern Sofa', nameKey: 'modernSofa', imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e33ef2d92a?w=400&h=400&fit=crop', description: 'a sleek, modern gray sofa' },
  { id: 'queen-bed', name: 'Queen Bed', nameKey: 'queenBed', imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16da31?w=400&h=400&fit=crop', description: 'a queen-sized bed with a tufted headboard' },
  { id: 'bookshelf', name: 'Bookshelf', nameKey: 'bookshelf', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', description: 'a tall, industrial-style bookshelf' },
  { id: 'coffee-table', name: 'Coffee Table', nameKey: 'coffeeTable', imageUrl: 'https://images.unsplash.com/photo-1530037782043-c6d98a1832d2?w=400&h=400&fit=crop', description: 'a rustic wooden coffee table' },
];

export const DECOR: Omit<Decor, 'instanceId'>[] = [
  { id: 'neon-sign', name: 'Neon Sign', nameKey: 'neonSign', imageUrl: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=400&h=400&fit=crop', description: 'a custom neon sign on the wall' },
  { id: 'potted-plant', name: 'Potted Plant', nameKey: 'pottedPlant', imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', description: 'a large potted monstera plant in a corner' },
  { id: 'rgb-strips', name: 'RGB Strips', nameKey: 'rgbStrips', imageUrl: 'https://images.unsplash.com/photo-1632599793131-69a4735232a2?w=400&h=400&fit=crop', description: 'RGB LED light strips for ambient lighting' },
  { id: 'gallery-wall', name: 'Gallery Wall', nameKey: 'galleryWall', imageUrl: 'https://images.unsplash.com/photo-1513689124293-6234f4b1e563?w=400&h=400&fit=crop', description: 'a gallery wall with assorted art prints' },
  { id: 'area-rug', name: 'Area Rug', nameKey: 'areaRug', imageUrl: 'https://images.unsplash.com/photo-1617301828142-25e2a22c1451?w=400&h=400&fit=crop', description: 'a geometric pattern area rug' },
  { id: 'throw-pillows', name: 'Throw Pillows', nameKey: 'throwPillows', imageUrl: 'https://images.unsplash.com/photo-1617301828014-a4b5d5d85c5b?w=400&h=400&fit=crop', description: 'a set of colorful throw pillows' },
];

export const ROOM_COLOR_MAP: Record<string, string[]> = {
  'gaming-room': ['charcoal-gray', 'slate-blue', 'deep-purple', 'electric-lime', 'dusty-rose'],
  'living-room': ['beige', 'light-gray', 'olive-green', 'warm-brown', 'caramel', 'blue-gray'],
  'bedroom': ['pastel-blue', 'dark-blue', 'soft-pink', 'lavender', 'light-gray', 'cream'],
  'kitchen': ['white', 'olive-green', 'apricot', 'light-yellow', 'cream-brown', 'green-blue'],
  'kids-room': ['sky-blue', 'soft-pink', 'electric-lime', 'terracotta', 'light-yellow', 'white'],
  'home-office': ['light-gray', 'slate-blue', 'forest-green', 'white', 'graphite'],
  'bathroom': ['white', 'sky-blue', 'light-gray', 'green-blue', 'beige'],
};