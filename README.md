MaaMitra AI

The continuity layer between mother and ASHA

MaaMitra AI is a multilingual, voice-first maternal and postpartum care continuity platform. It helps mothers share health changes between scheduled visits and gives ASHA workers structured context for follow-up.

MaaMitra is not a doctor and not another chatbot. It connects what a mother reports at home with the frontline worker responsible for follow-up.

Live Demo: https://maamitra-ai.vercel.app/

1. Problem

Maternal care does not happen only during scheduled visits. A mother may experience a new symptom, concern, or change at home while her next contact with a frontline worker is still days or weeks away.

Information from this period can be difficult to capture, structure, and act on. MaaMitra addresses this gap by creating continuity between the mother and ASHA worker.

2. Solution

MaaMitra gives mothers a simple way to report how they are feeling through voice or structured check-ins. The system converts the report into structured information and lets the mother confirm what was understood.

The confirmed information is then surfaced to the ASHA worker with an explainable priority signal, relevant context, and follow-up actions.

3. How It Works

The mother starts a voice or structured check-in.

Speech is converted to text and the report is structured.

The mother confirms what MaaMitra understood.

Deterministic rules generate a priority signal.

The ASHA worker reviews the signal and context.

The ASHA worker records an action or follow-up.

Core principle: AI understands. Rules prioritize. Humans decide and act.

4. What Makes MaaMitra Different

MaaMitra focuses on the period between visits, rather than trying to replace existing healthcare systems. It connects the mother-facing experience directly to the frontline ASHA workflow.

The platform combines voice-first interaction, multilingual support, structured observations, mother confirmation, deterministic prioritization, and a human follow-up loop.

Mother → MaaMitra → ASHA → Action → Follow-up

5. Multilingual Experience

MaaMitra supports English, Hindi, Marathi, Bengali, Telugu, Tamil, Kannada, Malayalam, Gujarati, and Punjabi.

The initial login page is English-first. After language selection, the selected language is carried through the mother experience, including onboarding, home, voice check-in, understanding, and confirmation.

Raw speech transcripts are preserved as speech-recognition output and are not silently rewritten into another language.

6. Technical Implementation

The frontend is built with React, TypeScript, Vite, and Tailwind CSS. The application provides the mother-facing experience as well as the ASHA dashboard.

The backend uses Node.js, Express, and REST APIs. Sarvam AI handles speech-to-text, while constrained processing structures the mother's report.

Application logic uses structured observations, deterministic priority services, multilingual i18n, and local/offline-oriented state. The prototype is deployed on Vercel.

7. Safety Architecture

MaaMitra separates language processing from prioritization. AI is used for speech recognition and constrained understanding, while deterministic application logic generates the priority signal.

The ASHA worker remains in the human decision loop and reviews the available context before taking action. MaaMitra does not present an opaque AI-generated medical score as a diagnosis.

The prototype does not provide autonomous diagnosis or prescribing and uses approximate location for planning rather than live tracking.

8. Screenshots
   <img width="419" height="805" alt="image" src="https://github.com/user-attachments/assets/d17bd3d3-1393-4d13-bd1c-e53be6e3d484" />
   <img width="418" height="805" alt="image" src="https://github.com/user-attachments/assets/078e71db-a838-4b02-83ad-5178afb040f8" />


   

9. Demo

The demonstration follows one complete continuity loop: language selection, voice check-in, speech-to-text, structured understanding, mother confirmation, priority signal, ASHA review, and follow-up action.

This shows how information moves from a mother's voice to an actionable frontline workflow rather than ending inside a chatbot conversation.

Demo Video: Add the final submission video link here.

10. Project Structure

The project contains the mother-facing screens, ASHA dashboard, centralized multilingual system, voice services, observation processing, deterministic risk services, local state management, and API layer.

The main application code is organized under src/, while the API entry point is under api/. Deployment and build configuration are maintained through the project configuration files.

11. Local Setup

The project requires Node.js and pnpm. Install dependencies with pnpm install, then create a local .env file using .env.example.

Add the server-side SARVAM_API_KEY to enable voice processing. Start the application with pnpm run dev and create a production build with pnpm run build.

12. Prototype Scope

The current prototype demonstrates mother-to-ASHA continuity, multilingual interaction, voice-based reporting, structured observations, mother confirmation, deterministic prioritization, and ASHA follow-up.

The ASHA dashboard uses safe demonstration data to illustrate how the workflow can operate from a frontline worker's perspective.

13. Future Scope

Future development can extend offline-first synchronization, additional Indic language and dialect coverage, stronger ASHA-to-PHC escalation workflows, and appropriate public-health system integrations.

The platform could also support richer maternal and postpartum timelines, production-grade security and governance, and supervised clinical validation before any real-world deployment.

14. Impact

MaaMitra is designed to strengthen an existing frontline healthcare workflow rather than replace it. It makes information from the period between maternal-health contacts easier to capture, understand, review, and act upon.

The intended continuity pathway is Mother → ASHA → PHC → District, creating a bridge between what happens at home and the existing health system.
