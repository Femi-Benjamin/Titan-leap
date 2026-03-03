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

const TermsAndConditions = () => {
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#120033] text-white relative overflow-hidden">
      <MovingOrbs count={11} />

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
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Terms & Conditions
          </h1>
          <p className="text-white/85">TitanLeap Marketing Agency</p>
          <p className="text-white/70 mt-1">Effective Date: {effectiveDate}</p>
        </motion.div>

        <motion.article
          initial="hidden"
          animate="visible"
          className="space-y-5 text-white/85 leading-7"
        >
          <motion.section
            custom={1}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              These Terms and Conditions ("Terms") govern your use of{" "}
              <a
                href="https://titanleap.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FED65E] hover:underline"
              >
                https://titanleap.co
              </a>{" "}
              and any services provided by TitanLeap Marketing Agency
              ("TitanLeap", "we", "our", or "us"). By accessing our website or
              engaging our services, you agree to these Terms.
            </p>
          </motion.section>

          <motion.section
            custom={2}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              2. Services
            </h2>
            <p className="mb-2">
              TitanLeap provides marketing-related services, including but not
              limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Content creation</li>
              <li>Paid advertising management</li>
              <li>SEO services</li>
              <li>Automation systems and workflows</li>
              <li>Strategic consulting and growth advisory</li>
            </ul>
            <p className="mt-3">
              Service scope, timelines, and deliverables are defined in
              individual agreements, proposals, or statements of work.
            </p>
          </motion.section>

          <motion.section
            custom={3}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              3. Client Responsibilities
            </h2>
            <p className="mb-2">You agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Provide accurate information and required access credentials
              </li>
              <li>Respond promptly to requests for approvals and feedback</li>
              <li>
                Ensure you have legal rights to all content and data shared with
                us
              </li>
              <li>Comply with applicable advertising and industry regulations</li>
            </ul>
          </motion.section>

          <motion.section
            custom={4}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              4. Fees, Billing, and Payments
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Fees are set out in your contract, proposal, or invoice terms.
              </li>
              <li>Payments must be made on or before due dates.</li>
              <li>
                Late payments may result in service suspension, delays, or
                additional charges where permitted by law.
              </li>
              <li>
                Advertising spend and third-party platform costs are separate
                from agency fees unless explicitly stated otherwise.
              </li>
            </ul>
          </motion.section>

          <motion.section
            custom={5}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              5. Intellectual Property
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Pre-existing intellectual property remains owned by the original
                owner.
              </li>
              <li>
                Unless otherwise agreed in writing, deliverables are licensed or
                assigned according to your service agreement upon full payment.
              </li>
              <li>
                TitanLeap retains rights to internal methods, frameworks,
                templates, and tools used to produce services.
              </li>
            </ul>
          </motion.section>

          <motion.section
            custom={6}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              6. Confidentiality
            </h2>
            <p>
              Both parties agree to protect confidential information received in
              the course of the engagement and not disclose it to unauthorized
              third parties, except as required by law or with prior written
              consent.
            </p>
          </motion.section>

          <motion.section
            custom={7}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              7. Third-Party Platforms
            </h2>
            <p>
              Our services may involve third-party tools and platforms (for
              example Google, Meta, analytics providers, CRM systems, and
              payment processors). Use of those services is subject to their own
              terms and privacy policies. TitanLeap is not responsible for
              outages, policy changes, or actions by third-party providers.
            </p>
          </motion.section>

          <motion.section
            custom={8}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              8. Performance Disclaimer
            </h2>
            <p>
              Marketing outcomes depend on multiple factors outside our direct
              control. While we apply professional standards and best practices,
              we do not guarantee specific rankings, lead volumes, revenue
              levels, or return on ad spend unless explicitly guaranteed in a
              signed agreement.
            </p>
          </motion.section>

          <motion.section
            custom={9}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, TitanLeap is not liable
              for indirect, incidental, special, consequential, or punitive
              damages, including loss of profits or data. Our aggregate
              liability for any claim related to services is limited to the
              amount paid by the client for the specific services giving rise to
              the claim.
            </p>
          </motion.section>

          <motion.section
            custom={10}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              10. Termination
            </h2>
            <p className="mb-2">
              Either party may terminate services in accordance with the notice
              periods set out in the applicable agreement. Upon termination:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Outstanding payments become due immediately.</li>
              <li>
                Access to active campaign assets may be revoked after proper
                handover.
              </li>
              <li>
                Clauses that should survive termination (confidentiality,
                liability, payment obligations) remain in effect.
              </li>
            </ul>
          </motion.section>

          <motion.section
            custom={11}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              11. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms are governed by applicable laws based on the governing
              jurisdiction agreed in your service contract. Parties agree to
              first attempt good-faith resolution of disputes before pursuing
              formal legal remedies.
            </p>
          </motion.section>

          <motion.section
            custom={12}
            variants={sectionVariants}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-3">
              12. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. Revised terms will be
              posted on this page with an updated effective date. Continued use
              of our website or services after updates constitutes acceptance of
              the revised Terms.
            </p>
          </motion.section>

          <motion.section
            custom={13}
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

export default TermsAndConditions;
