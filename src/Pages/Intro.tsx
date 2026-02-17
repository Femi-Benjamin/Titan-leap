import { useState, lazy, Suspense } from "react";
import Topbar from "../Layouts/Topbar";
import Videohero from "../Layouts/Videohero";

const Expertise = lazy(() => import("../Components/Expertise"));
const AuditModal = lazy(() => import("../Components/AuditModal"));

const Intro = () => {
  const [showAuditModal, setShowAuditModal] = useState(false);

  return (
    <div>
      <Topbar />
      <Videohero onOpenAudit={() => setShowAuditModal(true)} />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Expertise />
      </Suspense>

      <Suspense fallback={null}>
        <AuditModal
          isOpen={showAuditModal}
          onClose={() => setShowAuditModal(false)}
        />
      </Suspense>
    </div>
  );
};

export default Intro;
