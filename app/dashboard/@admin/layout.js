const AdminPage = async ({ children }) => {
  // {
  //   if (!session) {
  //     return <div>Please log in to access the dashboard.</div>;
  //   }
  // }

  {
    // if (session?.user?.isAdmin) {
      return (
        <>
            <div>{children}</div>
        
        </>
      );
    // }
  }
};

export default AdminPage;
