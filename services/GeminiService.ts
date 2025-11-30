import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
// Fallback logic not implemented here as per strict instructions to assume env var exists.
// In a real scenario, we would handle the missing key.

const ai = new GoogleGenAI({ apiKey });

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "You are a compassionate, knowledgeable, and friendly women's health assistant named 'FemBot'. You help users with menstrual health questions, cycle tracking advice, and general wellness. Always clarify you are an AI and not a substitute for professional medical advice.",
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const result: GenerateContentResponse = await chat.sendMessage({
      message: message,
    });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

export const getHealthTip = async (): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Give me a short, one-sentence empowering or healthy tip for a woman on her menstrual cycle.",
        });
        return response.text || "Stay hydrated and be kind to yourself today!";
    } catch (e) {
        return "Stay hydrated and be kind to yourself today!";
    }
}
