import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <nav className='container mx-auto mt-10'>
          <div className='flex text-4xl border-b-4 border-black  pb-2'>
            <Image
              src={"/images/meji-logo.webp"}
              height={120}
              width={120}
              alt='logo'
            />
            <div className='text-4xl flex justify-center items-center ml-6'>
              <h2 className='text-black font-semibold'>codingskills</h2>
              <h2 className='text-blue-500 ml-2 font-semibold'>PLAY</h2>
            </div>
          </div>
        </nav>
        <main className='container mx-auto py-10'>{children}</main>
      </body>
    </html>
  );
}
