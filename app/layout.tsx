import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PicMe",
  description: "App that helps you pic the image you want",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex justify-center w-full`}>
        {/* Added the size restriction here given that it was intended as a mobile web app */}
        <div className="max-w-[400px] w-full overflow-hidden">{children}</div>
      </body>
    </html>
  );
}
