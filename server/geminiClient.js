/*
  Gemini client adapter for server using the official @google/generative-ai SDK.
  - Uses the Google Generative AI SDK for robust, properly authenticated calls.
  - Requires GEMINI_API_KEY environment variable.
  
  Install: npm install @google/generative-ai
*/

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set in environment');

  try {
    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.2
      }
    });
    
    const response = result.response;
    const text = response.text();
    return text;
  } catch (err) {
    console.error('Gemini SDK call failed:', err.message || err);
    throw new Error(`Gemini API error: ${err.message || err}`);
  }
}

