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

        key.status = { $in: ["pending", "cancelled", "accepted"] };

        if (sortKey) {
            key = { status: sortKey };

            if (sortKey === "completed") {
                key.status = { $in: ["completed", "marked as read"] };
            }

            if (sortKey === "processing") {
                key = { status: "accepted" };

            }

        }

        if (sortDate === "date") {
            sort = { startDate: sortDirection === "descending" ? -1 : 1 };
        }
        if (sortKey === "price") {
            sort = { totalAmount: sortDirection === "descending" ? -1 : 1 };
        }
        if (sortKey === "status") {
            sort = { paymentStatus: sortDirection === "descending" ? -1 : 1 };
        }

        // if (query) {
        //   const services = await Service.find({
        //     $or: [
        //       {
        //         serviceType: { $regex: query, $options: "i" },
        //         status: { $regex: query, $options: "i" },
        //       },
        //     ],
        //   });
        //   const count = Service.length;
        //   return { services, count };
        // }

        const count = await Payment.countDocuments(key);
        const [pending, accepted, completed] = await Promise.all([
            Payment.countDocuments({ status: "pending" }),
            Payment.countDocuments({ status: "accepted" }),
            Payment.countDocuments({ status: "completed" }),
        ]);

        const paymentCount = [
            {
                status: "pending",
                count: pending,
            },
            {
                status: "accepted",
                count: accepted,
            },
            {
                status: "completed",
                count: completed,
            },
        ];

        const payments = await Payment.find(key)
            .sort(sort)
            .populate("roomId")
            .populate("userId")
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (page - 1));

        console.log(payments)

        return { payments, count, paymentCount, ITEM_PER_PAGE };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch orders!");
    }
}