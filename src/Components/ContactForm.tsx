import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.sendForm(
        "service_kzv0xp9",
        "template_2m809av",
        form.current!,
        {
          publicKey: "TNqEZSn8KabiXckMt",
        },
      );

      setSubmitStatus("success");
      setIsSubmitting(false);

      // Reset form after successful submission
      if (form.current) {
        form.current.reset();
      }

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error: unknown) {
      setSubmitStatus("error");
      setIsSubmitting(false);

      if (error instanceof Error) {
        console.error("FAILED...", error.message);
      } else {
        console.error("FAILED...", error);
      }

      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div id="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className=" bg-[#5b21b6] p-8 rounded-3xl max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-white mb-8 font-Inter">
          Let's build something great together.
        </h1>

        {/* Success Message Banner */}
        {submitStatus === "success" && (
          <div className="mb-6 p-4 bg-green-500 text-white rounded-lg flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>Message sent successfully! We'll get back to you soon.</span>
          </div>
        )}

        {/* Error Message Banner */}
        {submitStatus === "error" && (
          <div className="mb-6 p-4 bg-red-500 text-white rounded-lg flex items-center gap-2">
            <span className="text-xl">✗</span>
            <span>Failed to send message. Please try again.</span>
          </div>
        )}

        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-white text-sm mb-2"
              >
                First name
              </label>
              <input
                name="user_name"
                id="firstName"
                type="text"
                required
                disabled={isSubmitting}
                className="w-full bg-white/10 border-b border-white/20 pb-3 px-3 pt-3 rounded-t-lg focus:border-accent-yellow focus:bg-white/20 outline-none transition-all text-white placeholder-white/30"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-white text-sm mb-2"
              >
                Last name
              </label>
              <input
                name="username"
                id="lastName"
                type="text"
                disabled={isSubmitting}
                className="w-full bg-white/10 border-b border-white/20 pb-3 px-3 pt-3 rounded-t-lg focus:border-accent-yellow focus:bg-white/20 outline-none transition-all text-white"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="companyName"
              className="block text-white text-sm mb-2"
            >
              Company name (optional)
            </label>
            <input
              name="company_name"
              id="companyName"
              type="text"
              disabled={isSubmitting}
              className="w-full bg-white/10 border-b border-white/20 pb-3 px-3 pt-3 rounded-t-lg focus:border-accent-yellow focus:bg-white/20 outline-none transition-all text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="workEmail"
                className="block text-white text-sm mb-2"
              >
                Work email
              </label>
              <input
                name="user_email"
                id="workEmail"
                type="email"
                required
                disabled={isSubmitting}
                className="w-full bg-white/10 border-b border-white/20 pb-3 px-3 pt-3 rounded-t-lg focus:border-accent-yellow focus:bg-white/20 outline-none transition-all text-white"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-white text-sm mb-2"
              >
                Phone number
              </label>
              <input
                name="phone_number"
                id="phoneNumber"
                type="tel"
                disabled={isSubmitting}
                className="w-full bg-white/10 border-b border-white/20 pb-3 px-3 pt-3 rounded-t-lg focus:border-accent-yellow focus:bg-white/20 outline-none transition-all text-white"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="projectDescription"
              className="block text-white text-sm mb-2"
            >
              Tell us about your project (optional)
            </label>
            <textarea
              name="message"
              id="projectDescription"
              rows={3}
              disabled={isSubmitting}
              className="w-full bg-white/10 border-b border-white/20 pb-3 px-3 pt-3 rounded-t-lg focus:border-accent-yellow focus:bg-white/20 outline-none transition-all text-white"
            ></textarea>
          </div>
          <div className="md:flex gap-7 md:pb-5 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#000000] py-3 rounded-md font-semibold md:mb-0 mb-4 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send request"}
            </button>
            <p className="text-white/70 text-sm text-center">
              By sending this form, I confirm that I have read and accepted the{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
