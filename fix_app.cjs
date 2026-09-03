const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const replacement = `const LANGUAGES = [
  { code: "en" as Language, native: "English", label: "" },
  { code: "hi" as Language, native: "हिंदी", label: "Hindi" },
  { code: "mr" as Language, native: "मराठी", label: "Marathi" },
  { code: "bn" as Language, native: "বাংলা", label: "Bengali" },
  { code: "te" as Language, native: "తెలుగు", label: "Telugu" },
  { code: "ta" as Language, native: "தமிழ்", label: "Tamil" },
  { code: "kn" as Language, native: "ಕನ್ನಡ", label: "Kannada" },
  { code: "ml" as Language, native: "മലയാളം", label: "Malayalam" },
  { code: "gu" as Language, native: "ગુજરાતી", label: "Gujarati" },
  { code: "pa" as Language, native: "ਪੰਜਾਬੀ", label: "Punjabi" },
];`;

content = content.replace(/const LANGUAGES = \[\s+[\s\S]+?\];/, replacement);
fs.writeFileSync('src/App.tsx', content, 'utf8');
