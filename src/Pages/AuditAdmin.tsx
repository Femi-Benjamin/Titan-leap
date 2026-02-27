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
  {
    id: "demo-3",
    created_at: "2026-02-23T16:45:00.000Z",
    business_name: "Glow Skin Clinic",
    website: "https://glowskin.example.com",
    industry: "Beauty",
    main_product: "Skin treatment packages",
    target_customer: "Women 24-45",
    instagram_link: "https://instagram.com/glowskinclinic",
    facebook_link: "https://facebook.com/glowskinclinic",
    tiktok_link: "https://tiktok.com/@glowskinclinic",
    twitter_link: "https://x.com/glowskinclinic",
    funnel_page_link: "https://glowskin.example.com/book-now",
    booking_link: "https://glowskin.example.com/consultation",
    lead_destination: "CRM + WhatsApp",
    contact_method: "Instagram DM + Phone",
    response_time: "Within 1 hour",
    closing_method: "Consultation + invoice link",
    revenue_goal: "$65,000/month",
    bottleneck: "Low conversion from DMs to bookings",
  },
];

const AUTH_SESSION_KEY = "audit_admin_logged_in";
const defaultAdminUsername =
  import.meta.env.VITE_AUDIT_ADMIN_USERNAME ?? "admin";
const defaultAdminPassword =
  import.meta.env.VITE_AUDIT_ADMIN_PASSWORD ?? "titan123";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      username.trim() === defaultAdminUsername &&
      password === defaultAdminPassword
    ) {
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginError(null);
      return;
    }
    setLoginError("Invalid login details.");
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setLoginError(null);
    setSubmissions([]);
    setErrorMessage(null);
  };

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
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    void fetchAudits();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Topbar />
        <section className="min-h-screen bg-[#1a0b3c] text-white pt-32 pb-16">
          <div className="max-w-md mx-auto px-4 md:px-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
              <p className="text-white/70 mb-6">
                Sign in to access Audit Admin.
              </p>
              <form className="space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:border-[#FFD646]"
                    placeholder="Enter username"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/80 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white outline-none focus:border-[#FFD646]"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-red-200">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#FFD646] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

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
            <div className="flex gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => void fetchAudits()}
                className="bg-[#FFD646] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors w-full md:w-auto"
              >
                Refresh Data
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-white/10 border border-white/20 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors w-full md:w-auto"
              >
                Logout
              </button>
            </div>
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
