import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <Link href="/dashboard">ダッシュボード</Link>
      <LoginForm/>
    </div>
  );
}
