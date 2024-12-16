import OpenAI from "openai";
import { API_CONFIG, AI_CONFIG } from '../config';

const openai = new OpenAI({
  baseURL: API_CONFIG.baseURL,
  apiKey: API_CONFIG.apiKey
});

export async function streamChat(messages) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: AI_CONFIG.systemPrompt },
        ...messages
      ],
      model: AI_CONFIG.model,
      stream: true // 启用流式响应
    });

    return completion;
  } catch (error) {
    console.error('AI Chat Error:', error);
    throw error;
  }
} 