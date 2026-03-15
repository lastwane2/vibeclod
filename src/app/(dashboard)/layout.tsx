import { SessionProvider } from "next-auth/react";
import { TopBar } from "@/components/layout/TopBar";
import { PixelBackground } from "@/components/ui/PixelBackground";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <PixelBackground />
      <TopBar />
      <main className="relative">{children}</main>
    </SessionProvider>
  );
}
