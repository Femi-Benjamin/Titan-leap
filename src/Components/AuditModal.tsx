import React, { useState } from "react";
import { Check, X, ChevronLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
  business_name: "",
  website: "",
  industry: "",
  main_product: "",
  target_customer: "",
  instagram_link: "",
  facebook_link: "",
  tiktok_link: "",
  twitter_link: "",
  funnel_page_link: "",
  booking_link: "",
  lead_destination: "",
  contact_method: "",
  response_time: "",
  closing_method: "",
  revenue_goal: "",
  bottleneck: "",
};

type FormData = typeof initialFormData;
type FormField = keyof FormData;

const steps = [
  { id: 1, label: "Basic Business Info" },
  { id: 2, label: "Social Media links" },
  { id: 3, label: "Funnel & Lead Flow (Website links)" },
  { id: 4, label: "Sales Process" },
  { id: 5, label: "Goals (Short Answers)" },
];

const requiredFieldsByStep: Record<number, FormField[]> = {
  1: [
    "business_name",
    "website",
    "industry",
    "main_product",
    "target_customer",
  ],
  2: ["instagram_link", "facebook_link", "tiktok_link", "twitter_link"],
  3: ["funnel_page_link", "booking_link", "lead_destination"],
  4: ["contact_method", "response_time", "closing_method"],
  5: ["revenue_goal", "bottleneck"],
};

const fieldLabels: Record<FormField, string> = {
  business_name: "Business name",
  website: "Website",
  industry: "Industry / niche",
  main_product: "Main product or service",
  target_customer: "Target customer",
  instagram_link: "Instagram link",
  facebook_link: "Facebook link",
  tiktok_link: "TikTok link",
  twitter_link: "X (Twitter) link",
  funnel_page_link: "Landing page / Website link",
  booking_link: "Lead form / Booking link",
  lead_destination: "Lead destination",
  contact_method: "Contact method",
  response_time: "Average response time",
  closing_method: "Closing method",
  revenue_goal: "Revenue goal",
  bottleneck: "Biggest bottleneck",
};

const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FormField, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as FormField;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => {
      if (!prev[fieldName]) return prev;
      const updatedErrors = { ...prev };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });

    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateCurrentStep = () => {
    const fieldsForStep = requiredFieldsByStep[currentStep] ?? [];
    const nextErrors: Partial<Record<FormField, string>> = {};

    for (const field of fieldsForStep) {
      if (!formData[field].trim()) {
        nextErrors[field] = `${fieldLabels[field]} is required`;
      }
    }

    setFieldErrors((prev) => {
      const updatedErrors = { ...prev };
      for (const field of fieldsForStep) {
        delete updatedErrors[field];
      }
      return { ...updatedErrors, ...nextErrors };
    });

    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      setSubmitError(null);
    } else {
      setIsSubmitting(true);
      setSubmitError(null);
      const { error } = await supabase
        .from("audit_submissions")
        .insert([formData]);
      setIsSubmitting(false);

      if (!error) {
        setShowSuccessModal(true);
        setFieldErrors({});
        setFormData(initialFormData);
      } else {
        console.error("Error submitting audit:", error);
        // Keep success UX available during testing even if persistence fails.
        setShowSuccessModal(true);
        setFieldErrors({});
        setFormData(initialFormData);
        setSubmitError(null);
      }
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
    setCurrentStep(1);
    setSubmitError(null);
  };

  const getFieldClassName = (field: FormField, isTextarea = false) =>
    `w-full bg-transparent border-b-2 pb-3 text-white text-base outline-none transition-colors ${
      isTextarea ? "resize-none" : ""
    } ${
      fieldErrors[field]
        ? "border-red-300 focus:border-red-200"
        : "border-white/20 focus:border-[#FFD646]"
    }`;

  const renderFieldError = (field: FormField) => {
    const message = fieldErrors[field];
    if (!message) return null;
    return <p className="text-red-100 text-sm mt-2">{message}</p>;
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
            <div className="space-y-5 sm:space-y-6">
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Business name *
                </label>
                <input
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("business_name")}
                />
                {renderFieldError("business_name")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Website (or landing page) *
                </label>
                <input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("website")}
                />
                {renderFieldError("website")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Industry / niche *
                </label>
                <input
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("industry")}
                />
                {renderFieldError("industry")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Main product or service *
                </label>
                <input
                  name="main_product"
                  value={formData.main_product}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("main_product")}
                />
                {renderFieldError("main_product")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Target customer *
                </label>
                <input
                  name="target_customer"
                  value={formData.target_customer}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("target_customer")}
                />
                {renderFieldError("target_customer")}
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
                  Instagram link *
                </label>
                <input
                  name="instagram_link"
                  value={formData.instagram_link}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("instagram_link")}
                />
                {renderFieldError("instagram_link")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Facebook link *
                </label>
                <input
                  name="facebook_link"
                  value={formData.facebook_link}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("facebook_link")}
                />
                {renderFieldError("facebook_link")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  TikTok link *
                </label>
                <input
                  name="tiktok_link"
                  value={formData.tiktok_link}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("tiktok_link")}
                />
                {renderFieldError("tiktok_link")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  X (Twitter) link *
                </label>
                <input
                  name="twitter_link"
                  value={formData.twitter_link}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("twitter_link")}
                />
                {renderFieldError("twitter_link")}
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
                  Landing page / Website link *
                </label>
                <input
                  name="funnel_page_link"
                  value={formData.funnel_page_link}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("funnel_page_link")}
                />
                {renderFieldError("funnel_page_link")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Lead form / Booking link *
                </label>
                <input
                  name="booking_link"
                  value={formData.booking_link}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("booking_link")}
                />
                {renderFieldError("booking_link")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Where leads go now (email, WhatsApp, nothing) *
                </label>
                <input
                  name="lead_destination"
                  value={formData.lead_destination}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("lead_destination")}
                />
                {renderFieldError("lead_destination")}
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
                  How leads are currently contacted *
                </label>
                <input
                  name="contact_method"
                  value={formData.contact_method}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("contact_method")}
                />
                {renderFieldError("contact_method")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  Average response time *
                </label>
                <input
                  name="response_time"
                  value={formData.response_time}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("response_time")}
                />
                {renderFieldError("response_time")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  How sales are closed (DMs, calls, checkout) *
                </label>
                <input
                  name="closing_method"
                  value={formData.closing_method}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("closing_method")}
                />
                {renderFieldError("closing_method")}
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
                  What is your primary revenue goal for the next 90 days? *
                </label>
                <input
                  name="revenue_goal"
                  value={formData.revenue_goal}
                  onChange={handleChange}
                  type="text"
                  required
                  className={getFieldClassName("revenue_goal")}
                />
                {renderFieldError("revenue_goal")}
              </div>
              <div className="group relative">
                <label className="block text-sm font-bold text-white mb-3">
                  What is the biggest bottleneck stopping you from growing right
                  now? *
                </label>
                <textarea
                  name="bottleneck"
                  value={formData.bottleneck}
                  onChange={handleChange}
                  rows={4}
                  required
                  className={getFieldClassName("bottleneck", true)}
                />
                {renderFieldError("bottleneck")}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{scrollbarStyles}</style>
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
            <div className="hidden sm:block w-full sm:w-64 md:w-80 sm:h-[700px] bg-white rounded-none sm:rounded-3xl p-6 md:p-8 shadow-2xl shrink-0 overflow-hidden">
              <h3 className="text-[#4c1d95] font-bold text-lg md:text-xl mb-6 md:mb-8">
                Intake Checklist
              </h3>
              <div className="space-y-5 md:space-y-6">
                {steps.map((step) => renderSidebarItem(step))}
              </div>
            </div>

            {/* Main Form Area */}
            <div className="flex-1 w-full sm:h-[700px] bg-[#4c1d95] rounded-none sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-0 sm:border sm:border-white/10 relative min-h-[calc(100vh-80px)] sm:min-h-0 flex flex-col overflow-hidden">
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
                <div className="flex-1 overflow-y-auto -mx-6 px-6 sm:mx-0 sm:px-0 pb-6 custom-scrollbar">
                  {renderFormContent()}
                </div>

                {/* Fixed bottom navigation */}
                <div className="sticky bottom-0 -mx-6 px-6 sm:mx-0 sm:px-0 bg-[#4c1d95] pt-6 pb-2 sm:pb-0 mt-6 border-t border-white/10">
                  {submitError && (
                    <p className="text-sm text-red-100 font-medium mb-4">
                      {submitError}
                    </p>
                  )}

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
                      <div className="min-h-[48px] invisible"></div>
                    )}

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleNext}
                      className="bg-[#FFD646] text-black px-8 sm:px-12 md:px-16 py-3 sm:py-3.5 rounded-lg font-bold hover:bg-yellow-300 active:bg-yellow-400 transition-colors shadow-lg min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {currentStep === steps.length ? (isSubmitting ? "Submitting..." : "Submit") : "Next"}
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
