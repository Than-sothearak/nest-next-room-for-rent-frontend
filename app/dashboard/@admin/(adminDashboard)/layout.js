import React from "react";

const AdminPageLayout = async ({ children, analysis, lastTransition, incomeChart }) => {
  return (
    <div className="">
      <div>{analysis}</div>
       <div>{incomeChart}</div>
      <div>{lastTransition}</div>
         {children}
    </div>
  );
};

export default AdminPageLayout;
