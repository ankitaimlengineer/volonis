import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import PayPalProvider from '@/components/PayPalProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VOLONIS — Enterprise AI & Software Infrastructure',
  description:
    'VOLONIS builds scalable AI, cloud, and custom software ecosystems for global enterprises. AI automation, SaaS platforms, cloud architecture and cybersecurity.',
  generator: 'v0.app',
  keywords: [
    'enterprise AI',
    'AI automation',
    'custom software development',
    'SaaS platforms',
    'cloud architecture',
    'cybersecurity',
    'VOLONIS',
  ],
  openGraph: {
    title: 'VOLONIS — Enterprise AI & Software Infrastructure',
    description:
      'Scalable AI, cloud, and custom software ecosystems for global enterprises.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/fav_logo.png',
        type: 'image/png',
      },
    ],
    apple: '/fav_logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B0F19',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`bg-background ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased">
        <PayPalProvider>
          {children}
        </PayPalProvider>
        
        {process.env.NODE_ENV === 'production' && <Analytics />}
        
        {/* Razorpay Checkout Script */}
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js" 
          strategy="lazyOnload" 
        />

        {/* --- Google Translate Hidden Element & Scripts --- */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <Script 
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="lazyOnload"
        />
        <Script id="google-translate-init" strategy="lazyOnload">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,gu',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  )
}