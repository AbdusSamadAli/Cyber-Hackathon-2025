import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const faqs = [
    {
      q: "What is Spam Shield AI?",
      a: "It's an AI-powered tool that detects spam in SMS, emails, and calls using models like BERT and XGBoost.",
    },
    {
      q: "What kind of data do you use?",
      a: "We use anonymized user inputs like SMS content, email metadata, and call duration/frequency.",
    },
    {
      q: "Is it real-time?",
      a: "Yes, predictions are made in real-time with minimal latency.",
    },
    {
      q: "What models do you use?",
      a: "BERT for text classification, and XGBoost for structured data like call metadata.",
    },
    {
      q: "Can I submit my own data?",
      a: "Yes, the platform supports user-submitted content for classification.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">📚 Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`rounded-lg border border-white/10 p-4 bg-white/5 transition-all duration-300 ${
              openIndex === idx ? "bg-white/10" : ""
            }`}
          >
            <button
              className="w-full flex justify-between items-center text-left font-medium text-lg"
              onClick={() => toggle(idx)}
            >
              {faq.q}
              <span className="text-gray-400 text-xl">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3 text-gray-300"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
