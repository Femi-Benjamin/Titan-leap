// import Topbar from "../Layouts/Topbar";
// import Videohero from "../Layouts/Videohero";
// import Expertise from "../Components/Expertise";

// const Intro = () => {
//   return (
//     <div>
//       <Topbar />
//       <Videohero />
//       <Expertise />
//     </div>
//   );
// };

// export default Intro;

import { useState } from "react";
import Topbar from "../Layouts/Topbar";
import Videohero from "../Layouts/Videohero";
import Expertise from "../Components/Expertise";
import AuditModal from "../Components/AuditModal"; // or wherever your modal is

const Intro = () => {
  const [showAuditModal, setShowAuditModal] = useState(false);

  return (
    <div>
      <Topbar />
      <Videohero onOpenAudit={() => setShowAuditModal(true)} />
      <Expertise />

      <AuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
      />
    </div>
  );
};

export default Intro;
