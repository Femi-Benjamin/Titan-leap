import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const AuditModal: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    a5: "",
    a6: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleInputChange = (fieldId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: false,
      }));
    }
  };

  const selectRev = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      a2: value,
    }));
    if (errors.a2) {
      setErrors((prev) => ({
        ...prev,
        a2: false,
      }));
    }
  };

  const validateQuestion = (qNum: number) => {
    const fieldId = `a${qNum}`;
    if (!answers[fieldId] || answers[fieldId].trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: true,
      }));
      return false;
    }
    return true;
  };

  const next = (qNum: number) => {
    if (validateQuestion(qNum)) {
      setCurrentQuestion(Math.min(qNum + 1, 7));
      setErrors({});
    }
  };

  const back = (qNum: number) => {
    setCurrentQuestion(Math.max(qNum - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    const allValid = [1, 2, 3, 4, 5, 6].every((q) => {
      const fieldId = `a${q}`;
      return answers[fieldId] && answers[fieldId].trim() !== "";
    });

    if (!allValid) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/audit-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        setCurrentQuestion(8);
      } else {
        alert("Failed to submit audit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting audit:", error);
      alert("Error submitting audit. Please try again.");
    }
  };

  const handleClose = () => {
    setCurrentQuestion(1);
    setAnswers({
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      a5: "",
      a6: "",
    });
    setErrors({});
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen overflow-y-auto bg-[#06030D]">
      <div className="min-h-screen w-full px-4 py-8 md:px-8">
        <div className="relative flex min-h-[calc(100vh-4rem)] w-full flex-col bg-[#06030D]">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 text-purple-300 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mx-auto w-full max-w-4xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <img src={Logo} alt="TitanLeap Logo" className="w-32" />
              </div>
              <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/20 px-3 py-1.5 rounded text-xs text-yellow-400 mb-4">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                Revenue Leak Audit — Intake Form
              </div>
              <h1
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "Archivo" }}
              >
                Tell us about your
                <br />
                business. We'll find
                <br />
                the <span className="text-yellow-400">leaks.</span>
              </h1>
              <p
                className="text-sm text-purple-300/70 max-w-xs mx-auto"
                style={{ fontFamily: "Archivo" }}
              >
                This takes <strong>5 minutes</strong>. The more specific you
                are, the more specific your diagnosis. We'll have your audit
                ready within 48 hours.
              </p>

              {currentQuestion < 8 && (
                <div className="flex items-center justify-between gap-4 mt-6 bg-purple-900/20 border border-purple-500/20 rounded px-4 py-3">
                  <span
                    className="text-xs text-purple-400"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Question {Math.min(currentQuestion, 6)} of 6
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className={`h-1 w-6 rounded transition-all ${
                          i < currentQuestion
                            ? "bg-yellow-400"
                            : i === currentQuestion
                              ? "bg-purple-500"
                              : "bg-purple-900/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {currentQuestion === 1 && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px bg-yellow-400 w-4" />
                    <span
                      className="text-xs text-yellow-400 tracking-widest"
                      style={{ fontFamily: "Archivo" }}
                    >
                      QUESTION 1 OF 6
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "Archivo" }}
                  >
                    What does your product do and who is it for?
                  </h2>
                  <p
                    className="text-sm text-purple-300/70 mb-4"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Be specific. "B2B SaaS for marketing agencies that automates
                    client reporting" is better than "a marketing tool."
                  </p>
                </div>
                <textarea
                  value={answers.a1}
                  onChange={(e) => handleInputChange("a1", e.target.value)}
                  placeholder="e.g. We build project management software for remote design teams..."
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded px-4 py-3 text-white placeholder-purple-400/50 focus:border-purple-500 focus:outline-none resize-none min-h-32"
                  style={{ fontFamily: "Archivo" }}
                />
                {errors.a1 && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Please tell us about your product before continuing.
                  </p>
                )}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => next(1)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-6 rounded text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {currentQuestion === 2 && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px bg-yellow-400 w-4" />
                    <span
                      className="text-xs text-yellow-400 tracking-widest"
                      style={{ fontFamily: "Archivo" }}
                    >
                      QUESTION 2 OF 6
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Where are you right now with revenue?
                  </h2>
                  <p
                    className="text-sm text-purple-300/70 mb-4"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Be honest — this helps us calibrate the audit to your stage.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Pre-revenue",
                    "Under $1k/mo",
                    "$1k–$5k/mo",
                    "$5k–$15k/mo",
                    "$15k–$50k/mo",
                    "Over $50k/mo",
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => selectRev(opt)}
                      className={`py-2 px-3 rounded text-sm font-semibold transition-all ${
                        answers.a2 === opt
                          ? "bg-yellow-400/20 border border-yellow-400 text-yellow-400"
                          : "bg-purple-900/20 border border-purple-500/30 text-purple-300/70 hover:border-purple-500"
                      }`}
                      style={{ fontFamily: "Archivo" }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {errors.a2 && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Please select your current revenue stage.
                  </p>
                )}
                <div className="flex justify-between gap-3 mt-6">
                  <button
                    onClick={() => back(2)}
                    className="text-purple-300 hover:text-white font-semibold py-2 px-6 text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => next(2)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-6 rounded text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {currentQuestion === 3 && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px bg-yellow-400 w-4" />
                    <span
                      className="text-xs text-yellow-400 tracking-widest"
                      style={{ fontFamily: "Archivo" }}
                    >
                      QUESTION 3 OF 6
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "Archivo" }}
                  >
                    How does someone go from stranger to paying customer?
                  </h2>
                  <p
                    className="text-sm text-purple-300/70 mb-4"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Walk us through the steps. Where do they find you, what do
                    they do next, where do they drop off?
                  </p>
                </div>
                <textarea
                  value={answers.a3}
                  onChange={(e) => handleInputChange("a3", e.target.value)}
                  placeholder="e.g. They find us through Google ads → land on our homepage → sign up for a free trial..."
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded px-4 py-3 text-white placeholder-purple-400/50 focus:border-purple-500 focus:outline-none resize-none min-h-32"
                  style={{ fontFamily: "Archivo" }}
                />
                {errors.a3 && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Please describe your funnel before continuing.
                  </p>
                )}
                <div className="flex justify-between gap-3 mt-6">
                  <button
                    onClick={() => back(3)}
                    className="text-purple-300 hover:text-white font-semibold py-2 px-6 text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => next(3)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-6 rounded text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {currentQuestion === 4 && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px bg-yellow-400 w-4" />
                    <span
                      className="text-xs text-yellow-400 tracking-widest"
                      style={{ fontFamily: "Archivo" }}
                    >
                      QUESTION 4 OF 6
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Where do you think the biggest leak is?
                  </h2>
                  <p
                    className="text-sm text-purple-300/70 mb-4"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Your gut instinct. Even if you're not sure — what feels most
                    broken right now?
                  </p>
                </div>
                <textarea
                  value={answers.a4}
                  onChange={(e) => handleInputChange("a4", e.target.value)}
                  placeholder="e.g. I think people are dropping off between the free trial and the paid conversion..."
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded px-4 py-3 text-white placeholder-purple-400/50 focus:border-purple-500 focus:outline-none resize-none min-h-32"
                  style={{ fontFamily: "Archivo" }}
                />
                {errors.a4 && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Please share your instinct before continuing.
                  </p>
                )}
                <div className="flex justify-between gap-3 mt-6">
                  <button
                    onClick={() => back(4)}
                    className="text-purple-300 hover:text-white font-semibold py-2 px-6 text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => next(4)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-6 rounded text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {currentQuestion === 5 && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px bg-yellow-400 w-4" />
                    <span
                      className="text-xs text-yellow-400 tracking-widest"
                      style={{ fontFamily: "Archivo" }}
                    >
                      QUESTION 5 OF 6
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "Archivo" }}
                  >
                    What's your biggest priority for the next 90 days?
                  </h2>
                  <p
                    className="text-sm text-purple-300/70 mb-4"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Revenue, conversions, traffic, retention? Whatever would
                    have the biggest impact on your business.
                  </p>
                </div>
                <textarea
                  value={answers.a5}
                  onChange={(e) => handleInputChange("a5", e.target.value)}
                  placeholder="e.g. We need to increase our trial-to-paid conversion rate from 8% to 15%..."
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded px-4 py-3 text-white placeholder-purple-400/50 focus:border-purple-500 focus:outline-none resize-none min-h-32"
                  style={{ fontFamily: "Archivo" }}
                />
                {errors.a5 && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Please share your priority before continuing.
                  </p>
                )}
                <div className="flex justify-between gap-3 mt-6">
                  <button
                    onClick={() => back(5)}
                    className="text-purple-300 hover:text-white font-semibold py-2 px-6 text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => next(5)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-6 rounded text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {currentQuestion === 6 && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px bg-yellow-400 w-4" />
                    <span
                      className="text-xs text-yellow-400 tracking-widest"
                      style={{ fontFamily: "Archivo" }}
                    >
                      QUESTION 6 OF 6
                    </span>
                  </div>
                  <h2
                    className="text-xl font-bold text-white mb-2"
                    style={{ fontFamily: "Archivo" }}
                  >
                    What's your email? We'll send your audit there.
                  </h2>
                  <p
                    className="text-sm text-purple-300/70 mb-4"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Check your spam folder just in case. We'll have your full
                    audit within 48 hours.
                  </p>
                </div>
                <input
                  type="email"
                  value={answers.a6}
                  onChange={(e) => handleInputChange("a6", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-purple-900/20 border border-purple-500/30 rounded px-4 py-3 text-white placeholder-purple-400/50 focus:border-purple-500 focus:outline-none"
                  style={{ fontFamily: "Archivo" }}
                />
                {errors.a6 && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Please enter your email before submitting.
                  </p>
                )}
                <div className="flex justify-between gap-3 mt-6">
                  <button
                    onClick={() => back(6)}
                    className="text-purple-300 hover:text-white font-semibold py-2 px-6 text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-6 rounded text-sm transition-all"
                    style={{ fontFamily: "Archivo" }}
                  >
                    Submit →
                  </button>
                </div>
              </div>
            )}

            {currentQuestion === 8 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 border-2 border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">✓</span>
                </div>
                <h2
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "Archivo" }}
                >
                  Thank You!
                </h2>
                <p
                  className="text-purple-300/70 mb-6"
                  style={{ fontFamily: "Archivo" }}
                >
                  Your audit intake form has been submitted. We'll have your
                  full revenue leak audit ready within 48 hours and send it
                  directly to your email.
                </p>
                <p
                  className="text-sm text-purple-400/70 mb-6"
                  style={{ fontFamily: "Archivo" }}
                >
                  In the meantime, check out our resources or explore our other
                  services.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold py-2 px-8 rounded text-sm transition-all"
                  style={{ fontFamily: "Archivo" }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditModal;
