import OpenAI from "openai";
import { API_CONFIG, AI_CONFIG } from '../../config';

const openai = new OpenAI({
  baseURL: API_CONFIG.baseURL,
  apiKey: API_CONFIG.apiKey
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;
    
    // 设置响应头以支持流式传输
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    const stream = await openai.chat.completions.create({
      messages: [
        { role: "system", content: AI_CONFIG.systemPrompt },
        ...messages
      ],
      model: AI_CONFIG.model,
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      // 发送数据块
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }

    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 