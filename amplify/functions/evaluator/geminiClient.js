/*
  Gemini client adapter for the Amplify Lambda function.
  - Uses the official @google/generative-ai SDK for robust, authenticated calls.
  - Requires GEMINI_API_KEY set in the Lambda environment variables.
*/

import { GoogleGenerativeAI } from '@google/generative-ai';

export async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not set in environment variables');

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

