import axios from 'axios';
import dotenv from 'dotenv';
import { cleanText, extractSummaryFromResponse } from '../utils/textUtils.js';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = process.env.GEMINI_1_5_URL;

if (!apiKey || !apiUrl) {
  throw new Error('API configuration is missing');
}

export const processTextWithKeywords = async (text, keywords, customPrompt = '') => {
  const cleanedText = cleanText(text);
  
  // Default prompt (if no custom prompt is provided)
  const defaultPrompt = `Summarize the content in 5 points without using any bullets, numbers, or dashes. Each point should be 1-2 sentences or 3 sentences max. Start each point in a new line. Focus on the core subject, addressing the most relevant and critical aspects directly related to it. Avoid using introductory labels like 'What,' 'Why,' or 'When.' Eliminate tangential information and provide a summary that highlights only the most important details, ensuring it centers around the main topic.`;

  let prompt = customPrompt || defaultPrompt;

  // Add keyword instruction if keywords are provided
  if (keywords.trim()) {
    prompt += ` Additionally, ensure the summary emphasizes and incorporates these keywords and related concepts: ${keywords}.`;
  }

  prompt += ` ${cleanedText}`;

  const requestData = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await axios.post(`${apiUrl}?key=${apiKey}`, requestData, {
      headers: { 'Content-Type': 'application/json' }
    });
    

    return extractSummaryFromResponse(response.data);
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error(`Failed to process text: ${error.message}`);
  }
};
