import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'gemini-3.5-flash', role = 'cinematographer', systemInstruction: customInstruction } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const roleInstructions: Record<string, string> = {
      cinematographer: `You are an AI Cinematography Assistant supporting the studio of LLOYD TAWO FILMS.
Your tone is professional, artistic, and collaborative. You are highly knowledgeable about camera sensors, lens characteristics, lighting packages, and visual storytelling.
Provide creative, technical, and constructive advice for directors, producers, and fellow filmmakers.
Do not claim credits, awards, festival selections, or equipment on behalf of the studio — you do not have that information. If asked, say the studio can speak to it directly.`,

      lighting_specialist: `You are an expert Chief Lighting Technician (Gaffer) and Camera Systems Specialist.
You provide precise, practical, and mathematically sound lighting schematics, foot-candle / lux calculations, color temperature (CCT) strategies, diffusion choices (Grid Cloth, Magic Cloth, Bleached Muslin), key-to-fill ratios, and rigging configurations for any scene description or script breakdown.`,

      director_collaborator: `You are a Senior Creative Film Director & Lookbook Treatment Specialist.
You help formulate shot lists, visual references, aspect ratio choices (2.39:1 vs 1.85:1 vs 4:3), color grading palettes, camera movement motivations (dolly, Ronin 2, handheld, Easyrig), and scene blocking treatments for film, commercial, and documentary pitches.`,

      booking_assistant: `You are the Production Manager & Booking Coordinator for LLOYD TAWO FILMS.
You assist potential clients, producers, and agencies with project inquiries and collecting project briefs.
You do not know the studio's rates, kit inventory, calendar, or base location — never guess at them. Gather the brief and tell the client the studio will follow up directly.`
    };

    const systemInstruction = customInstruction || roleInstructions[role] || roleInstructions.cinematographer;

    const validModels = ['gemini-3.1-pro-preview', 'gemini-3.5-flash', 'gemini-3.1-flash-lite'];
    const chosenModel = validModels.includes(model) ? model : 'gemini-3.5-flash';

    const ai = getGenAI();

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: chosenModel,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'No response generated.';
    res.json({ reply: replyText, model: chosenModel });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to process chat request',
      details: String(error),
    });
  }
});

app.post('/api/generate-image', async (req, res) => {
  try {
    const {
      prompt,
      model = 'gemini-3-pro-image-preview',
      imageSize = '1K',
      aspectRatio = '16:9',
      filmLook = 'Cinematic 35mm Film',
      camera = 'Arri Alexa Mini LF',
      lens = 'Panavision Anamorphic Lens',
      lighting = 'Natural Golden Hour with Negative Fill',
    } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const cinematicPrompt = `Cinematography film still. ${prompt}. Film Stock / Look: ${filmLook}. Camera Package: ${camera}. Optics: ${lens}. Lighting Setup: ${lighting}. High dynamic range, cinematic color grading, authentic film grain, photorealistic cinematic frame, Masterclass cinematography lighting, shallow depth of field.`;

    const ai = getGenAI();

    const validRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
    const selectedRatio = validRatios.includes(aspectRatio) ? aspectRatio : '16:9';

    const validSizes = ['1K', '2K', '4K'];
    const selectedSize = validSizes.includes(imageSize) ? imageSize : '1K';

    let targetModel = model;
    if (targetModel === 'gemini-3-pro-image-preview') {
      targetModel = 'gemini-3-pro-image';
    }

    try {
      const response = await ai.models.generateContent({
        model: targetModel,
        contents: {
          parts: [{ text: cinematicPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: selectedRatio,
            imageSize: selectedSize,
          },
        },
      });

      let imageUrl: string | null = null;
      let textOutput = '';

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            imageUrl = `data:${mime};base64,${part.inlineData.data}`;
            break;
          } else if (part.text) {
            textOutput += part.text;
          }
        }
      }

      if (!imageUrl) {
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image',
          contents: { parts: [{ text: cinematicPrompt }] },
          config: {
            imageConfig: {
              aspectRatio: selectedRatio,
              imageSize: selectedSize,
            },
          },
        });

        if (fallbackRes.candidates && fallbackRes.candidates[0]?.content?.parts) {
          for (const part of fallbackRes.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              const mime = part.inlineData.mimeType || 'image/png';
              imageUrl = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
      }

      if (!imageUrl) {
        return res.status(500).json({
          error: 'No image could be generated. Please try a different prompt.',
          textDetails: textOutput,
        });
      }

      res.json({
        imageUrl,
        prompt: cinematicPrompt,
        originalPrompt: prompt,
        imageSize: selectedSize,
        aspectRatio: selectedRatio,
        model: targetModel,
      });
    } catch (modelErr: any) {
      console.warn('Primary image generation failed, trying fallback:', modelErr?.message);
      const fallbackRes = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: { parts: [{ text: cinematicPrompt }] },
        config: {
          imageConfig: {
            aspectRatio: selectedRatio,
            imageSize: selectedSize,
          },
        },
      });

      let fallbackUrl: string | null = null;
      if (fallbackRes.candidates && fallbackRes.candidates[0]?.content?.parts) {
        for (const part of fallbackRes.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            fallbackUrl = `data:${mime};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (fallbackUrl) {
        return res.json({
          imageUrl: fallbackUrl,
          prompt: cinematicPrompt,
          originalPrompt: prompt,
          imageSize: selectedSize,
          aspectRatio: selectedRatio,
          model: 'gemini-3.1-flash-image',
        });
      } else {
        throw modelErr;
      }
    }
  } catch (error: any) {
    console.error('Image Generation API Error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate image',
      details: String(error),
    });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, projectType, budget, timeline, message } = req.body;
  console.log('Received Production Inquiry:', { name, email, phone, projectType, budget, timeline, message });
  res.json({
    success: true,
    message: 'Thank you for reaching out to Lloyd Tawo Films. Your inquiry has been received.',
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lloyd Tawo Films portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
