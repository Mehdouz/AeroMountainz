import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import Formulas from '@/components/formulas'
import CloudBreak from '@/components/cloud-break'
import Journey from '@/components/journey'
import Pilot from '@/components/pilot'
import Gallery from '@/components/gallery'
import Reviews from '@/components/reviews'
import Faq from '@/components/faq'
import CtaSection from '@/components/cta-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-[#0a0c10] min-h-screen">
      <Navbar />
      <Hero />
      <Stats />

      <CloudBreak
        quote="Le silence, la lumière, le lac en contrebas. Une heure suspendue entre ciel et montagne."
        author="Une passagère, été 2024"
      />

      <Formulas />

      <CloudBreak
        quote="Au-dessus des nuages, le lac d'Annecy n'est plus qu'un miroir posé entre les Alpes."
      />

      <Journey />
      <Pilot />
      <Gallery />
      <Reviews />
      <Faq />
      <CtaSection />
      <Footer />
    </main>
  )
}
