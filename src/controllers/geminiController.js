import { processTextWithKeywords } from '../services/geminiService.js';

export const processText = async (req, res) => {
  try {
    const { text, keywords, customPrompt } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const summary = await processTextWithKeywords(text, keywords || '', customPrompt || '');
    
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
