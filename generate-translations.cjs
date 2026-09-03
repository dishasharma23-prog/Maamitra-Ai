const fs = require('fs');

const en = {
  languageNote: "You can change this later in settings.",
  onboardingHeading: "Let's set up your profile",
  onboardingSupport: "MaaMitra needs a few details to personalize your care.",
  pregnantOption: "I am pregnant",
  postpartumOption: "I recently had a baby",
  continueBtn: "Continue",
  startBtn: "Start",
  expectedDate: "Expected Due Date",
  babyDob: "Baby's Date of Birth",
  yourName: "Your Name",
  preferredLang: "Preferred Language",
  changeLang: "Change",
  areYou: "Are you:",
  goodMorning: "Good morning",
  goodAfternoon: "Good afternoon",
  goodEvening: "Good evening",
  homeQuestion: "How are you and your baby doing today?",
  homeSupport: "MaaMitra is here to listen and help.",
  micLabel: "Tap to Speak",
  quickCheckin: "Quick Check-in",
  lastCheckin: "Last check-in was 2 days ago",
  completeHeading: "Your profile is ready",
  completeSupport: "MaaMitra is configured for you.",
  completeDemoNote: "This is a local prototype. Your check-ins will be securely routed to your ASHA worker's dashboard.",
  statusLabel: "Status",
  voiceHeading: "Tell us how you are feeling",
  voiceSupport: "MaaMitra listens in your language. Speak freely.",
  voiceReady: "Tap the mic when ready",
  voiceListening: "Listening...",
  voiceProcessing: "Understanding your voice...",
  voiceTapInstead: "Answer by tapping instead",
  transcriptText: "",
  transcriptHeading: "What you said",
  understoodHeading: "What we understood",
  obs1: "Severe headache",
  obs2: "Swelling in hands/feet",
  obs3: "Is this correct?",
  confirmBtn: "Yes, this is correct",
  retryBtn: "Try again",
  somethingWrongBtn: "Something feels wrong",
  isThisCorrect: "Is this correct?",
  confirmHeading: "Confirm your check-in",
  confirmSupport: "Review your details before submitting.",
  submitBtn: "Submit",
  goBackBtn: "Go Back",
  observations: "Observations",
  language: "Language",
  reportedNow: "Reported Now",
  whatYouShared: "What you shared",
  submittedHeading: "Check-in submitted successfully",
  submittedSupport: "Your ASHA worker has received your update.",
  followUpLabel: "Follow-up Required",
  followUpDetail: "Your ASHA worker will contact you shortly.",
  ashaViewBtn: "View ASHA Dashboard",
  doneBtn: "Done",
  offlineMsg: "You are offline",
  offlineDetail: "Your check-in is saved and will be sent when online.",
  savedOffline: "Saved offline",
  couldntHear: "We couldn't hear you clearly.",
  tryAgain: "Try again",
  wantToConfirm: "Do you want to confirm these observations?",
  tapCheckInHeading: "How are you feeling today?",
  iFeelOkay: "I feel okay",
  headache: "Headache",
  fever: "Fever",
  swelling: "Swelling",
  pain: "Pain",
  troubleFeeding: "Trouble feeding"
};

const translations = { en };

const hi = { ...en, homeQuestion: "आज आप और आपका बच्चा कैसे हैं?", micLabel: "बोलने के लिए टैप करें", startBtn: "शुरू करें", continueBtn: "आगे बढ़ें", confirmBtn: "हाँ, यह सही है", submitBtn: "जमा करें", goBackBtn: "पीछे जाएँ", voiceTapInstead: "इसके बजाय टैप करके उत्तर दें", somethingWrongBtn: "कुछ ठीक नहीं लग रहा", iFeelOkay: "मैं ठीक महसूस कर रही हूँ", headache: "सिर दर्द", fever: "बुखार", swelling: "सूजन", pain: "दर्द", troubleFeeding: "दूध पिलाने में परेशानी", tapCheckInHeading: "आज आप कैसा महसूस कर रही हैं?" };
const mr = { ...en, homeQuestion: "आज तुम्ही आणि तुमचे बाळ कसे आहात?", micLabel: "बोलण्यासाठी टॅप करा", startBtn: "सुरू करा", continueBtn: "पुढे जा", confirmBtn: "होय, हे बरोबर आहे", submitBtn: "सबमिट करा", goBackBtn: "मागे जा", voiceTapInstead: "टॅप करून उत्तर द्या", somethingWrongBtn: "काहीतरी चुकीचे वाटत आहे", iFeelOkay: "मला ठीक वाटत आहे", headache: "डोकेदुखी", fever: "ताप", swelling: "सूज", pain: "वेदना", troubleFeeding: "दूध पाजण्यात अडचण", tapCheckInHeading: "आज तुम्हाला कसे वाटत आहे?" };
const bn = { ...en, homeQuestion: "আজ আপনি এবং আপনার শিশু কেমন আছেন?", micLabel: "কথা বলতে ট্যাপ করুন", startBtn: "শুরু করুন", continueBtn: "এগিয়ে যান", confirmBtn: "হ্যাঁ, এটি সঠিক", submitBtn: "জমা দিন", goBackBtn: "ফিরে যান", voiceTapInstead: "ট্যাপ করে উত্তর দিন", somethingWrongBtn: "কিছু ভুল মনে হচ্ছে", iFeelOkay: "আমি ঠিক আছি", headache: "মাথাব্যথা", fever: "জ্বর", swelling: "ফোলা", pain: "ব্যথা", troubleFeeding: "খাওয়াতে সমস্যা", tapCheckInHeading: "আজ আপনার কেমন লাগছে?" };
const te = { ...en, homeQuestion: "ఈ రోజు మీరు మరియు మీ బిడ్డ ఎలా ఉన్నారు?", micLabel: "మాట్లాడటానికి నొక్కండి", startBtn: "ప్రారంభించు", continueBtn: "కొనసాగించు", confirmBtn: "అవును, ఇది సరైనది", submitBtn: "సమర్పించు", goBackBtn: "వెనుకకు వెళ్ళు", voiceTapInstead: "నొక్కడం ద్వారా సమాధానం ఇవ్వండి", somethingWrongBtn: "ఏదో ఇబ్బందిగా ఉంది", iFeelOkay: "నేను బాగానే ఉన్నాను", headache: "తలనొప్పి", fever: "జ্বর", swelling: "వాపు", pain: "నొప్పి", troubleFeeding: "పాలు పట్టడంలో ఇబ్బంది", tapCheckInHeading: "ఈ రోజు మీరు ఎలా భావిస్తున్నారు?" };
const ta = { ...en, homeQuestion: "இன்று நீங்களும் உங்கள் குழந்தையும் எப்படி இருக்கிறீர்கள்?", micLabel: "பேச தட்டவும்", startBtn: "தொடங்கு", continueBtn: "தொடரவும்", confirmBtn: "ஆம், இது சரி", submitBtn: "சமர்ப்பி", goBackBtn: "திரும்பி செல்", voiceTapInstead: "தட்டி பதிலளிக்கவும்", somethingWrongBtn: "ஏதோ தவறு போல் தோன்றுகிறது", iFeelOkay: "நான் நன்றாக உணர்கிறேன்", headache: "தலைவலி", fever: "காய்ச்சல்", swelling: "வீக்கம்", pain: "வலி", troubleFeeding: "பாலூட்டுவதில் சிரமம்", tapCheckInHeading: "இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?" };
const kn = { ...en, homeQuestion: "ಇಂದು ನೀವು ಮತ್ತು ನಿಮ್ಮ ಮಗು ಹೇಗಿದ್ದೀರಿ?", micLabel: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ", startBtn: "ಪ್ರಾರಂಭಿಸಿ", continueBtn: "ಮುಂದುವರಿಸಿ", confirmBtn: "ಹೌದು, ಇದು ಸರಿಯಾಗಿದೆ", submitBtn: "ಸಲ್ಲಿಸಿ", goBackBtn: "ಹಿಂದೆ ಹೋಗಿ", voiceTapInstead: "ಟ್ಯಾಪ್ ಮಾಡುವ ಮೂಲಕ ಉತ್ತರಿಸಿ", somethingWrongBtn: "ಏನೋ ತಪ್ಪಾಗಿದೆ ಎಂದು ಅನಿಸುತ್ತಿದೆ", iFeelOkay: "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ", headache: "ತಲೆನೋವು", fever: "ಜ್ವರ", swelling: "ಊತ", pain: "ನೋವು", troubleFeeding: "ಹಾಲುಣಿಸಲು ತೊಂದರೆ", tapCheckInHeading: "ಇಂದು ನಿಮಗೆ ಹೇಗನಿಸುತ್ತಿದೆ?" };
const ml = { ...en, homeQuestion: "ഇന്ന് നിങ്ങളും കുഞ്ഞും എങ്ങനെയുണ്ട്?", micLabel: "സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക", startBtn: "തുടങ്ങുക", continueBtn: "തുടരുക", confirmBtn: "അതെ, ഇത് ശരിയാണ്", submitBtn: "സമർപ്പിക്കുക", goBackBtn: "പുറകോട്ട് പോവുക", voiceTapInstead: "ടാപ്പ് ചെയ്ത് മറുപടി നൽകുക", somethingWrongBtn: "എന്തോ കുഴപ്പമുള്ളതുപോലെ തോന്നുന്നു", iFeelOkay: "എനിക്ക് കുഴപ്പമില്ല", headache: "തലവേദന", fever: "പനി", swelling: "വീക്കം", pain: "വേദന", troubleFeeding: "മുലയൂട്ടാൻ ബുദ്ധിമുട്ട്", tapCheckInHeading: "ഇന്ന് നിങ്ങൾക്ക് എങ്ങനെയുണ്ട്?" };
const gu = { ...en, homeQuestion: "આજે તમે અને તમારું બાળક કેમ છો?", micLabel: "બોલવા માટે ટેપ કરો", startBtn: "શરૂ કરો", continueBtn: "આગળ વધો", confirmBtn: "હા, આ સાચું છે", submitBtn: "સબમિટ કરો", goBackBtn: "પાછા જાઓ", voiceTapInstead: "ટેપ કરીને જવાબ આપો", somethingWrongBtn: "કંઈક ખોટું લાગી રહ્યું છે", iFeelOkay: "હું ઠીક અનુભવું છું", headache: "માથાનો દુખાવો", fever: "તાવ", swelling: "સોજો", pain: "પીડા", troubleFeeding: "દૂધ પીવડાવવામાં તકલીફ", tapCheckInHeading: "આજે તમે કેવું અનુભવો છો?" };
const pa = { ...en, homeQuestion: "ਅੱਜ ਤੁਸੀਂ ਅਤੇ ਤੁਹਾਡਾ ਬੱਚਾ ਕਿਵੇਂ ਹੋ?", micLabel: "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ", startBtn: "ਸ਼ੁਰੂ ਕਰੋ", continueBtn: "ਜਾਰੀ ਰੱਖੋ", confirmBtn: "ਹਾਂ, ਇਹ ਸਹੀ ਹੈ", submitBtn: "ਜਮ੍ਹਾਂ ਕਰੋ", goBackBtn: "ਪਿੱਛੇ ਜਾਓ", voiceTapInstead: "ਟੈਪ ਕਰਕੇ ਜਵਾਬ ਦਿਓ", somethingWrongBtn: "ਕੁਝ ਗਲਤ ਲੱਗ ਰਿਹਾ ਹੈ", iFeelOkay: "ਮੈਂ ਠੀਕ ਮਹਿਸੂਸ ਕਰ ਰਹੀ ਹਾਂ", headache: "ਸਿਰ ਦਰਦ", fever: "ਬੁਖਾਰ", swelling: "ਸੋਜ", pain: "ਦਰਦ", troubleFeeding: "ਦੁੱਧ ਚੁੰਘਾਉਣ ਵਿੱਚ ਮੁਸ਼ਕਲ", tapCheckInHeading: "ਅੱਜ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ?" };

translations.hi = hi;
translations.mr = mr;
translations.bn = bn;
translations.te = te;
translations.ta = ta;
translations.kn = kn;
translations.ml = ml;
translations.gu = gu;
translations.pa = pa;

const output = `export interface Strings {
${Object.keys(en).map(k => '  ' + k + ': string;').join('\n')}
}

export const translations: Record<string, Strings> = ${JSON.stringify(translations, null, 2)};

export function t(lang: string, key: keyof Strings): string {
  const strings = translations[lang] ?? translations.en;
  return strings[key] as string;
}

export function timeGreeting(lang: string): string {
  const h = new Date().getHours();
  const s = translations[lang] ?? translations.en;
  if (h < 12) return s.goodMorning;
  if (h < 17) return s.goodAfternoon;
  return s.goodEvening;
}
`;

fs.writeFileSync('src/core/i18n/translations.ts', output, 'utf8');
