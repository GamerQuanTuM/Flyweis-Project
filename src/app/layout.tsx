import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flyweis",
  description: "Flyweis Ecommerce Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        <main className="flex h-screen w-screen">
          <aside className="w-[20%] overflow-y-auto">
            <Sidebar />
          </aside>
          <div className="flex-1 flex flex-col h-full w-full">
            <nav className="h-[15%]">
              <Navbar />
            </nav>
            <section className="flex-1 overflow-y-auto">{children}</section>
          </div>
        </main>
      </body>
    </html>
  );
}
