import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { LogoMarquee } from '@/components/logo-marquee'
import { ServicesSection } from '@/components/services-section'
import { ProductsSection } from '@/components/products-section'
import { TechStackSection } from '@/components/tech-stack-section'
import { CostEstimator } from '@/components/cost-estimator'
import { CaseStudiesSection } from '@/components/case-studies-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { FaqSection } from '@/components/faq-section'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import VoiceBot from '@/components/VoiceBot'
// PaymentButton અહીંથી હટાવી દીધું છે

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <LogoMarquee />
        <ServicesSection />
        <ProductsSection />
        <TechStackSection />
        <CostEstimator />
        <CaseStudiesSection />
        <TestimonialsSection />
        <FaqSection />
        <AboutSection />
        <ContactSection />
        {/* Razorpay Test Payment Button કાઢી નાખ્યું છે */}
      </main>
      <SiteFooter />
      <VoiceBot />
    </div>
  )
}