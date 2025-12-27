import { getRoom } from "@/actions/rooms";
import AnalysisGrid from "@/components/AnalysisGrid";
import { Booking } from "@/models/Booking";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
import { mongoDb } from "@/utils/connectDB";
import { serializeDoc } from "@/utils/serializeDoc";
const AnalysisPage = async () => {
  
    
      return (
        <>
        AnalysisGrid
        </>
      );
    }

export default AnalysisPage;
