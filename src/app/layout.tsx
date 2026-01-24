import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boss Pays More",
  description: "Boss Pays More Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
