"use server";
import { auth } from "@/auth";
import { Payment } from "@/models/Payment";
import { mongoDb } from "@/utils/connectDB";
await mongoDb();
export async function getPayments(query, page, sortKey, sortDate, sortDirection,) {
    const session = await auth();
    if (!session?.user?.isAdmin) {
        return console.log("Access denied!");
    }

    try {
        const ITEM_PER_PAGE = 20;
        let sort = { createdAt: -1 }
        let key = {};

        // key.status = { $in: ["pending", "cancelled", "accepted"] };

        // if (sortKey) {
        //     key = { status: sortKey };

        //     if (sortKey === "completed") {
        //         key.status = { $in: ["completed", "marked as read"] };
        //     }

        //     if (sortKey === "processing") {
        //         key = { status: "accepted" };

        //     }

        // }

        // if (sortDate === "date") {
        //     sort = { startDate: sortDirection === "descending" ? -1 : 1 };
        // }
        // if (sortKey === "price") {
        //     sort = { totalAmount: sortDirection === "descending" ? -1 : 1 };
        // }
        // if (sortKey === "status") {
        //     sort = { paymentStatus: sortDirection === "descending" ? -1 : 1 };
        // }

        if (query) {
            const payments = await Payment.find({
                $or: [
                    {
                        serviceType: { $regex: query, $options: "i" },
                        status: { $regex: query, $options: "i" },
                    },
                ],
            }).sort(sort)
                .populate("roomId")
                .populate("userId")
                .populate("bookingId");
            const count = payments.length;
            return { payments, count };
        }


        const payments = await Payment.find(key)
            .sort(sort)
            .populate("roomId")
            .populate("userId")
            .populate("bookingId")
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));

        console.log(payments)

        return { payments, count, ITEM_PER_PAGE };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch payments!");
    }
}