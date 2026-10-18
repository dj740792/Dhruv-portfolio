import Footer from "@/_components/home/Footer";
import Hero from "@/_components/home/Hero";
import TechStack from "@/_components/home/TechStack";
import Works from "@/_components/home/Works";
import Navbar from "@/_components/ui/Navbar";

export default function page() {
  return (
    <div className="flex justify-center items-center">
      {/* <Navbar /> */}
      <main className="w-full">
        <Hero />
        <Works />
     <Footer />
      </main>
      
    </div>
  );
}
