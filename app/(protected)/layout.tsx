import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "@/components/navigation/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main>
        <Navbar />
        <section className="mt-20">{children}</section>
      </main>
    </SessionProvider>
  );
}
