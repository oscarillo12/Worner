import { GoogleGenAI } from "@google/genai";
import { projectContextForGemini } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const askAboutProject = async (question: string): Promise<string> => {
  if (!API_KEY) {
    return "La funcionalidad de IA está deshabilitada porque la API Key no está configurada.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const fullPrompt = `${projectContextForGemini}
    
    Basado estrictamente en el contexto anterior, responde la siguiente pregunta del equipo del proyecto. Si la respuesta no se encuentra en el contexto, indica que no tienes esa información específica.
    
    Pregunta: "${question}"
    
    Respuesta:`;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
       return "Error: La API Key de Gemini no es válida. Por favor, verifique la configuración.";
    }
    return "Hubo un error al comunicarse con el asistente de IA. Por favor, inténtelo de nuevo más tarde.";
  }
};
