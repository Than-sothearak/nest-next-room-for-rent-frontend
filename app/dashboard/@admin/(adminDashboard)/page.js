import { auth } from "@/auth";
const AdminDashboardPage = async () => {
  const session = true
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }

  return <>
 </>;
};

export default AdminDashboardPage;
