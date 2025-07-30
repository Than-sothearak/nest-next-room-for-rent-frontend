import { auth } from "@/auth";
const AdminPage = async ({ children }) => {
   const session = await auth();
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }

  {
    if (session?.user?.isAdmin) {
      return (
        <>
            <div>{children}</div>
        
        </>
      );
    }
  }
};

export default AdminPage;
