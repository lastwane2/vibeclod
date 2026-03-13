import { SessionProvider } from "next-auth/react";
import { TopBar } from "@/components/layout/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <TopBar />
      <main>{children}</main>
    </SessionProvider>
  );
}
