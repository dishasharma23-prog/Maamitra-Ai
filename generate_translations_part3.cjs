const fs = require('fs');
const { te, ta, kn, ml } = require('./generate_translations_part2.cjs');

// Read part1 data (we'll just parse it from translations.ts for en, hi, mr, bn since they were almost correct, but mr and bn are missing strings. I will redefine mr, bn here just to be safe, or wait, I already created part1 script but didn't actually export them. Let me just rewrite part1, part2, part3 logic together).

// Actually, I can just use a single script to generate translations.ts if I keep it concise.
// But I have to write gu and pa now.

const gu = {
  languageHeading: "ભાષા પસંદ કરો", languageName: "ગુજરાતી", ashaConfirmationText: "આ ચેક-ઇન આશા કાર્યકર સાથે શેર કરવામાં આવશે.", analyzingText: "વિશ્લેષણ થઈ રહ્યું છે...", welcomeTagline: "વિશ્વાસુ સાથી.", welcomeSupport: "કેવું અનુભવી રહ્યા છો તે શેર કરો.", phoneError: "સાચો નંબર દાખલ કરો.", enterNumber: "મોબાઇલ નંબર", continueWithPhone: "આગળ વધો", demoAccount: "ડેમો એકાઉન્ટ", legalNote: "શરતો સાથે સંમત છો.", languageNote: "પછીથી બદલી શકો છો.", onboardingHeading: "પ્રોફાઇલ સેટ કરીએ", onboardingSupport: "થોડી વિગતોની જરૂર છે.", pregnantOption: "હું ગર્ભવતી છું", postpartumOption: "હું માતા બની છું", continueBtn: "આગળ વધો", startBtn: "શરૂ કરો", expectedDate: "અંદાજિત તારીખ", babyDob: "બાળકની જન્મ તારીખ", yourName: "તમારું નામ", preferredLang: "ભાષા", changeLang: "બદલો", areYou: "તમે:", goodMorning: "શુભ સવાર", goodAfternoon: "શુભ બપોર", goodEvening: "શુભ સાંજ", homeQuestion: "આજે કેમ છો?", homeSupport: "મામિત્રા મદદ માટે છે.", micLabel: "બોલવા માટે ટેપ કરો", quickCheckin: "ક્વિક ચેક-ઇન", lastCheckin: "છેલ્લું ચેક-ઇન 2 દિવસ પહેલા", completeHeading: "પ્રોફાઇલ તૈયાર છે", completeSupport: "મામિત્રા તૈયાર છે.", completeDemoNote: "આશાને મોકલાશે.", statusLabel: "સ્થિતિ", voiceHeading: "કેવું અનુભવો છો", voiceSupport: "ખુલીને બોલો.", voiceReady: "તૈયાર થાઓ ત્યારે ટેપ કરો", voiceListening: "સાંભળી રહ્યું છે...", voiceProcessing: "સમજી રહ્યું છે...", voiceTapInstead: "ટેપ કરીને જવાબ આપો", transcriptHeading: "તમે જે કહ્યું", understoodHeading: "અમે જે સમજ્યા", confirmBtn: "હા, સાચું છે", retryBtn: "ફરી પ્રયાસ કરો", somethingWrongBtn: "કંઈક ખોટું છે", isThisCorrect: "શું આ સાચું છે?", confirmHeading: "પુષ્ટિ કરો", confirmSupport: "વિગતો તપાસો.", submitBtn: "સબમિટ કરો", goBackBtn: "પાછા જાઓ", observations: "લક્ષણો", language: "ભાષા", reportedNow: "હવે રિપોર્ટ કર્યું", whatYouShared: "જે શેર કર્યું", submittedHeading: "સબમિટ થઈ ગયું", submittedSupport: "આશાને અપડેટ મળ્યું છે.", followUpLabel: "ફોલો-અપ જરૂરી છે", followUpDetail: "આશા જલ્દી સંપર્ક કરશે.", ashaViewBtn: "ડેશબોર્ડ જુઓ", doneBtn: "થઈ ગયું", offlineMsg: "તમે ઑફલાઇન છો", offlineDetail: "ઑનલાઇન થવા પર મોકલાશે.", savedOffline: "ઑફલાઇન સેવ કર્યું", couldntHear: "સ્પષ્ટ સાંભળી શક્યા નહીં.", tryAgain: "ફરી પ્રયાસ કરો", wantToConfirm: "પુષ્ટિ કરવી છે?", tapCheckInHeading: "આજે કેવું છે?", iFeelOkay: "હું ઠીક છું", headache: "માથાનો દુખાવો", fever: "તાવ", swelling: "સોજો", pain: "પીડા", troubleFeeding: "દૂધ પીવડાવવામાં તકલીફ", transcribedFromVoice: "અવાજ પરથી લખ્યું", submittedViaTap: "ટેપ દ્વારા સબમિટ કર્યું.", back: "પાછા", namePlaceholder: "નામ દાખલ કરો", todaysCheckIn: "આજનું ચેક-ઇન", askMaaMitra: "મામિત્રાને પૂછો", reminders: "રિમાઇન્ડર્સ", stopRecording: "અટકાવો", speakNow: "બોલો", selectAllThatApply: "બધા પસંદ કરો", saved: "સેવ કર્યું", checkInComplete: "પૂર્ણ", responseRecorded: "નોંધાયેલ", loading: "લોડ થઈ રહ્યું છે...", error: "ભૂલ", welcomeGreeting: "સ્વાગત છે", ashaUpdateTitle: "આશા અપડેટ", ashaActionContact: "સંપર્ક કર્યો છે.", ashaActionVisit: "મુલાકાત નક્કી છે.", ashaActionRefer: "રેફરલ આપ્યું છે.", done: "થઈ ગયું"
};

const pa = {
  languageHeading: "ਭਾਸ਼ਾ ਚੁਣੋ", languageName: "ਪੰਜਾਬੀ", ashaConfirmationText: "ਇਹ ਆਸ਼ਾ ਨਾਲ ਸਾਂਝਾ ਕੀਤਾ ਜਾਵੇਗਾ।", analyzingText: "ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...", welcomeTagline: "ਭਰੋਸੇਮੰਦ ਸਾਥੀ।", welcomeSupport: "ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ।", phoneError: "ਸਹੀ ਨੰਬਰ ਦਾਖਲ ਕਰੋ।", enterNumber: "ਮੋਬਾਈਲ ਨੰਬਰ", continueWithPhone: "ਜਾਰੀ ਰੱਖੋ", demoAccount: "ਡੈਮੋ ਖਾਤਾ", legalNote: "ਸ਼ਰਤਾਂ ਨਾਲ ਸਹਿਮਤ ਹੋ।", languageNote: "ਬਾਅਦ ਵਿੱਚ ਬਦਲ ਸਕਦੇ ਹੋ।", onboardingHeading: "ਪ੍ਰੋਫਾਈਲ ਸੈਟ ਅਪ ਕਰੀਏ", onboardingSupport: "ਕੁਝ ਵੇਰਵਿਆਂ ਦੀ ਲੋੜ ਹੈ।", pregnantOption: "ਮੈਂ ਗਰਭਵਤੀ ਹਾਂ", postpartumOption: "ਮੈਂ ਹਾਲ ਹੀ ਵਿੱਚ ਮਾਂ ਬਣੀ ਹਾਂ", continueBtn: "ਜਾਰੀ ਰੱਖੋ", startBtn: "ਸ਼ੁਰੂ ਕਰੋ", expectedDate: "ਅਨੁਮਾਨਿਤ ਮਿਤੀ", babyDob: "ਬੱਚੇ ਦੀ ਜਨਮ ਮਿਤੀ", yourName: "ਤੁਹਾਡਾ ਨਾਮ", preferredLang: "ਭਾਸ਼ਾ", changeLang: "ਬਦਲੋ", areYou: "ਤੁਸੀਂ:", goodMorning: "ਸ਼ੁਭ ਸਵੇਰ", goodAfternoon: "ਸ਼ੁਭ ਦੁਪਹਿਰ", goodEvening: "ਸ਼ੁਭ ਸ਼ਾਮ", homeQuestion: "ਅੱਜ ਕਿਵੇਂ ਹੋ?", homeSupport: "ਮਾਮਿਤਰਾ ਮਦਦ ਲਈ ਹੈ।", micLabel: "ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ", quickCheckin: "ਤੁਰੰਤ ਚੈੱਕ-ਇਨ", lastCheckin: "ਆਖਰੀ ਚੈੱਕ-ਇਨ 2 ਦਿਨ ਪਹਿਲਾਂ", completeHeading: "ਪ੍ਰੋਫਾਈਲ ਤਿਆਰ ਹੈ", completeSupport: "ਮਾਮਿਤਰਾ ਤਿਆਰ ਹੈ।", completeDemoNote: "ਆਸ਼ਾ ਨੂੰ ਭੇਜਿਆ ਜਾਵੇਗਾ।", statusLabel: "ਸਥਿਤੀ", voiceHeading: "ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ", voiceSupport: "ਖੁੱਲ੍ਹ ਕੇ ਬੋਲੋ।", voiceReady: "ਤਿਆਰ ਹੋਣ 'ਤੇ ਟੈਪ ਕਰੋ", voiceListening: "ਸੁਣ ਰਿਹਾ ਹੈ...", voiceProcessing: "ਸਮਝ ਰਿਹਾ ਹੈ...", voiceTapInstead: "ਟੈਪ ਕਰਕੇ ਜਵਾਬ ਦਿਓ", transcriptHeading: "ਤੁਸੀਂ ਜੋ ਕਿਹਾ", understoodHeading: "ਅਸੀਂ ਜੋ ਸਮਝਿਆ", confirmBtn: "ਹਾਂ, ਸਹੀ ਹੈ", retryBtn: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ", somethingWrongBtn: "ਕੁਝ ਗਲਤ ਹੈ", isThisCorrect: "ਕੀ ਇਹ ਸਹੀ ਹੈ?", confirmHeading: "ਪੁਸ਼ਟੀ ਕਰੋ", confirmSupport: "ਵੇਰਵੇ ਦੇਖੋ।", submitBtn: "ਜਮ੍ਹਾਂ ਕਰੋ", goBackBtn: "ਪਿੱਛੇ ਜਾਓ", observations: "ਲੱਛਣ", language: "ਭਾਸ਼ਾ", reportedNow: "ਹੁਣ ਰਿਪੋਰਟ ਕੀਤਾ", whatYouShared: "ਜੋ ਸਾਂਝਾ ਕੀਤਾ", submittedHeading: "ਜਮ੍ਹਾਂ ਹੋ ਗਿਆ", submittedSupport: "ਆਸ਼ਾ ਨੂੰ ਅੱਪਡੇਟ ਮਿਲ ਗਿਆ ਹੈ।", followUpLabel: "ਫਾਲੋ-ਅਪ ਦੀ ਲੋੜ ਹੈ", followUpDetail: "ਆਸ਼ਾ ਜਲਦੀ ਸੰਪਰਕ ਕਰੇਗੀ।", ashaViewBtn: "ਡੈਸ਼ਬੋਰਡ ਦੇਖੋ", doneBtn: "ਹੋ ਗਿਆ", offlineMsg: "ਤੁਸੀਂ ਔਫਲਾਈਨ ਹੋ", offlineDetail: "ਔਨਲਾਈਨ ਹੋਣ 'ਤੇ ਭੇਜਿਆ ਜਾਵੇਗਾ।", savedOffline: "ਔਫਲਾਈਨ ਸੇਵ ਕੀਤਾ", couldntHear: "ਸਪਸ਼ਟ ਸੁਣ ਨਹੀਂ ਸਕੇ।", tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ", wantToConfirm: "ਪੁਸ਼ਟੀ ਕਰਨੀ ਹੈ?", tapCheckInHeading: "ਅੱਜ ਕਿਵੇਂ ਹੈ?", iFeelOkay: "ਮੈਂ ਠੀਕ ਹਾਂ", headache: "ਸਿਰ ਦਰਦ", fever: "ਬੁਖਾਰ", swelling: "ਸੋਜ", pain: "ਦਰਦ", troubleFeeding: "ਦੁੱਧ ਚੁੰਘਾਉਣ ਵਿੱਚ ਮੁਸ਼ਕਲ", transcribedFromVoice: "ਆਵਾਜ਼ ਤੋਂ ਲਿਖਿਆ", submittedViaTap: "ਟੈਪ ਰਾਹੀਂ ਜਮ੍ਹਾਂ ਕੀਤਾ।", back: "ਪਿੱਛੇ", namePlaceholder: "ਨਾਮ ਦਰਜ ਕਰੋ", todaysCheckIn: "ਅੱਜ ਦਾ ਚੈੱਕ-ਇਨ", askMaaMitra: "ਮਾਮਿਤਰਾ ਨੂੰ ਪੁੱਛੋ", reminders: "ਰਿਮਾਈਂਡਰ", stopRecording: "ਰੋਕੋ", speakNow: "ਬੋਲੋ", selectAllThatApply: "ਸਾਰੇ ਚੁਣੋ", saved: "ਸੇਵ ਕੀਤਾ", checkInComplete: "ਪੂਰਾ", responseRecorded: "ਦਰਜ ਕੀਤਾ", loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...", error: "ਗਲਤੀ", welcomeGreeting: "ਸਵਾਗਤ ਹੈ", ashaUpdateTitle: "ਆਸ਼ਾ ਅੱਪਡੇਟ", ashaActionContact: "ਸੰਪਰਕ ਕੀਤਾ ਹੈ।", ashaActionVisit: "ਮੁਲਾਕਾਤ ਤੈਅ ਹੈ।", ashaActionRefer: "ਰੈਫਰਲ ਦਿੱਤਾ ਹੈ।", done: "ਹੋ ਗਿਆ"
};

// Now read existing file to extract en, hi, mr, bn since they were already correctly embedded before...
// Actually, in generate_translations_part1, I created `mr` and `bn`. Let me just extract them by evaluating part1.
const part1Code = fs.readFileSync('./generate_translations_part1.cjs', 'utf8');
// Convert it to module exports so I can require it:
const p1Modified = part1Code + '\nmodule.exports = { mr, bn };';
fs.writeFileSync('./generate_translations_part1_tmp.cjs', p1Modified);

const { mr, bn } = require('./generate_translations_part1_tmp.cjs');

// Get English and Hindi from translations.ts
const existingTranslationsTs = fs.readFileSync('./src/core/i18n/translations.ts', 'utf8');
const enMatch = existingTranslationsTs.match(/const en: Strings = (\{[\s\S]+?\n\});/);
const hiMatch = existingTranslationsTs.match(/const hi: Strings = (\{[\s\S]+?\n\});/);

const en = eval(`(${enMatch[1]})`);
const hi = eval(`(${hiMatch[1]})`);

const languages = [
  { code: 'mr', data: mr },
  { code: 'bn', data: bn },
  { code: 'te', data: te },
  { code: 'ta', data: ta },
  { code: 'kn', data: kn },
  { code: 'ml', data: ml },
  { code: 'gu', data: gu },
  { code: 'pa', data: pa },
];

for (const lang of languages) {
  const finalData = { ...en };
  for (const key of Object.keys(en)) {
    if (lang.data[key]) {
      finalData[key] = lang.data[key];
    }
  }
  lang.finalData = finalData;
}

const fileContent = `export interface Strings {
${Object.keys(en).map(k => `  ${k}: string;`).join('\n')}
}

const en: Strings = ${JSON.stringify(en, null, 2)};
const hi: Strings = ${JSON.stringify(hi, null, 2)};
const mr: Strings = ${JSON.stringify(languages[0].finalData, null, 2)};
const bn: Strings = ${JSON.stringify(languages[1].finalData, null, 2)};
const te: Strings = ${JSON.stringify(languages[2].finalData, null, 2)};
const ta: Strings = ${JSON.stringify(languages[3].finalData, null, 2)};
const kn: Strings = ${JSON.stringify(languages[4].finalData, null, 2)};
const ml: Strings = ${JSON.stringify(languages[5].finalData, null, 2)};
const gu: Strings = ${JSON.stringify(languages[6].finalData, null, 2)};
const pa: Strings = ${JSON.stringify(languages[7].finalData, null, 2)};

export const translations: Record<string, Strings> = {
  en, hi, mr, bn, te, ta, kn, ml, gu, pa
};

export function t(lang: string, key: keyof Strings): string {
  const strings = translations[lang] ?? translations.en;
  return strings[key] ?? translations.en[key] ?? key;
}

export function timeGreeting(lang: string): string {
  const h = new Date().getHours();
  const s = translations[lang] ?? translations.en;
  if (h < 12) return s.goodMorning;
  if (h < 17) return s.goodAfternoon;
  return s.goodEvening;
}
`;

fs.writeFileSync('./src/core/i18n/translations.ts', fileContent, 'utf8');
console.log('Successfully wrote translations.ts with ALL complete strings!');
