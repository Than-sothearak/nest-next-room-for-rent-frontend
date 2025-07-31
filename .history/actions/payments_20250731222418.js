"use server";
import { auth } from "@/auth";
import { Invoice } from "@/models/Invoice";
import { Payment } from "@/models/Payment";
import { User } from "@/models/User";
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

        if (sortDate === "date") {
            sort = { paidAt: sortDirection === "descending" ? -1 : 1 };
        }
        // if (sortKey === "price") {
        //     sort = { totalAmount: sortDirection === "descending" ? -1 : 1 };
        // }
        // if (sortKey === "status") {
        //     sort = { paymentStatus: sortDirection === "descending" ? -1 : 1 };
        // }

        if (query) {
            const users = await User.find({
                $or: [
                    { username: { $regex: query, $options: "i" } },
                    { phone: { $regex: query, $options: "i" } },
                    { InvoiceId: { $regex: query, $options: "i" } },
                ],
            }).select("_id");

            const userIds = users.map((u) => u._id);

            const payments = await Payment.find({
                $or: [
                    // Search by userId if matching usernames found
                    {
                        userId: { $in: userIds },
                    },

                    {
                        status: { $regex: query, $options: "i" },
                    },
                ],
            })
                .sort(sort)
                .populate("roomId")
                .populate("userId")
                .populate("bookingId");

            const count = payments.length;

            return { payments, count, ITEM_PER_PAGE };
        }


        const payments = await Payment.find(key)
            .sort(sort)
            .populate("roomId")
            .populate("userId")
            .populate("bookingId")
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));


        const count = await Payment.countDocuments();

        return { payments, count, ITEM_PER_PAGE };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch payments!");
    }
}