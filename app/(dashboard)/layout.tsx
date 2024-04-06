import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard you can explore everything",
};
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body>{children}</body>;
}
