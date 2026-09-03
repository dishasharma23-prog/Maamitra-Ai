import app from '../server.js';

// Vercel requires this config to disable the default body parser 
// so that multer can parse the multipart/form-data stream natively.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default app;
