import type { Metadata } from "next";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: {
    default: "Share Sport",
    template: "%s | Share Sport",
  },
  description: "Live scores, streaming, news, and highlights all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
