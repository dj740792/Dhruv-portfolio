import Footer from "@/_components/home/Footer";
import Hero from "@/_components/home/Hero";
import Works from "@/_components/home/Works";

export default function page() {
  return (
    <div className="flex justify-center items-center">
      <main className="w-full">
        <Hero />
        <Works />
        <Footer />
      </main>
    </div>
  );
}
