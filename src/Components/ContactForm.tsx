import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

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
        }
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
      <div className="bg-[#4C12BF] p-8 rounded-3xl max-w-2xl mx-auto">
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
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white disabled:opacity-50"
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
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white disabled:opacity-50"
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
              className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white disabled:opacity-50"
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
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white disabled:opacity-50"
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
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white disabled:opacity-50"
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
              className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white resize-none disabled:opacity-50"
            ></textarea>
          </div>
          <div className="md:flex gap-7 md:pb-5 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-[#5D3FD3] py-3 rounded-md font-semibold md:mb-0 mb-4 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send message"}
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
      </div>
    </div>
  );
}

// import { useRef, useState } from "react";
// import emailjs from "@emailjs/browser";

// export default function ContactForm() {
//   const form = useRef<HTMLFormElement>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<
//     "idle" | "success" | "error"
//   >("idle");

//   const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation(); // Prevent event bubbling

//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     try {
//       await emailjs.sendForm(
//         "service_kzv0xp9",
//         "template_2m809av",
//         form.current!,
//         {
//           publicKey: "TNqEZSn8KabiXckMt",
//         }
//       );

//       setSubmitStatus("success");
//       alert("Message sent successfully! We'll get back to you soon.");

//       // Reset form after successful submission
//       // if (form.current) {
//       //   form.current.reset();
//       // }

//       // Reset status after 5 seconds
//       // setTimeout(() => setSubmitStatus("idle"), 5000);
//     } catch (error: unknown) {
//       setSubmitStatus("error");
//       alert("Failed to send message. Please try again or contact us directly.");

//       if (error instanceof Error) {
//         console.error("FAILED...", error.message);
//       } else {
//         console.error("FAILED...", error);
//       }
//     }
//   };

//   return (
//     <div id="contact">
//       <div className="bg-[#4C12BF] p-8 rounded-3xl max-w-2xl mx-auto">
//         <h1 className="text-4xl font-bold text-white mb-8 font-Inter">
//           Let's build something great together.
//         </h1>

//         {/* Success Message Banner */}
//         {submitStatus === "success" && (
//           <div className="mb-6 p-4 bg-green-500 text-white rounded-lg">
//             ✓ Message sent successfully! We'll get back to you soon.
//           </div>
//         )}

//         {/* Error Message Banner */}
//         {submitStatus === "error" && (
//           <div className="mb-6 p-4 bg-red-500 text-white rounded-lg">
//             ✗ Failed to send message. Please try again.
//           </div>
//         )}

//         <form ref={form} onSubmit={sendEmail} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-white text-sm mb-2"
//               >
//                 First name
//               </label>
//               <input
//                 name="user_name"
//                 id="firstName"
//                 type="text"
//                 required
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-white text-sm mb-2"
//               >
//                 Last name
//               </label>
//               <input
//                 name="username"
//                 id="lastName"
//                 type="text"
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="companyName"
//               className="block text-white text-sm mb-2"
//             >
//               Company name (optional)
//             </label>
//             <input
//               name="company_name"
//               id="companyName"
//               type="text"
//               className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="workEmail"
//                 className="block text-white text-sm mb-2"
//               >
//                 Work email
//               </label>
//               <input
//                 name="user_email"
//                 id="workEmail"
//                 type="email"
//                 required
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="phoneNumber"
//                 className="block text-white text-sm mb-2"
//               >
//                 Phone number
//               </label>
//               <input
//                 name="phone_number"
//                 id="phoneNumber"
//                 type="tel"
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="projectDescription"
//               className="block text-white text-sm mb-2"
//             >
//               Tell us about your project (optional)
//             </label>
//             <textarea
//               name="message"
//               id="projectDescription"
//               rows={3}
//               className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white resize-none"
//             ></textarea>
//           </div>
//           <div className="md:flex gap-7 md:pb-5 items-center">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-white text-[#5D3FD3] py-3 rounded-md font-semibold md:mb-0 mb-4 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? "Sending..." : "Send request"}
//             </button>
//             <p className="text-white/70 text-sm text-center">
//               By sending this form, I confirm that I have read and accepted the{" "}
//               <a href="#" className="underline">
//                 Privacy Policy
//               </a>
//               .
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// import { useRef } from "react";
// import emailjs from "@emailjs/browser";

// export default function ContactForm() {
//   const form = useRef<HTMLFormElement>(null);

//   const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     emailjs
//       .sendForm("service_kzv0xp9", "template_2m809av", form.current!, {
//         publicKey: "TNqEZSn8KabiXckMt",
//       })
//       .then(
//         () => {
//           console.log("SUCCESS!");
//         },
//         (error) => {
//           console.log("FAILED...", error.text);
//         }
//       );
//   };

//   return (
//     <div id="contact">
//       <div className="bg-[#4C12BF] p-8 rounded-3xl max-w-2xl mx-auto">
//         <h1 className="text-4xl font-bold text-white mb-8 font-Inter">
//           Let's build something great together.
//         </h1>
//         <form ref={form} onSubmit={sendEmail} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="firstName"
//                 className="block text-white text-sm mb-2"
//               >
//                 First name
//               </label>
//               <input
//                 name="user_name"
//                 id="firstName"
//                 type="text"
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="lastName"
//                 className="block text-white text-sm mb-2"
//               >
//                 Last name
//               </label>
//               <input
//                 name="username"
//                 id="lastName"
//                 type="text"
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="companyName"
//               className="block text-white text-sm mb-2"
//             >
//               Company name (optional)
//             </label>
//             <input
//               id="companyName"
//               type="text"
//               className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="workEmail"
//                 className="block text-white text-sm mb-2"
//               >
//                 Work email
//               </label>
//               <input
//                 name="user_email"
//                 id="workEmail"
//                 type="email"
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="phoneNumber"
//                 className="block text-white text-sm mb-2"
//               >
//                 Phone number
//               </label>
//               <input
//                 id="phoneNumber"
//                 type="tel"
//                 className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
//               />
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="projectDescription"
//               className="block text-white text-sm mb-2"
//             >
//               Tell us about your project (optional)
//             </label>
//             <textarea
//               name="message"
//               id="projectDescription"
//               rows={3}
//               className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white resize-none"
//             ></textarea>
//           </div>
//           <div className="md:flex gap-7 md:pb-5 items-center">
//             <button
//               value="Send"
//               type="submit"
//               className="w-full bg-white text-[#5D3FD3] py-3 rounded-md font-semibold md:mb-0 mb-4 hover:bg-white/90 transition-colors"
//             >
//               Send request
//             </button>
//             <p className="text-white/70 text-sm text-center">
//               By sending this form, I confirm that I have read and accepted the{" "}
//               <a href="#" className="underline">
//                 Privacy Policy
//               </a>
//               .
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
