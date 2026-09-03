import { extractSupportedObservations } from "./observationExtractor";

function runTest(input: string, lang: "en" | "hi", expectedIds: string[]) {
  const result = extractSupportedObservations(input, lang);
  const ids = result.map(r => r.id);
  const pass = JSON.stringify(ids) === JSON.stringify(expectedIds);
  console.log(`[${pass ? "PASS" : "FAIL"}] Lang: ${lang} | Input: "${input}"`);
  if (!pass) {
    console.log(`  Expected: ${expectedIds}`);
    console.log(`  Got:      ${ids}`);
  }
}

runTest("मुझे कल से बहुत तेज़ सिर दर्द हो रहा है।", "hi", ["obs-hi-headache", "obs-hi-onset"]);
runTest("मुझे सिर दर्द हो रहा है।", "hi", ["obs-hi-headache"]);
runTest("I have had a headache since yesterday.", "en", ["obs-en-headache", "obs-en-onset"]);
runTest("I have a fever and cough.", "en", []);
