import { GoogleGenAI, Modality } from "@google/genai";
import type { Room, Color, Furniture, Decor, Perspective } from '../types';

const PERSPECTIVE_MAP: Record<Perspective, string> = {
  'front': 'The photo must be taken from the perspective of someone standing at the entrance of the room, looking straight ahead.',
  'corner': 'The photo must be a wide-angle shot from a high corner of the room, looking down into the space.',
  'window': 'The photo must be from the perspective of looking into the room from outside a large window.',
  'closeup': 'The photo must be a close-up shot focusing on a key piece of furniture, with the rest of the room softly blurred in the background.',
};


function buildPrompt(room: Room, color: Color, furniture: Furniture[], decor: Decor[], perspective: Perspective): string {
  // Start with a strong, direct command for the perspective. This is the most important instruction to fix the bug.
  let prompt = `**Critical Camera Instruction:** You MUST generate the image from this exact perspective: ${PERSPECTIVE_MAP[perspective]}`;
  
  // Follow with the rest of the design details.
  prompt += `\n\n**Image Style:** Create a high-resolution, 8k, photorealistic photograph of a professionally designed interior.`;
  prompt += `\n\n**Primary Subject:** A ${room.description}.`;
  prompt += `\n\n**Key Feature & Color Scheme:** The dominant feature is the wall color, which must be a clear and distinct ${color.name.toLowerCase()}. All walls must be painted this color.`;
  
  if (furniture.length > 0) {
    const furnitureDescriptions = furniture.map(f => f.description).join(', ');
    prompt += `\n\n**Furniture:** The room contains the following furniture: ${furnitureDescriptions}.`;
  }

  if (decor.length > 0) {
    const decorDescriptions = decor.map(d => d.description).join(', ');
    prompt += `\n\n**Decor Accents:** The room is decorated with: ${decorDescriptions}.`;
  }

  prompt += `\n\n**Atmosphere:** The overall style is modern, clean, and inviting. The lighting should be beautiful and highlight the room's features, especially the wall color.`;
  
  return prompt;
};


export const generateRoomImage = async (
    room: Room,
    color: Color,
    furniture: Furniture[],
    decor: Decor[],
    perspective: Perspective
  ): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = buildPrompt(room, color, furniture, decor, perspective);

  console.log("Generated Prompt:", prompt);

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '16:9',
    },
  });

  const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;

  if (!base64ImageBytes) {
    throw new Error("No image data returned from API.");
  }

  return base64ImageBytes;
};

export const refineRoomImage = async (
  base64Image: string,
  prompt: string,
  language: string,
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: 'image/jpeg',
          },
        },
        {
          text: `Based on the user's instruction in ${language}, edit the provided image. The instruction is: "${prompt}"`,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts ?? []) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      return base64ImageBytes;
    }
  }

  throw new Error("No edited image data returned from API.");
};