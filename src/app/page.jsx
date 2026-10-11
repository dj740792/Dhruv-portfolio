import Hero from "@/_components/home/Hero"
import Navbar from "@/_components/ui/Navbar"

export default function page() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <main>
        <Hero />
      </main>
       <Navbar />
    </div>
  )
}
