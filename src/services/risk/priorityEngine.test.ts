import { evaluatePriority } from "./priorityEngine";

function runTest(observations: any[], expectedLevel: string) {
  const result = evaluatePriority(observations, "hi");
  const pass = result.level === expectedLevel;
  console.log(`[${pass ? "PASS" : "FAIL"}] Priority Level: Expected ${expectedLevel}, Got ${result.level}`);
  if (!pass) {
    console.log(`  Reason: ${result.reason}`);
  }
}

runTest([{ id: "1", type: "symptom", label: "तेज़ सिर दर्द" }], "review");
runTest([{ id: "1", type: "symptom", label: "fever" }], "review");
runTest([{ id: "2", type: "onset", label: "yesterday" }], "routine");
runTest([], "routine");
