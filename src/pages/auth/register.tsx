"use client";

import RegisterForm from "@/components/auth/RegisterForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <RegisterForm />
      </div>
    </div>
  );
}
