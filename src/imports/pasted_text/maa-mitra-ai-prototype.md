Continue building the existing MaaMitra AI mobile prototype.

IMPORTANT:
This is an existing React + Vite + TypeScript prototype. DO NOT restart the project, replace the current implementation, or change the core setup.

The existing visual design is already the foundation.
EXTEND it carefully rather than redesigning it from scratch.

VISUAL SOURCE OF TRUTH:
The attached MaaMitra pitch-deck screenshots are the primary reference for the product's visual identity.

Use them to understand:
- colour palette
- typography
- photography style
- spacing
- visual hierarchy
- emotional tone
- human/community-health feeling

DO NOT literally reproduce the presentation slides as app screens.
Translate the visual language into a polished, real mobile application.

==================================================
PRODUCT
==================================================

MaaMitra AI is a voice-first maternal continuity application for pregnant and postpartum mothers in India.

The core idea:

A mother can report how she and her baby are doing between scheduled healthcare touchpoints.

MaaMitra helps structure what she reports and creates an explainable signal for follow-up by her ASHA worker.

MaaMitra is NOT:
- a doctor
- a diagnostic chatbot
- a medical prescribing system
- a generic AI assistant

Core principle:

AI understands and structures what the mother says.

Deterministic rules handle medical/risk prioritization.

A human ASHA worker remains responsible for follow-up and action.

==================================================
TARGET USER
==================================================

The primary prototype user is the MOTHER.

Do NOT build an ASHA login flow in this version.

The demo should showcase one complete, polished mother journey.

The ASHA side can be represented later as a system output/demo view.

==================================================
DESIGN DIRECTION
==================================================

The application should feel:

Warm.
Human.
Calm.
Trustworthy.
Accessible.
Grounded in India.
Designed for real mothers rather than technology enthusiasts.

It should feel like a thoughtful healthcare product created around the person using it.

Use the attached pitch deck as the visual reference.

PREFERRED VISUAL LANGUAGE:

- warm cream / off-white backgrounds
- deep teal
- deep navy
- restrained coral accents
- subtle sage/neutral supporting colours
- editorial and highly legible typography
- generous whitespace
- thin dividers
- understated borders
- moderate corner radius
- subtle depth only when useful
- real-world Indian maternal/community-health photography
- large touch targets
- simple icons
- calm interaction states

AVOID:

- purple AI gradients
- blue/purple SaaS gradients
- glassmorphism
- neon
- excessive shadows
- excessive rounded cards
- cards nested inside cards
- generic SaaS dashboard layouts
- chatbot bubbles
- robot illustrations
- futuristic AI imagery
- glowing AI effects
- giant statistics
- excessive charts
- generic "AI-powered" graphics
- fintech-style UI
- enterprise dashboard aesthetics
- overly playful children's-app aesthetics

DO NOT make this look like ChatGPT.

DO NOT make this look like a generic healthcare SaaS template.

==================================================
ACCESSIBILITY
==================================================

The mother may have limited digital literacy.

Design for extremely clear interaction.

Use:
- large buttons
- large readable typography
- obvious actions
- high contrast
- short sentences
- simple vocabulary
- minimal typing
- recognizable icons
- approximately 44px+ touch targets
- clear selected/unselected states

The mother should understand the primary action of each screen immediately.

==================================================
LANGUAGE ARCHITECTURE
==================================================

Multilingual support is a CORE product capability.

The first-time experience must allow the mother to choose her preferred language.

SUPPORTED LANGUAGES IN THE UI:

English
हिंदी — Hindi
मराठी — Marathi
বাংলা — Bengali
తెలుగు — Telugu
தமிழ் — Tamil
ಕನ್ನಡ — Kannada
മലയാളം — Malayalam
ગુજરાતી — Gujarati
ਪੰਜਾਬੀ — Punjabi

English is a first-class option.

Do not assume that rural users cannot understand English.

Show native script prominently and English language names where useful.

Include:

"You can change your language anytime."

IMPORTANT:

The selected language should control three things:

1. Interface language
2. Voice input language
3. MaaMitra's spoken response language

These should be architecturally treated as related but independently configurable.

Do not claim support for every Indian dialect.

The product is Hindi-first and multilingual by design, with expansion across Indic languages.

==================================================
EXISTING SCREENS
==================================================

PRESERVE AND POLISH the existing screens rather than replacing their visual identity.

SCREEN 1 — WELCOME / LOGIN

Current concept:

MaaMitra

"Your continuity of care, between visits."

Mobile number input.

Continue.

Demo account.

Keep the human photography and warm visual treatment.

The prototype only needs a mother journey.

Do NOT add an ASHA login.

The demo account should allow judges to enter the prototype without real OTP infrastructure.

--------------------------------------------------

SCREEN 2 — LANGUAGE SELECTION

Title:

"Which language would you like to continue in?"

Show the 10 supported languages.

Make the selected language state very obvious but elegant.

Primary:

"Continue"

Supporting:

"You can change your language anytime."

When a language is selected, subsequent mother-facing screens must actually use that language.

--------------------------------------------------

SCREEN 3 — MOTHER ONBOARDING

Use a simple, human form.

Heading:

"Let's get to know you"

Supporting text:

"This helps MaaMitra support you at the right time."

Collect:

Name

Stage:
- I'm pregnant
- I've recently given birth

If pregnant:
Expected delivery date

If postpartum:
Baby's date of birth

Preferred language

Primary:

"Continue"

Keep this screen simple.

Do not make it feel like a government registration form.

--------------------------------------------------

SCREEN 4 — ONBOARDING COMPLETE

Show a calm confirmation.

For example:

"Namaste, Devi"

"You're all set."

Then a concise summary:

Name
Stage
Expected delivery / baby's date of birth
Language

Supporting text:

"MaaMitra will walk with you, every step of the way."

Then:

"Start"

==================================================
CORE EXPERIENCE
==================================================

Now build the most important part of the prototype.

SCREEN 5 — MOTHER HOME

This should be extremely simple.

Greeting should use the mother's name.

English example:

"Good morning, Devi"

Main question:

"How are you and your baby today?"

Supporting text:

"You can tell MaaMitra in your own words."

PRIMARY ACTION:

A large microphone button.

Label:

"Tell us"

Secondary action:

"Quick check-in"

Also show a subtle status:

"Last check-in · 2 days ago"

Do NOT create:
- statistics
- streaks
- charts
- wellness scores
- AI assistant cards
- unnecessary dashboard widgets

The mother home is a calm starting point.

--------------------------------------------------

SCREEN 6 — VOICE CHECK-IN

THIS IS THE HERO SCREEN.

Heading:

"Tell us how you're feeling"

Supporting text:

"You can speak naturally in your chosen language."

Large central microphone interaction.

The interaction must have clear states:

READY:
"Tap to speak"

LISTENING:
"Listening..."

FINISHED:
"Done"

Use a subtle organic audio waveform while recording.

Do NOT use:
- neon
- futuristic waves
- glowing AI effects
- sci-fi visuals

The interaction should communicate:

"You can simply talk."

Include:

"Answer by tapping instead"

as a secondary option.

The voice interaction must feel like the defining feature of MaaMitra.

--------------------------------------------------

SCREEN 7 — TRANSCRIPTION

After the mother speaks, display the transcript.

For the Hindi demonstration, use:

"मुझे कल से बहुत तेज़ सिर दर्द हो रहा है और पैर भी सूज गए हैं।"

Heading:

"I heard"

Show the transcript clearly.

Then:

"What I understood"

Structured observations:

• Severe headache
• New swelling
• Started yesterday

IMPORTANT:

Make it visually obvious that this is MaaMitra's interpretation of what the mother said.

The mother MUST confirm this before it becomes a submitted check-in.

Primary:

"Yes, that's right"

Secondary:

"Say it again"

Do NOT call this a diagnosis.

Do NOT show a medical risk score.

--------------------------------------------------

SCREEN 8 — CONFIRMATION

Heading:

"Your check-in is ready"

Show a concise summary of the information that will be shared.

Include:
- reported observations
- when they started
- selected language

Supporting text:

"Review your information before sending it."

Primary:

"Submit check-in"

Secondary:

"Go back and change"

The screen should feel safe and transparent.

--------------------------------------------------

SCREEN 9 — SUBMISSION / NEXT ACTION

After submission:

Heading:

"Your check-in has been shared."

Supporting:

"Your ASHA worker can review your update and follow up if needed."

If the deterministic rules produce a follow-up signal, show:

"Follow-up recommended"

Then:

"Your ASHA worker may contact or visit you."

Do NOT say:

"AI diagnosis"

"AI prediction"

"You have..."

"You are suffering from..."

Do not create fear or false certainty.

The mother should understand that her information has been passed to a human health worker.

==================================================
ASHA SYSTEM OUTPUT
==================================================

After the mother submits her check-in, create a small optional DEMO VIEW that can be opened by the judges.

This is NOT an ASHA login.

Label it clearly:

"ASHA view · Demo"

Show the signal generated from the mother's check-in.

Example:

SUNIta Devi · 28 weeks

New symptoms reported

Reported today · 10:42 AM

WHY PRIORITIZED

"New symptoms reported between scheduled visits."

NEXT ACTION

"Contact / visit mother and follow applicable protocol."

The ASHA view should demonstrate the continuity loop:

Mother signal
→ structured observation
→ explainable priority
→ human follow-up

Do not create a huge dashboard.

==================================================
VOICE + LANGUAGE DEMONSTRATION
==================================================

The prototype should make multilingual voice feel real.

For the Hindi demo:

Mother selects:

हिंदी

The interface switches to Hindi.

The mother speaks Hindi.

The transcript appears in Hindi.

The structured interpretation can be shown in a clear bilingual format if necessary for the demo.

MaaMitra's response should be capable of being spoken back in Hindi.

For English:

The same workflow should operate in English.

Architect the interface so other supported languages can be added without redesigning the workflow.

==================================================
OFFLINE-FIRST VISUAL STATES
==================================================

MaaMitra is intended to be offline-capable.

Include subtle but realistic offline states.

When offline:

"You're offline"

"Your check-in will be saved on this phone and synced when you're connected."

When saved locally:

"Saved offline · Will sync when connected"

Do not make offline mode look like an error.

It is a supported product state.

==================================================
LOADING / ERROR / EMPTY STATES
==================================================

Create polished states for:

Voice processing:
"Understanding your message..."

Network unavailable:
"You're offline. Your information is safe on this phone."

Speech recognition failure:
"We couldn't hear that clearly."

Action:
"Try again"

AI extraction uncertainty:
"I want to make sure I understood you correctly."

Action:
"Say it again"

Do not expose technical errors to the mother.

==================================================
COMPONENT SYSTEM
==================================================

Create reusable components for:

- Primary button
- Secondary button
- Language selection tile
- Input field
- Status selection tile
- Microphone button
- Voice recording state
- Audio waveform
- Transcript block
- Structured observation item
- Confirmation state
- Status banner
- Offline indicator
- Bottom action area
- Page heading
- Helper text
- Back navigation

Keep components visually consistent.

Do not create dozens of unnecessary abstractions.

==================================================
IMPORTANT ENGINEERING CONSTRAINT
==================================================

Keep the existing React + Vite + TypeScript architecture.

Do not convert this project to Flutter.

Do not introduce a completely different frontend framework.

Do not unnecessarily restructure the project.

Keep the existing design and extend it cleanly.

Prefer reusable components and data-driven language selection.

Keep visual styling consistent throughout the prototype.

==================================================
FINAL QUALITY BAR
==================================================

The final prototype should feel like:

"A real, carefully designed maternal healthcare product."

NOT:

"An AI-generated website."

A judge should be able to understand the entire story without explanation:

1. Mother enters MaaMitra
2. Chooses her language
3. Creates her profile
4. Sees a simple home
5. Speaks naturally
6. MaaMitra transcribes her speech
7. MaaMitra explains what it understood
8. Mother confirms
9. Her information is submitted
10. MaaMitra creates an explainable follow-up signal
11. An ASHA worker can act on it

The most important emotional moment is:

Mother speaks naturally
→ MaaMitra understands
→ Mother confirms
→ her ASHA receives a meaningful signal.

Prioritize polish, spacing, typography, accessibility, realistic interaction states and visual consistency over adding more features.

DO NOT add features just to make the prototype look larger.

Make the existing MaaMitra visual identity feel like a complete, coherent product.