// src/ai.js
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const ai = new GoogleGenAI({apiKey: API_KEY})

export async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    // const model = await ai.models.generateContent({ model: "gemini-2.0-flash" });

    const response=await ai.models.generateContent({
       model: "gemini-2.0-flash",
       contents: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
       config:{
        systemInstruction: `
                          You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
                         `
       },    
    });
    return response.text;
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    return "Error fetching recipe.";
  }
}
