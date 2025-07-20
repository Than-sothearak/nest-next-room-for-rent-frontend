import React from "react";

const AdminPageLayout = async ({ children, analysis, lastTransition, incomeChart }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
       <div>
        <div>{analysis}</div>
       <div>{incomeChart}</div>
       </div>
       <div>{lastTransition}</div>
         {children}
    </div>
  );
};

export default AdminPageLayout;
