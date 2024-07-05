// src/pages/protected.js
"use client";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  console.log({ user });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div>Protected content for logged-in users</div>;
};

export default ProtectedPage;
