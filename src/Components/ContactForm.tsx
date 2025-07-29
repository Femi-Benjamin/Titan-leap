export default function ContactForm() {
  return (
    <div id="contact">
      <div className="bg-[#4C12BF] p-8 rounded-3xl max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">
          Let's build something great together.
        </h1>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-white text-sm mb-2"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
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
                id="lastName"
                type="text"
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
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
              id="companyName"
              type="text"
              className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
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
                id="workEmail"
                type="email"
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
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
                id="phoneNumber"
                type="tel"
                className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white"
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
              id="projectDescription"
              rows={3}
              className="w-full bg-transparent border-b border-white/30 px-0 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white resize-none"
            ></textarea>
          </div>
          <div className="md:flex gap-7 md:pb-5 items-center">
            <button
              type="submit"
              className="w-full bg-white text-[#5D3FD3] py-3 rounded-md font-semibold md:mb-0 mb-4 hover:bg-white/90 transition-colors"
            >
              Send request
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
