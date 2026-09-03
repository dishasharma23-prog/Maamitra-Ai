const fs = require('fs');

const file = 'src/core/i18n/translations.ts';
let content = fs.readFileSync(file, 'utf8');

// The new english translations
const enAdditions = {
  welcomeGreeting: "Welcome",
  ashaUpdateTitle: "Update from your ASHA Worker",
  ashaActionContact: "They have reached out to you recently. Check your messages/calls.",
  ashaActionVisit: "They have planned a follow-up visit to check on you.",
  ashaActionRefer: "They have issued a medical referral. Please see the doctor.",
  done: "Done"
};

// Hindi translations
const hiAdditions = {
  welcomeGreeting: "स्वागत है",
  ashaUpdateTitle: "आपकी आशा कार्यकर्ता की ओर से अपडेट",
  ashaActionContact: "उन्होंने हाल ही में आपसे संपर्क किया है। अपने संदेश/कॉल जांचें।",
  ashaActionVisit: "उन्होंने आपकी जांच के लिए फॉलो-अप विजिट की योजना बनाई है।",
  ashaActionRefer: "उन्होंने मेडिकल रेफरल जारी किया है। कृपया डॉक्टर से मिलें।",
  done: "हो गया"
};

// Marathi
const mrAdditions = {
  welcomeGreeting: "स्वागत आहे",
  ashaUpdateTitle: "तुमच्या आशा कार्यकर्त्याकडून अपडेट",
  ashaActionContact: "त्यांनी नुकताच तुमच्याशी संपर्क साधला आहे. तुमचे मेसेज/कॉल तपासा.",
  ashaActionVisit: "त्यांनी तुमच्या तपासणीसाठी फॉलो-अप भेटीची योजना आखली आहे.",
  ashaActionRefer: "त्यांनी मेडिकल रेफरल दिले आहे. कृपया डॉक्टरांना भेटा.",
  done: "झाले"
};

// Bengali
const bnAdditions = {
  welcomeGreeting: "স্বাগতম",
  ashaUpdateTitle: "আপনার আশা কর্মীর কাছ থেকে আপডেট",
  ashaActionContact: "তারা সম্প্রতি আপনার সাথে যোগাযোগ করেছেন। আপনার মেসেজ/কল চেক করুন।",
  ashaActionVisit: "তারা আপনার খোঁজ নেওয়ার জন্য একটি ফলো-আপ ভিজিটের পরিকল্পনা করেছেন।",
  ashaActionRefer: "তারা একটি মেডিকেল রেফারেল জারি করেছেন। অনুগ্রহ করে ডাক্তার দেখান।",
  done: "সম্পন্ন"
};

// Telugu
const teAdditions = {
  welcomeGreeting: "స్వాగతం",
  ashaUpdateTitle: "మీ ఆశా వర్కర్ నుండి అప్‌డేట్",
  ashaActionContact: "వారు ఇటీవల మిమ్మల్ని సంప్రదించారు. మీ సందేశాలు/కాల్‌లను తనిఖీ చేయండి.",
  ashaActionVisit: "వారు మిమ్మల్ని తనిఖీ చేయడానికి ఫాలో-అప్ సందర్శనను ప్లాన్ చేసారు.",
  ashaActionRefer: "వారు వైద్యపరమైన రిఫరల్ జారీ చేశారు. దయచేసి వైద్యుడిని సంప్రదించండి.",
  done: "పూర్తయింది"
};

// Tamil
const taAdditions = {
  welcomeGreeting: "வரவேற்பு",
  ashaUpdateTitle: "உங்கள் ஆஷா பணியாளரிடமிருந்து புதுப்பிப்பு",
  ashaActionContact: "அவர்கள் சமீபத்தில் உங்களை தொடர்பு கொண்டுள்ளனர். உங்கள் செய்திகள்/அழைப்புகளை சரிபார்க்கவும்.",
  ashaActionVisit: "உங்களை சரிபார்க்க அவர்கள் பின்தொடர்தல் வருகைக்கு திட்டமிட்டுள்ளனர்.",
  ashaActionRefer: "அவர்கள் மருத்துவ பரிந்துரையை வழங்கியுள்ளனர். தயவுசெய்து மருத்துவரை அணுகவும்.",
  done: "முடிந்தது"
};

// Kannada
const knAdditions = {
  welcomeGreeting: "ಸ್ವಾಗತ",
  ashaUpdateTitle: "ನಿಮ್ಮ ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯಿಂದ ನವೀಕರಣ",
  ashaActionContact: "ಅವರು ಇತ್ತೀಚೆಗೆ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿದ್ದಾರೆ. ನಿಮ್ಮ ಸಂದೇಶಗಳು/ಕರೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  ashaActionVisit: "ನಿಮ್ಮನ್ನು ಪರೀಕ್ಷಿಸಲು ಅವರು ಭೇಟಿಯನ್ನು ಯೋಜಿಸಿದ್ದಾರೆ.",
  ashaActionRefer: "ಅವರು ವೈದ್ಯಕೀಯ ಶಿಫಾರಸನ್ನು ನೀಡಿದ್ದಾರೆ. ದಯವಿಟ್ಟು ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.",
  done: "ಮುಗಿದಿದೆ"
};

// Malayalam
const mlAdditions = {
  welcomeGreeting: "സ്വാഗതം",
  ashaUpdateTitle: "നിങ്ങളുടെ ആശാ വർക്കറിൽ നിന്നുള്ള അപ്ഡേറ്റ്",
  ashaActionContact: "അവർ അടുത്തിടെ നിങ്ങളെ ബന്ധപ്പെട്ടിട്ടുണ്ട്. നിങ്ങളുടെ സന്ദേശങ്ങൾ/കോളുകൾ പരിശോധിക്കുക.",
  ashaActionVisit: "നിങ്ങളെ പരിശോധിക്കുന്നതിനായി അവർ ഒരു ഫോളോ-അപ്പ് സന്ദർശനം ആസൂത്രണം ചെയ്തിട്ടുണ്ട്.",
  ashaActionRefer: "അവർ ഒരു മെഡിക്കൽ റഫറൽ നൽകിയിട്ടുണ്ട്. ദയവായി ഡോക്ടറെ കാണുക.",
  done: "പൂർത്തിയായി"
};

// Gujarati
const guAdditions = {
  welcomeGreeting: "સ્વાગત છે",
  ashaUpdateTitle: "તમારા આશા કાર્યકર તરફથી અપડેટ",
  ashaActionContact: "તેઓએ તાજેતરમાં તમારો સંપર્ક કર્યો છે. તમારા સંદેશા/કોલ તપાસો.",
  ashaActionVisit: "તેઓએ તમારી તપાસ કરવા માટે ફોલો-અપ મુલાકાતનું આયોજન કર્યું છે.",
  ashaActionRefer: "તેઓએ તબીબી રેફરલ જારી કર્યું છે. કૃપા કરીને ડૉક્ટરને મળો.",
  done: "થઈ ગયું"
};

// Punjabi
const paAdditions = {
  welcomeGreeting: "ਸਵਾਗਤ ਹੈ",
  ashaUpdateTitle: "ਤੁਹਾਡੀ ਆਸ਼ਾ ਵਰਕਰ ਵੱਲੋਂ ਅੱਪਡੇਟ",
  ashaActionContact: "ਉਹਨਾਂ ਨੇ ਹਾਲ ਹੀ ਵਿੱਚ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕੀਤਾ ਹੈ। ਆਪਣੇ ਸੁਨੇਹੇ/ਕਾਲਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।",
  ashaActionVisit: "ਉਹਨਾਂ ਨੇ ਤੁਹਾਡੀ ਜਾਂਚ ਕਰਨ ਲਈ ਫਾਲੋ-ਅਪ ਦੌਰੇ ਦੀ ਯੋਜਨਾ ਬਣਾਈ ਹੈ।",
  ashaActionRefer: "ਉਹਨਾਂ ਨੇ ਇੱਕ ਮੈਡੀਕਲ ਰੈਫਰਲ ਜਾਰੀ ਕੀਤਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ।",
  done: "ਹੋ ਗਿਆ"
};

const additions = {
  en: enAdditions,
  hi: hiAdditions,
  mr: mrAdditions,
  bn: bnAdditions,
  te: teAdditions,
  ta: taAdditions,
  kn: knAdditions,
  ml: mlAdditions,
  gu: guAdditions,
  pa: paAdditions
};

// Insert into Strings interface
let stringsIntMatch = content.match(/export interface Strings \{([\s\S]+?)\}/);
let newInterface = stringsIntMatch[1];
for (const key of Object.keys(enAdditions)) {
  if (!newInterface.includes(key + ':')) {
    newInterface += `  ${key}: string;\n`;
  }
}
content = content.replace(stringsIntMatch[1], newInterface);

// Insert into each language object
for (const lang of Object.keys(additions)) {
  const regex = new RegExp(`const ${lang}: Strings = \\{([\\s\\S]+?)\\};`);
  const match = content.match(regex);
  if (match) {
    let objContent = match[1];
    let parsedObj;
    try {
      // Just to parse it, we can eval it wrapped
      parsedObj = eval(`({${objContent}})`);
    } catch (e) {
      console.error(e);
      continue;
    }
    
    // Add new keys
    Object.assign(parsedObj, additions[lang]);
    
    // Stringify back
    const newObjContent = JSON.stringify(parsedObj, null, 2).slice(1, -1);
    content = content.replace(match[0], `const ${lang}: Strings = {${newObjContent}};`);
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Translations updated.');
