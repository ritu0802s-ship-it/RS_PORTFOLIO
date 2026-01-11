
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RITU_CONTEXT } from "../constants";

// Correctly initialize with process.env.API_KEY as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userMessage: string, history: {role: string, content: string}[]) => {
  try {
    const chatHistory = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user' as any,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: RITU_CONTEXT,
        temperature: 0.8,
      }
    });

    // Property text returns the extracted string output
    return response.text || "I'm sorry, I couldn't formulate a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to my strategic brain right now. Let's try again in a moment!";
  }
};

export const getToolSynergyInsight = async (selectedTools: string[]) => {
  try {
    const prompt = `Ritu is a Strategic Marketing Manager. The user has selected this "Strategic Trio" of tools from her belt: ${selectedTools.join(', ')}. 
    In exactly one warm, sophisticated, and strategically sharp paragraph (max 60 words), explain how Ritu synthesizes these three specific tools to drive brand impact. 
    Maintain her "digital bestie" persona and perhaps mention a clever detail about how they work together over a cup of tea.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: RITU_CONTEXT,
        temperature: 0.7,
      }
    });

    // Property text returns the extracted string output
    return response.text || "A truly formidable combination. These tools allow Ritu to bridge the gap between raw data and human storytelling seamlessly.";
  } catch (error) {
    return "This combination is pure strategy gold. It's how we turn complex data into human-centric results.";
  }
};
