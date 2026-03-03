import { motion, type Variants } from "framer-motion";
import Topbar from "../Layouts/Topbar";
import Footer from "../Layouts/Footer";
import MovingOrbs from "../Components/MovingOrbs";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 * index,
      duration: 0.45,
      ease: "easeOut" as const,
    },
  }),
};

const PrivacyPolicy = () => {
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#160043] text-white relative overflow-hidden">
      <MovingOrbs count={10} />

      <Topbar />

      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 mb-8"
        >
          <p className="uppercase tracking-[0.2em] text-xs text-[#FED65E] mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/85">TitanLeap Marketing Agency</p>
          <p className="text-white/70 mt-1">Effective Date: {effectiveDate}</p>
        </motion.div>

        <motion.article initial="hidden" animate="visible" className="space-y-5 text-white/85 leading-7">
          <motion.section
            custom={1}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <p>
              Welcome to TitanLeap Marketing Agency ("TitanLeap", "we", "our",
              or "us"). This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website:{" "}
              <a
                href="https://titanleap.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FED65E] hover:underline"
              >
                https://titanleap.co
              </a>
              .
            </p>
            <p className="mt-3">
              By accessing or using our website or services, you agree to the
              practices described in this Privacy Policy.
            </p>
          </motion.section>

          <motion.section
            custom={2}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-2">
              We may collect personal and non-personal information, including:
            </p>
            <p className="font-semibold text-white mb-2">Personal Information</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company or business information</li>
              <li>Billing and payment details</li>
              <li>Project or marketing data shared by clients</li>
            </ul>
            <p className="font-semibold text-white mt-4 mb-2">
              Automatically Collected Information
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referral sources</li>
            </ul>
            <p className="mt-3">
              This information helps us improve website performance and user
              experience.
            </p>
          </motion.section>

          <motion.section
            custom={3}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-2">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide marketing and consulting services</li>
              <li>Respond to inquiries and support requests</li>
              <li>Manage client relationships</li>
              <li>Process payments and transactions</li>
              <li>Improve website functionality</li>
              <li>Deliver marketing communications</li>
              <li>Analyze performance and usage trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </motion.section>

          <motion.section
            custom={4}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="mb-2">
              TitanLeap uses cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Understand user behavior</li>
              <li>Optimize website performance</li>
              <li>Measure advertising effectiveness</li>
              <li>Personalize user experience</li>
            </ul>
            <p className="mt-3 mb-2">Cookies may be placed through services such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Google Analytics</li>
              <li>Meta Ads and Meta Pixel</li>
              <li>Other advertising and analytics platforms</li>
            </ul>
            <p className="mt-3">
              You may disable cookies through your browser settings, but some
              website features may not function properly.
            </p>
          </motion.section>

          <motion.section
            custom={5}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              4. Third-Party Services
            </h2>
            <p className="mb-2">
              We may use trusted third-party providers to operate our business,
              including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Google Analytics</li>
              <li>Meta Ads tools</li>
              <li>Payment processors</li>
              <li>CRM and automation platforms</li>
              <li>Email marketing tools</li>
              <li>Cloud hosting providers</li>
            </ul>
            <p className="mt-3">
              These providers only access data necessary to perform their
              services and are expected to maintain confidentiality and security.
            </p>
          </motion.section>

          <motion.section
            custom={6}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              5. Data Protection and Security
            </h2>
            <p className="mb-2">
              We implement appropriate technical and organizational measures to
              protect your information, including:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Secure hosting environments</li>
              <li>Access controls and permission management</li>
              <li>Encryption practices where appropriate</li>
              <li>Internal data protection procedures</li>
            </ul>
            <p className="mt-3">
              While we strive to protect your information, no online
              transmission or storage method is 100% secure.
            </p>
          </motion.section>

          <motion.section
            custom={7}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              6. Client Data Confidentiality
            </h2>
            <p className="mb-2">
              TitanLeap treats all client materials, campaign data, and
              business information as confidential.
            </p>
            <p className="mb-2">
              We do not sell, rent, or disclose client marketing data except:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>When required to deliver contracted services</li>
              <li>When legally required</li>
              <li>With explicit client authorization</li>
            </ul>
          </motion.section>

          <motion.section
            custom={8}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              7. Marketing Communications
            </h2>
            <p className="mb-2">
              By submitting information through our website, you may receive:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Service updates</li>
              <li>Marketing insights</li>
              <li>Promotional communications</li>
              <li>Business announcements</li>
            </ul>
            <p className="mt-3">
              You may unsubscribe at any time using the opt-out link in our
              communications or by contacting us directly.
            </p>
          </motion.section>

          <motion.section
            custom={9}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              8. User Rights
            </h2>
            <p className="mb-2">
              Depending on your jurisdiction, you may have rights to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of personal data</li>
              <li>Restrict or object to certain processing</li>
              <li>Withdraw consent where processing is consent-based</li>
              <li>Request a copy of your data (data portability)</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us using the details at the end
              of this policy.
            </p>
          </motion.section>

          <motion.section
            custom={10}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              9. GDPR and International Compliance
            </h2>
            <p>
              TitanLeap works with clients globally. Where applicable, we
              process personal data in line with relevant privacy and data
              protection laws, including GDPR principles for users in the
              European Economic Area, the United Kingdom, and other regions
              with similar legal requirements.
            </p>
          </motion.section>

          <motion.section
            custom={11}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              10. Data Retention
            </h2>
            <p className="mb-2">
              We retain personal information only for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide services</li>
              <li>Fulfill contractual obligations</li>
              <li>Meet legal and regulatory requirements</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p className="mt-3">
              Information that is no longer needed is securely deleted or
              anonymized where appropriate.
            </p>
          </motion.section>

          <motion.section
            custom={12}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              11. Children&apos;s Information
            </h2>
            <p>
              TitanLeap services are not directed to children under 13. We do
              not knowingly collect personal information from children. If such
              data is identified, we will delete it promptly.
            </p>
          </motion.section>

          <motion.section
            custom={13}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              12. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be posted on this page with a revised effective date. Continued
              use of our website after updates indicates acceptance of the
              revised policy.
            </p>
          </motion.section>

          <motion.section
            custom={14}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              13. Contact Information
            </h2>
            <p>TitanLeap Marketing Agency</p>
            <p>
              Website:{" "}
              <a
                href="https://titanleap.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FED65E] hover:underline"
              >
                https://titanleap.co
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:info@titanleap.co"
                className="text-[#FED65E] hover:underline"
              >
                info@titanleap.co
              </a>
            </p>
          </motion.section>
        </motion.article>
      </motion.main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
