import { useEffect, useState } from "react";
import Footer from "../Layouts/Footer";
import Topbar from "../Layouts/Topbar";
import { supabase } from "../lib/supabase";

const fieldColumns = [
  { key: "business_name", label: "Business" },
  { key: "website", label: "Website" },
  { key: "industry", label: "Industry" },
  { key: "main_product", label: "Main Product/Service" },
  { key: "target_customer", label: "Target Customer" },
  { key: "instagram_link", label: "Instagram" },
  { key: "facebook_link", label: "Facebook" },
  { key: "tiktok_link", label: "TikTok" },
  { key: "twitter_link", label: "X (Twitter)" },
  { key: "funnel_page_link", label: "Funnel Page" },
  { key: "booking_link", label: "Booking Link" },
  { key: "lead_destination", label: "Lead Destination" },
  { key: "contact_method", label: "Contact Method" },
  { key: "response_time", label: "Response Time" },
  { key: "closing_method", label: "Closing Method" },
  { key: "revenue_goal", label: "Revenue Goal" },
  { key: "bottleneck", label: "Bottleneck" },
] as const;

type AuditField = (typeof fieldColumns)[number]["key"];

type AuditSubmission = {
  id?: number | string;
  created_at?: string;
} & Partial<Record<AuditField, string | null>>;

const demoSubmissions: AuditSubmission[] = [
  {
    id: "demo-1",
    created_at: "2026-02-25T14:30:00.000Z",
    business_name: "Titan Fitness Studio",
    website: "https://titanfitness.example.com",
    industry: "Fitness",
    main_product: "Online coaching program",
    target_customer: "Busy professionals 25-40",
    instagram_link: "https://instagram.com/titanfitness",
    facebook_link: "https://facebook.com/titanfitness",
    tiktok_link: "https://tiktok.com/@titanfitness",
    twitter_link: "https://x.com/titanfitness",
    funnel_page_link: "https://titanfitness.example.com/start",
    booking_link: "https://calendly.com/titanfitness/consult",
    lead_destination: "Email + CRM",
    contact_method: "WhatsApp + Email",
    response_time: "Within 2 hours",
    closing_method: "Discovery calls",
    revenue_goal: "$50,000/month",
    bottleneck: "Low lead-to-call booking rate",
  },
  {
    id: "demo-2",
    created_at: "2026-02-24T09:15:00.000Z",
    business_name: "Nova Dental Care",
    website: "https://novadental.example.com",
    industry: "Healthcare",
    main_product: "Cosmetic dental packages",
    target_customer: "Adults 28-55 in Lagos",
    instagram_link: "https://instagram.com/novadental",
    facebook_link: "https://facebook.com/novadental",
    tiktok_link: "https://tiktok.com/@novadental",
    twitter_link: "https://x.com/novadental",
    funnel_page_link: "https://novadental.example.com/smile",
    booking_link: "https://novadental.example.com/book",
    lead_destination: "WhatsApp",
    contact_method: "Phone calls",
    response_time: "Same day",
    closing_method: "In-clinic consultation",
    revenue_goal: "$80,000/month",
    bottleneck: "Inconsistent follow-up after inquiries",
  },
];

const formatValue = (value: string | null | undefined) => {
  const trimmedValue = value?.trim();
  return trimmedValue && trimmedValue.length > 0 ? trimmedValue : "-";
};

const formatDate = (value: string | undefined) => {
  if (!value) return "-";
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return value;
  return parsedDate.toLocaleString();
};

const AuditAdmin = () => {
  const [submissions, setSubmissions] = useState<AuditSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchAudits = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const { data, error } = await supabase
      .from("audit_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load audit submissions:", error);
      setErrorMessage(
        "Could not load audit submissions from Supabase. Showing demo data.",
      );
      setSubmissions(demoSubmissions);
    } else {
      const rows = (data ?? []) as AuditSubmission[];
      setSubmissions(rows.length > 0 ? rows : demoSubmissions);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void fetchAudits();
  }, []);

  return (
    <>
      <Topbar />
      <section className="min-h-screen bg-[#1a0b3c] text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">Audit Admin</h1>
              <p className="text-white/70 mt-2">
                Total submissions: {submissions.length}
              </p>
            </div>
            <button
              type="button"
              onClick={() => void fetchAudits()}
              className="bg-[#FFD646] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors w-full md:w-auto"
            >
              Refresh Data
            </button>
          </div>

          {isLoading && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              Loading submissions...
            </div>
          )}

          {!isLoading && errorMessage && (
            <div className="bg-red-500/10 border border-red-400/40 text-red-100 rounded-xl p-6">
              {errorMessage}
            </div>
          )}

          {!isLoading && submissions.length === 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              No audit submissions found.
            </div>
          )}

          {!isLoading && submissions.length > 0 && (
            <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-xl mt-5">
              <table className="min-w-[1500px] w-full text-sm">
                <thead>
                  <tr className="bg-white/10">
                    <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                      Submitted At
                    </th>
                    {fieldColumns.map((column) => (
                      <th
                        key={column.key}
                        className="text-left px-4 py-3 font-semibold whitespace-nowrap"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => {
                    const rowKey =
                      submission.id ?? submission.created_at ?? `row-${index}`;

                    return (
                      <tr
                        key={rowKey}
                        className="border-t border-white/10 align-top"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-white/80">
                          {formatDate(submission.created_at)}
                        </td>
                        {fieldColumns.map((column) => (
                          <td key={column.key} className="px-4 py-3">
                            {formatValue(submission[column.key])}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AuditAdmin;
