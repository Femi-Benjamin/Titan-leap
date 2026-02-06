import React, { useState } from "react";
import { Check, X } from "lucide-react";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { id: 1, label: "Basic Business Info" },
  { id: 2, label: "Social Media links" },
  { id: 3, label: "Funnel & Lead Flow (Website links)" },
  { id: 4, label: "Sales Process" },
  { id: 5, label: "Goals (Short Answers)" },
];

const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit logic here
      onClose();
      setCurrentStep(1); // Reset for next time
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderSidebarItem = (step: { id: number; label: string }) => {
    const isCompleted = currentStep > step.id;
    const isActive = currentStep === step.id;

    return (
      <div key={step.id} className="flex items-center gap-3">
        {isCompleted ? (
          <div className="w-5 h-5 rounded-full bg-[#4c1d95] flex items-center justify-center text-white shrink-0">
            <Check size={12} strokeWidth={4} />
          </div>
        ) : isActive ? (
          <div className="w-5 h-5 rounded-full bg-[#4c1d95] flex items-center justify-center shrink-0 text-white">
            {/* Inner dot for active state if preferred, or just check mark logic. 
                        Design shows check mark for completed. Let's use check for completed, solid for active. */}
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-[#4c1d95] flex items-center justify-center shrink-0"></div>
        )}
        <span
          className={`text-sm ${isActive || isCompleted ? "font-bold text-[#4c1d95]" : "font-medium text-[#4c1d95]/70"} leading-tight`}
        >
          {step.label}
        </span>
      </div>
    );
  };

  const renderFormContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Basic Business Info
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Business name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Website (or landing page)
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-white mb-2">
                  Industry / niche
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Main product or service
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Target customer
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Instagram link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Facebook link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  TikTok link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  X (Twitter) link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Funnel & Lead Flow
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Landing page / Website link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Lead form / Booking link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-white mb-2">
                  Where leads go now (email, WhatsApp, nothing)
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Sales Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  How leads are currently contacted
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  Average response time
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative col-span-1 md:col-span-2">
                <label className="block text-sm font-bold text-white mb-2">
                  How sales are closed (DMs, calls, checkout)
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Goals (Short Answers)
            </h2>
            <div className="space-y-10">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  What is your primary revenue goal for the next 90 days?
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-2">
                  What is the biggest bottleneck stopping you from growing right
                  now?
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:border-accent-yellow outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1a0b3c]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-6 items-stretch animate-[fade-in-up_0.3s_ease-out]">
        {/* Sidebar - Intake Checklist */}
        <div className="w-full md:w-80 bg-white rounded-3xl p-8 shadow-2xl shrink-0 flex flex-col">
          <h3 className="text-[#4c1d95] font-bold text-xl mb-8">
            Intake Checklist
          </h3>
          <div className="space-y-6">
            {steps.map((step) => renderSidebarItem(step))}
          </div>
        </div>

        {/* Main Form Area */}
        <div className="flex-1 w-full bg-[#4c1d95] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden flex flex-col min-h-[500px]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <form
            className="flex-1 flex flex-col justify-between"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex-1">{renderFormContent()}</div>

            <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-10 py-3 rounded-lg font-bold border border-[#6d28d9] text-white hover:bg-[#6d28d9]/50 transition-colors shadow-lg"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="bg-[#FFD646] text-black px-16 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg"
              >
                {currentStep === steps.length ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditModal;
