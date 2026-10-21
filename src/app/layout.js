import "./styles/index.css";
import "lenis/dist/lenis.css";
import {  Poppins, Caveat } from "next/font/google";
import LenisProvider from "@/_components/ui/LenisProvider";
import Navbar from "@/_components/ui/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  display:"swap"
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: "600",
  display:"swap"
});


export const metadata = {
  title: "Dhruv Jha",
  description: "Dhruv's personal corner on the web",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className={`${poppins.className}`}>
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
