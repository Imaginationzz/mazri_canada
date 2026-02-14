import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Providers } from "@/providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mazri Canada - Publishing House",
  description: "Mazri Canada Publishing House - Bringing stories to life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
