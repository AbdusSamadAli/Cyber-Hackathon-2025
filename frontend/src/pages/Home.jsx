import { motion } from "framer-motion";
import InputTester from "../components/InputTester";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white space-y-5">
      {/* Heading */}
      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold text-center tracking-wide"
      >
        Spam Shield AI
      </motion.h1>
      <motion.p
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 2, delay: 0.6 }}
        className="text-xl text-center text-gray-300 max-w-3xl mx-auto overflow-hidden whitespace-nowrap border-r-2 border-gray-300 animate-typing"
      >
        A real-time spam detection system powered by AI.
      </motion.p>
      <InputTester />

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {[
          {
            title: "📥 User Inputs",
            description:
              "Crowd-sourced reports and user-submitted SMS, email, and call metadata.",
          },
          {
            title: "🧹 Preprocessing Engine",
            description:
              "Cleans and extracts metadata and key features from message content.",
          },
          {
            title: "🧠 ML Models",
            description:
              "BERT for content analysis, XGBoost for call/email metadata classification.",
          },
          {
            title: "📊 Risk Scoring Module",
            description:
              "Scores each communication based on trust, history, and content likelihood.",
          },
          {
            title: "🚨 Alert & Action System",
            description:
              "Shows risk level (Low/Medium/High), and triggers auto-blocking if enabled.",
          },
          {
            title: "🔒 Privacy Preserved",
            description:
              "User data is anonymized and securely handled, with no storage of sensitive content.",
          },
        ].map((f, index) => (
          <FeatureCard key={index} title={f.title} description={f.description} />
        ))}
      </div>
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-center mt-8 mb-9">⚙️ How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            {
              step: "1️⃣ Input Collection",
              desc: "Users submit SMS, email, or call data for analysis.",
            },
            {
              step: "2️⃣ Preprocessing",
              desc: "Text and metadata are cleaned and tokenized.",
            },
            {
              step: "3️⃣ AI Prediction",
              desc: "Models classify content and assign spam probability.",
            },
            {
              step: "4️⃣ Result & Response",
              desc: "Results shown to users, with risk levels and action.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              className="bg-white/10 backdrop-blur-lg p-5 rounded-lg shadow border border-white/10 hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md p-5 rounded-lg shadow-md border border-white/10 hover:scale-105"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
