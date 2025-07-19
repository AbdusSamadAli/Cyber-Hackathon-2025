import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white space-y-10">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center"
      >
        About Spam Shield AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-center text-gray-300 max-w-3xl mx-auto"
      >
        A real-time spam detection system that analyzes SMS, Email, and Call
        data using AI models like BERT and XGBoost.
      </motion.p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <FeatureCard
          title="📥 User Inputs"
          description="Crowd-sourced reports and user-submitted SMS, email, and call metadata."
        />
        <FeatureCard
          title="🧹 Preprocessing Engine"
          description="Cleans and extracts metadata and key features from message content."
        />
        <FeatureCard
          title="🧠 ML Models"
          description="BERT for content analysis, XGBoost for call/email metadata classification."
        />
        <FeatureCard
          title="📊 Risk Scoring Module"
          description="Scores each communication based on trust, history, and content likelihood."
        />
        <FeatureCard
          title="🚨 Alert & Action System"
          description="Shows risk level (Low/Medium/High), and triggers auto-blocking if enabled."
        />
        <FeatureCard
          title="📈 Dashboard & Analytics"
          description="Visual insights on spam trends, detection accuracy, and user reports across SMS, email, and calls."
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 bg-white/10 p-6 rounded-lg backdrop-blur-md"
      >
        <h2 className="text-2xl font-bold mb-3">🔍 Risk Levels</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>
            <strong>Score ≥ 90</strong> →{" "}
            <span className="text-red-600 font-semibold">
              Critical
            </span>
          </li>
          <li>
            <strong>Score ≥ 70</strong> →{" "}
            <span className="text-red-400 font-semibold">
              High Risk (Red Alert)
            </span>
          </li>
          <li>
            <strong>Score 40–70</strong> →{" "}
            <span className="text-yellow-400 font-semibold">
              Medium Risk (Warning)
            </span>
          </li>
          <li>
            <strong>Score &lt; 40</strong> →{" "}
            <span className="text-green-400 font-semibold">
              Low Risk (Safe)
            </span>
          </li>
        </ul>
      </motion.div>
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
      className="bg-white/10 backdrop-blur-md p-5 rounded-lg shadow-md border border-white/10"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
