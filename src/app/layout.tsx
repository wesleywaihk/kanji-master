import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "Kanji Master",
  description: "Sakura-themed JLPT kanji study hub."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
