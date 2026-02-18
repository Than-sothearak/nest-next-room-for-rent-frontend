import LastTransactionComponent from "@/components/LastTransactionsComponent";
import { mongoDb } from "@/utils/connectDB";
const LastTransitionPage = async () => {
  await mongoDb()
  const session = true
  {
    if (!session) {
      return <div>Please log in to access the dashboard.</div>;
    }
  }

      return (
        <>
        
        </>
      );
    }


export default LastTransitionPage;
