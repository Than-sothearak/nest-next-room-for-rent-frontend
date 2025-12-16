"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function UserForm({ userId, userData }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: userData?.username || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    gender: userData?.gender || "male",
    status: userData?.status || "active",
    role: userData?.isAdmin ? "admin" : "user",
    dateOfBirth: userData?.dateOfBirth || "",
    address: userData?.address || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = userId ? `/api/users/${userId}` : "/api/users";
    const method = userId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Success!");
        router.refresh(); // refresh page
      } else {
        toast.error(data.message || "Failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : userId ? "Update User" : "Create User"}
      </button>
      <Toaster />
    </form>
  );
}
