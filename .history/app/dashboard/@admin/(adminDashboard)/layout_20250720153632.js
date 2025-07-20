import CreatePaymentLinkForm from "@/components/CreatePaymentLinkForm";
import PayWayModal from "@/components/PayWayModal";
import React from "react";

const AdminPageLayout = async ({ children, analysis, lastTransition, incomeChart }) => {
  return (
    <div className="">
       <div className="grid grid-cols-2 gap-4">
        <div>{analysis}</div>
       <div>{incomeChart}</div>
       </div>
       <div>{lastTransition}</div>
         {children}
    </div>
  );
};

export default AdminPageLayout;
