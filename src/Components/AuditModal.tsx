import React, { useState } from "react";
import { Check, X, ChevronLeft } from "lucide-react";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit logic here
      setShowSuccessModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
    setCurrentStep(1); // Reset for next time
  };

  const renderSidebarItem = (step: { id: number; label: string }) => {
    const isCompleted = currentStep > step.id;
    const isActive = currentStep === step.id;

    return (
      <div key={step.id} className="flex items-center gap-3">
        {isCompleted ? (
          <div className="w-6 h-6 rounded-full bg-[#4c1d95] flex items-center justify-center text-white shrink-0">
            <Check size={14} strokeWidth={4} />
          </div>
        ) : isActive ? (
          <div className="w-6 h-6 rounded-full bg-[#4c1d95] flex items-center justify-center shrink-0 text-white">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-[#4c1d95] flex items-center justify-center shrink-0"></div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
              Basic Business Info
            </h2>
            <div className="space-y-6 sm:space-y-8">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Business name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Website (or landing page)
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Industry / niche
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Main product or service
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Target customer
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
              Social Media Links
            </h2>
            <div className="space-y-6 sm:space-y-8">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Instagram link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Facebook link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  TikTok link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  X (Twitter) link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
              Funnel & Lead Flow
            </h2>
            <div className="space-y-6 sm:space-y-8">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Landing page / Website link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Lead form / Booking link
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Where leads go now (email, WhatsApp, nothing)
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
              Sales Process
            </h2>
            <div className="space-y-6 sm:space-y-8">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  How leads are currently contacted
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Average response time
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  How sales are closed (DMs, calls, checkout)
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
              Goals (Short Answers)
            </h2>
            <div className="space-y-6 sm:space-y-8">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  What is your primary revenue goal for the next 90 days?
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors"
                />
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  What is the biggest bottleneck stopping you from growing right
                  now?
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-white/20 pb-3 text-white text-base focus:border-[#FFD646] outline-none transition-colors resize-none"
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
    <>
      <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-[#1a0b3c]/80 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />

        <div className="relative z-10 w-full min-h-screen sm:min-h-0 sm:max-w-6xl flex flex-col gap-0 sm:gap-4 md:gap-6 sm:m-4 md:m-6 animate-[fade-in-up_0.3s_ease-out]">
          {/* Mobile Progress Bar */}
          <div className="sm:hidden bg-white px-4 py-4 sticky top-0 z-20 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={onClose}
                className="text-[#4c1d95] hover:text-[#6d28d9] transition-colors p-2 -ml-2"
              >
                <X size={24} />
              </button>
              <span className="text-sm font-bold text-[#4c1d95]">
                Step {currentStep} of {steps.length}
              </span>
              <div className="w-8"></div>
            </div>
            <div className="flex gap-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    currentStep >= step.id ? "bg-[#4c1d95]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 md:gap-6 flex-1">
            {/* Sidebar - Desktop Only */}
            <div className="hidden sm:block w-full sm:w-64 md:w-80 bg-white rounded-none sm:rounded-3xl p-6 md:p-8 shadow-2xl shrink-0">
              <h3 className="text-[#4c1d95] font-bold text-lg md:text-xl mb-6 md:mb-8">
                Intake Checklist
              </h3>
              <div className="space-y-5 md:space-y-6">
                {steps.map((step) => renderSidebarItem(step))}
              </div>
            </div>

            {/* Main Form Area */}
            <div className="flex-1 w-full bg-[#4c1d95] rounded-none sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-0 sm:border sm:border-white/10 relative min-h-[calc(100vh-80px)] sm:min-h-[500px] flex flex-col">
              {/* Close button - Desktop Only */}
              <button
                onClick={onClose}
                className="hidden sm:block absolute top-4 md:top-6 right-4 md:right-6 text-white/50 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>

              <form
                className="flex-1 flex flex-col"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto -mx-6 px-6 sm:mx-0 sm:px-0 pb-6">
                  {renderFormContent()}
                </div>

                {/* Fixed bottom navigation */}
                <div className="sticky bottom-0 -mx-6 px-6 sm:mx-0 sm:px-0 bg-[#4c1d95] pt-6 pb-2 sm:pb-0 mt-6 border-t border-white/10">
                  <div className="flex justify-between items-center gap-3">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 rounded-lg font-bold border-2 border-white/30 text-white hover:bg-white/10 active:bg-white/20 transition-colors shadow-lg min-h-[48px]"
                      >
                        <ChevronLeft size={20} className="sm:hidden" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <div></div>
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#FFD646] text-black px-8 sm:px-12 md:px-16 py-3 sm:py-3.5 rounded-lg font-bold hover:bg-yellow-300 active:bg-yellow-400 transition-colors shadow-lg min-h-[48px]"
                    >
                      {currentStep === steps.length ? "Submit" : "Next"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseSuccess}
          />

          {/* Success Modal Content */}
          <div className="relative z-10 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-md w-full text-center animate-[fade-in-up_0.3s_ease-out]">
            {/* Success Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Check
                size={32}
                strokeWidth={3}
                className="text-white sm:w-10 sm:h-10"
              />
            </div>

            {/* Success Message */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4c1d95] mb-3 sm:mb-4">
              Congratulations!
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
              Your audit has been submitted and will be ready in 24 hours.
            </p>

            {/* Close Button */}
            <button
              onClick={handleCloseSuccess}
              className="bg-[#FFD646] text-black px-10 sm:px-12 py-3 sm:py-3.5 rounded-lg font-bold hover:bg-yellow-300 active:bg-yellow-400 transition-colors shadow-lg min-h-[48px] w-full sm:w-auto"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuditModal;
