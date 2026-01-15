
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Globe, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

type Language = 'ar' | 'en'

const brandIdentityImages = [
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386869/1_rja7at.png',
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386858/2_kjmj0i.png',
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386837/3_zoho3g.png',
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386868/4_cgchuq.png',
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386848/5_yp0ja4.png',
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386850/6_ygmfta.png',
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386851/7_lc3eiz.png',
  'https://res.cloudinary.com/dsstn0i8a/image/upload/v1768386847/8_uvqrig.png',
]

const translations = {
  ar: {
    heroTitle: 'الهوية البصرية',
    heroSubtitle: 'حضور رقمي ينبض بالتميز والاحترافية',
    presenceTitle: 'الحضور الرقمي المؤثر',
    presenceDesc: 'نحن نؤمن أن الهوية البصرية ليست مجرد شعار، بل هي قصة تُروى، تجربة تُعاش، وانطباع يدوم. نحول رؤيتك إلى علامة تجارية لا تُنسى.',
    colorTitle: 'فلسفة الألوان',
    colorDesc: 'اخترنا الألوان بعناية لتعكس الفخامة والثقة والاحترافية. الأسود العميق يمنح القوة، والذهبي يضيف لمسة من الأصالة والتميز، مع الحفاظ على التوازن المثالي.',
    geometryTitle: 'الهندسة والتجريد',
    geometryDesc: 'استوحينا عناصر التصميم من شعارنا: جناح الخفاش يمثل القوة والفرادة، رأس القلم يرمز للدقة والحرفية، والحافة المستديرة تعكس الاحترافية المتناهية.',
    personalityTitle: 'شخصية العلامة',
    personalityDesc: 'استراتيجية، هادئة، فاخرة، ومؤثرة. نحن نبني علامات تجارية لا تلفت الأنظار فحسب، بل تكسب الثقة وتخلق علاقات طويلة الأمد مع الجمهور.',
    closingTitle: 'تميز يُلاحظ من اللحظة الأولى',
    closingDesc: 'كل تصميم نقوم به، هو انعكاس لهوية علامتك التجارية. نلتزم بالجودة، الإبداع، والتميز في كل تفصيل صغير.',
    brandNav: 'الرئيسية'
  },
  en: {
    heroTitle: 'Brand Identity',
    heroSubtitle: 'A Digital Presence Pulsating with Excellence',
    presenceTitle: 'Impactful Digital Presence',
    presenceDesc: 'We believe visual identity is not just a logo, it\'s a story told, an experience lived, and an impression that lasts. We transform your vision into an unforgettable brand.',
    colorTitle: 'Color Philosophy',
    colorDesc: 'We carefully selected colors to reflect luxury, trust, and professionalism. Deep black conveys strength, while gold adds authenticity and distinction, maintaining perfect balance.',
    geometryTitle: 'Geometry & Abstraction',
    geometryDesc: 'We derived design elements from our logo: the bat wing representing strength and uniqueness, the pen nib symbolizing precision and craftsmanship, and rounded edges reflecting utmost professionalism.',
    personalityTitle: 'Brand Personality',
    personalityDesc: 'Strategic, calm, premium, and impactful. We build brands that not only capture attention but earn trust and create lasting relationships with audiences.',
    closingTitle: 'Distinction Noticed From First Glance',
    closingDesc: 'Every design we create reflects your brand\'s identity. We commit to quality, creativity, and excellence in every small detail.',
    brandNav: 'Home'
  }
}

export default function BrandIdentity() {
  const [language, setLanguage] = useState<Language>('ar')
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const t = translations[language]
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar')
    toast({
      title: language === 'ar' ? 'Language changed to English' : 'تم تغيير اللغة إلى العربية',
      duration: 2000,
    })
  }

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  if (!mounted) return null

  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Toaster />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/30"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Pico Media
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.brandNav}
            </a>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300"
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'EN' : 'العربية'}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header
        style={{ opacity: heroOpacity }}
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary text-glow mb-6"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto"
          >
            {t.heroSubtitle}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Digital Presence Section */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow mb-4">
              {t.presenceTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.presenceDesc}
            </p>
          </motion.div>

          {/* Image 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <Image
              src={brandIdentityImages[0]}
              alt="Brand Identity 1"
              width={1200}
              height={800}
              className="w-full rounded-2xl shadow-2xl shadow-primary/10"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Color Philosophy Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow mb-6">
                {t.colorTitle}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.colorDesc}
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={brandIdentityImages[1]}
                alt="Color Philosophy"
                width={1200}
                height={800}
                className="w-full rounded-2xl shadow-2xl shadow-primary/10"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={brandIdentityImages[2]}
              alt="Brand Identity 3"
              width={1200}
              height={800}
              className="w-full rounded-2xl shadow-2xl shadow-primary/10"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Geometry Section */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow mb-6 text-center">
              {t.geometryTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
              {t.geometryDesc}
            </p>
          </motion.div>

          {/* Images 3 & 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[brandIdentityImages[3], brandIdentityImages[4]].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Image
                  src={img}
                  alt={`Geometry ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full rounded-2xl shadow-2xl shadow-primary/10"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {/* Image 5 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={brandIdentityImages[5]}
              alt="Brand Identity 6"
              width={1200}
              height={800}
              className="w-full rounded-2xl shadow-2xl shadow-primary/10"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Brand Personality Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow mb-6">
              {t.personalityTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.personalityDesc}
            </p>
          </motion.div>

          {/* Images 6 & 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[brandIdentityImages[6], brandIdentityImages[7]].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
              >
                <Image
                  src={img}
                  alt={`Personality ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full rounded-2xl shadow-2xl shadow-primary/10"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
              {t.closingTitle}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t.closingDesc}
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-primary text-background px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300"
            >
              {t.brandNav}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 border-t border-border/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Pico Media. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
