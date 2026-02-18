"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getUsers(query, page, limit) {
  try {
      const session = await getServerSession(authOptions)
      if (!session?.accessToken) {
        throw new Error("Access denied!");
      }
  
    const numPage = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    let url = `http://localhost:3000/users?page=${numPage}&limit=${limitNum}`;

    if (query) {
      url = `http://localhost:3000/users?query=${query}&page=${numPage}&limit=${limitNum}`;
    }

    const res = await fetch(url, {
      method: "GET", // or 'POST' depending on your API
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`, // ✅ put it here
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const getData = await res.json();
    const users = getData.data;
    const totalItems = getData.meta.totalItems;
    const ITEAM_PER_PAGE = getData.meta.itemsPerPage;
    const countPage = getData.meta.totalPages || 1;

    return { users, totalItems, ITEAM_PER_PAGE, countPage };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch users!");
  }
}
