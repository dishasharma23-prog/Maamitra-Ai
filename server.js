import express from 'express';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post('/api/voice/transcribe', upload.single('file'), async (req, res) => {
  try {
        const { language, language_code } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    if (!process.env.SARVAM_API_KEY || process.env.SARVAM_API_KEY === 'dummy') {
      return res.status(500).json({ error: 'Sarvam API key not configured' });
    }
    
    const finalLanguageCode = language_code || 'en-IN';

    const formData = new FormData();
    const blob = new Blob([file.buffer], { type: file.mimetype });
    formData.append('file', blob, file.originalname || 'audio.webm');
    formData.append('model', 'saaras:v3');
    formData.append('language_code', finalLanguageCode);

    const response = await fetch('https://api.sarvam.ai/speech-to-text', {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Sarvam API Error:', errorText);
      return res.status(response.status).json({ error: 'STT provider failed' });
    }

    const data = await response.json();
    
    res.json({
      transcript: data.transcript,
      language: language,
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
  });
}

export default app;


