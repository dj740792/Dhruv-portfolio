import "./styles/index.css";
import "lenis/dist/lenis.css";
import {  Poppins, Caveat } from "next/font/google";
import LenisProvider from "@/_components/ui/LenisProvider";
import Navbar from "@/_components/ui/Navbar";
import Footer from "@/_components/home/Footer";

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
  metadataBase: new URL("https://dhruv-portfolio-lac.vercel.app"),

  title: {
    default: "Dhruv Jha",
    template: "%s — Dhruv Jha",
  },

  description:
    "Portfolio of Dhruv Jha, a frontend developer building clean, responsive, and interactive web experiences.",

  keywords: [
    "Dhruv Jha",
    "Frontend Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "Portfolio",
    "Design Engineer",
    "Web Designer"
  ],

  authors: [{ name: "Dhruv Jha" }],
  creator: "Dhruv Jha",

  openGraph: {
    title: "Dhruv Jha — Frontend Developer",
    description:
      "Portfolio of Dhruv Jha, a frontend developer building clean, responsive, and interactive web experiences.",
    url: "https://dhruv-portfolio-lac.vercel.app",
    siteName: "Dhruv Jha",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dhruv Jha — Frontend Developer",
    description:
      "Portfolio of Dhruv Jha, a frontend developer building clean, responsive, and interactive web experiences.",
  },

  robots: {
    index: true,
    follow: true,
  },
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
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
