import CreatePaymentLinkForm from "@/components/CreatePaymentLinkForm";
import PayWayModal from "@/components/PayWayModal";
import React from "react";

const AdminPageLayout = async ({ children, analysis, lastTransition, incomeChart }) => {
  return (
    <div className="flex">
       <div>{analysis}</div>
       <div>{incomeChart}</div>
       <div>{lastTransition}</div>
         {children}
    </div>
  );
};

export default AdminPageLayout;
