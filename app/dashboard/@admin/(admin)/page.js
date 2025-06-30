import { auth } from "@/auth";
const AdminDashboardPage = async () => {
  const session = await auth();
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }

  return <>
 </>;
};

export default AdminDashboardPage;
