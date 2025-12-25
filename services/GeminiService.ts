
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getHealthTip = async (): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Give me a short, one-sentence empowering or healthy tip for a woman on her menstrual cycle. Keep it friendly and concise.",
      config: { temperature: 0.7 }
    });
    return response.text?.trim() || "Stay hydrated and listen to your body today!";
  } catch (e) {
    console.error("Gemini Tip Error:", e);
    return "Prioritize rest and gentle movement today.";
  }
};

export const generateEmailContent = async (userName: string, days: number, date: string): Promise<{ subject: string; body: string }> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, compassionate notification email for a menstrual cycle reminder. 
      User Name: ${userName}
      Days until period: ${days}
      Expected Date: ${date}
      Format: Return ONLY a JSON object with "subject" and "body" keys. Keep the body under 60 words.`,
      config: { responseMimeType: "application/json" }
    });
    
    const data = JSON.parse(response.text || '{"subject": "Cycle Reminder", "body": "Your cycle is approaching."}');
    return data;
  } catch (e) {
    return {
      subject: "FemHealth: Important Cycle Reminder",
      body: `Hi ${userName}, this is a reminder that your next cycle is expected in ${days} days on ${date}. Take care of yourself!`
    };
  }
};

export const chatWithGemini = async (message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are 'FemBot', a compassionate women's health assistant. Help with cycles, nutrition, and wellness. Mention you are AI, not a doctor.",
      },
    });
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm having trouble processing that right now.";
  } catch (e) {
    return "I'm offline. Please check your connection.";
  }
};
