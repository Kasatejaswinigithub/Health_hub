
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Standard initialization using the expected environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getHealthTip = async (): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Give me a short, one-sentence empowering or healthy tip for a woman on her menstrual cycle. Keep it friendly and concise.",
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Stay hydrated and listen to your body today!";
  } catch (e) {
    console.error("Gemini Health Tip Error:", e);
    return "Stay hydrated and listen to your body today!";
  }
};

export const chatWithGemini = async (message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are a compassionate, knowledgeable, and friendly women's health assistant named 'FemBot'. You help users with menstrual health questions, cycle tracking advice, and general wellness. Always clarify you are an AI and not a substitute for professional medical advice.",
      },
    });

    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};
