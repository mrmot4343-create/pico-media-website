'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronLeft, ChevronRight, Globe, X, PenTool, TrendingUp, Code, Shield, ArrowUpRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

// Custom SVG Components for Stats - Pico Media Identity Inspired
const ExperienceIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Circular path representing continuity and growth */}
    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
    <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" className="opacity-50" />
    
    {/* Bat-wing inspired angular arc */}
    <path d="M40 12 Q52 16 58 28 Q52 24 40 20 Q28 24 22 28 Q28 16 40 12" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Pen nib sharp accent */}
    <path d="M40 32 L36 42 L40 38 L44 42 Z" 
          fill="currentColor" />
    
    {/* Connecting dots representing progress */}
    <circle cx="40" cy="48" r="2" fill="currentColor" className="opacity-80" />
    <circle cx="40" cy="56" r="2" fill="currentColor" className="opacity-60" />
    <circle cx="40" cy="64" r="2" fill="currentColor" className="opacity-40" />
  </svg>
)

const ProjectsIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Layered overlapping shapes representing multiple projects */}
    {/* Bottom layer */}
    <rect x="14" y="24" width="28" height="36" rx="4" 
          stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
    
    {/* Middle layer */}
    <rect x="26" y="18" width="28" height="36" rx="4" 
          stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
    
    {/* Top layer - sharp pen-inspired accent */}
    <rect x="38" y="12" width="28" height="36" rx="4" 
          stroke="currentColor" strokeWidth="2" />
    
    {/* Bat-wing inspired decorative elements */}
    <path d="M52 12 L56 8 L58 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M52 48 L56 52 L58 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Connecting lines suggesting cohesion */}
    <line x1="42" y1="30" x2="42" y2="36" stroke="currentColor" strokeWidth="1.5" />
    <line x1="42" y1="38" x2="42" y2="44" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const SatisfactionIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Seal-like symmetry shape representing trust and harmony */}
    {/* Outer geometric frame */}
    <path d="M40 8 L64 20 L68 48 L40 72 L12 48 L16 20 Z" 
          stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
    
    {/* Inner symmetric shape */}
    <path d="M40 18 L56 26 L58 46 L40 62 L22 46 L24 26 Z" 
          stroke="currentColor" strokeWidth="2" />
    
    {/* Center balance element - bat-inspired symmetry */}
    <path d="M40 28 Q46 32 48 40 Q44 36 40 34 Q36 36 32 40 Q34 32 40 28" 
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Pen nib accent at bottom */}
    <path d="M40 42 L36 52 L40 48 L44 52 Z" 
          fill="currentColor" className="opacity-60" />
    
    {/* Balance dots */}
    <circle cx="28" cy="30" r="2" fill="currentColor" className="opacity-50" />
    <circle cx="52" cy="30" r="2" fill="currentColor" className="opacity-50" />
  </svg>
)

// Custom SVG Components for Work Process - Line-based System
const AnalysisIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract division grid representing analysis */}
    <rect x="16" y="16" width="24" height="20" rx="2" 
          stroke="currentColor" strokeWidth="2" />
    <rect x="44" y="16" width="20" height="20" rx="2" 
          stroke="currentColor" strokeWidth="2" className="opacity-60" />
    
    {/* Lower section - expanded insight */}
    <rect x="16" y="44" width="48" height="20" rx="2" 
          stroke="currentColor" strokeWidth="2" className="opacity-80" />
    
    {/* Connecting lines suggesting analysis flow */}
    <line x1="28" y1="36" x2="28" y2="44" stroke="currentColor" strokeWidth="1.5" />
    <line x1="54" y1="36" x2="54" y2="44" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Data points */}
    <circle cx="28" cy="26" r="2" fill="currentColor" />
    <circle cx="54" cy="26" r="2" fill="currentColor" className="opacity-70" />
    <circle cx="40" cy="54" r="2" fill="currentColor" />
  </svg>
)

const DesignIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract UI frame representing interface design */}
    <rect x="16" y="16" width="48" height="48" rx="3" 
          stroke="currentColor" strokeWidth="2" />
    
    {/* Header area */}
    <line x1="16" y1="26" x2="64" y2="26" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
    
    {/* Grid-based content layout */}
    <rect x="24" y="34" width="18" height="12" rx="2" 
          stroke="currentColor" strokeWidth="1.5" />
    <rect x="24" y="50" width="18" height="8" rx="2" 
          stroke="currentColor" strokeWidth="1.5" className="opacity-70" />
    
    {/* Sidebar element */}
    <rect x="46" y="34" width="10" height="24" rx="2" 
          stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
    
    {/* Pen nib accent on header */}
    <path d="M30 18 L28 22 L32 22 Z" fill="currentColor" className="opacity-50" />
  </svg>
)

const DevelopmentIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blocks connecting representing code/build */}
    <rect x="16" y="20" width="16" height="16" rx="2" 
          stroke="currentColor" strokeWidth="2" />
    <rect x="48" y="20" width="16" height="16" rx="2" 
          stroke="currentColor" strokeWidth="2" className="opacity-80" />
    
    <rect x="32" y="44" width="16" height="16" rx="2" 
          stroke="currentColor" strokeWidth="2" />
    
    {/* Connection lines showing transformation */}
    <path d="M32 28 L48 28" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
    <path d="M24 36 L24 44" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
    <path d="M40 36 L40 44" stroke="currentColor" strokeWidth="1.5" className="opacity-60" />
    
    {/* Connection nodes */}
    <circle cx="32" cy="28" r="2" fill="currentColor" />
    <circle cx="40" cy="36" r="2" fill="currentColor" className="opacity-70" />
  </svg>
)

const LaunchIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Abstract launch path representing site launch */}
    {/* Base platform */}
    <path d="M20 56 L40 64 L60 56" stroke="currentColor" strokeWidth="2" />
    <path d="M20 56 L40 48 L60 56" stroke="currentColor" strokeWidth="1.5" className="opacity-50" />
    
    {/* Launch arc - bat-inspired upward motion */}
    <path d="M40 48 Q30 32 40 16 Q50 32 40 48" 
          stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Upward movement arrow */}
    <path d="M40 16 L36 24 M40 16 L44 24 M40 16 L40 28" 
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Motion lines */}
    <line x1="28" y1="28" x2="26" y2="26" stroke="currentColor" strokeWidth="1.5" className="opacity-50" strokeLinecap="round" />
    <line x1="52" y1="28" x2="54" y2="26" stroke="currentColor" strokeWidth="1.5" className="opacity-50" strokeLinecap="round" />
  </svg>
)

type Language = 'ar' | 'en'

interface PortfolioProject {
  id: string
  name: string
  hero: string
  gallery: string[]
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 'sudi',
    name: 'SUDI IDENTITY',
    hero: 'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509281/13_r4fj91.jpg',
    gallery: [
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509281/4_voqkkw.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509279/9_nfpwfl.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509277/2_uzwq1u.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509274/8_yszugw.jpg',
    ]
  },
  {
    id: 'durrat',
    name: 'DURRAT AL NUZHA',
    hero: 'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509584/1_ft58mi.jpg',
    gallery: [
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509584/8_moznrh.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509583/6_ovqgha.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509585/10_en6ifv.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509600/12_tcmwoc.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509586/11_ahqdpz.jpg',
    ]
  },
  {
    id: 'onmen',
    name: 'ONMEN IDENTITY',
    hero: 'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509760/1_pzifkr.jpg',
    gallery: [
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509756/2_auwano.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509756/8_p6kb0d.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509756/11_xcqjol.jpg',
    ]
  },
  {
    id: 'mukhbaza',
    name: 'MUKHBAZA ISKANOR',
    hero: 'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509915/1_vmmglo.jpg',
    gallery: [
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509915/3_o7snyq.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509915/9_d1nscx.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509914/7_ctpdux.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509922/11_jhem42.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509920/12_i1urgh.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509917/13_xk2pzy.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767509919/14_m4hqqm.jpg',
    ]
  },
  {
    id: 'bry',
    name: 'BRY IDENTITY',
    hero: 'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767510161/1_acekn6.jpg',
    gallery: [
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767510162/5_rhrvep.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767510165/7_vuenrh.jpg',
      'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767510165/9_oq630d.jpg',
    ]
  }
]

const translations = {
  ar: {
    role: 'مسوق إلكتروني | مصمم جرافيك',
    tagline: 'نحوّل الأفكار إلى حضور رقمي مؤثر',
    whyTitle: 'لماذا نحن خيارك الأفضل؟',
    whyIntro: 'نقدم لك مجموعة متكاملة من الخدمات المبتكرة لتعزيز حضورك الرقمي',
    service1Title: 'تصميم جرافيكي مخصص',
    service1Desc: 'تصميمات جرافيكية مخصصة تعكس هويتك البصرية وتميزك عن المنافسين.',
    service2Title: 'تسويق رقمي احترافي',
    service2Desc: 'خبرة في التسويق الرقمي تساعدك على الوصول لجمهورك المستهدف بكفاءة.',
    service3Title: 'تطوير مواقع متطورة',
    service3Desc: 'تطوير مواقع احترافية باستخدام أحدث التقنيات وأفضل ممارسات البرمجة.',
    service4Title: 'دعم فني مستمر',
    service4Desc: 'دعم فني وتعديلات مستمرة لما بعد الإطلاق لضمان استمرارية نجاح مشروعك.',
    processTitle: 'مراحل العمل',
    processIntro: 'نتبع منهجية احترافية لضمان تحقيق أفضل النتائج',
    step1Title: 'تحليل واحتياجات العميل',
    step1Desc: 'لقاء أول لتحديد الأهداف والاحتياجات الخاصة بالمشروع وفهم الجمهور والميزانية.',
    step2Title: 'تصميم الواجهات',
    step2Desc: 'تصميم باستخدام Figma أو Adobe XD مع نماذج تفاعلية للمراجعة.',
    step3Title: 'البرمجة والتطوير',
    step3Desc: 'تحويل التصميم إلى كود باستخدام HTML/CSS/JS أو WordPress.',
    step4Title: 'إطلاق الموقع',
    step4Desc: 'اختبار، تحسين سرعة، تهيئة SEO، نشر، ودعم مستمر.',
    portfolioTitle: 'أعمالنا المميزة',
    extraGalleryTitle: 'معرض أعمال إضافية',
    experienceTitle: 'الخبرة والمهارات',
    experienceSubtitle: 'الخبرة المهنية',
    skillsSubtitle: 'المهارات',
    educationTitle: 'التعليم والشهادات',
    contactTitle: 'تواصل معنا',
    emailLabel: 'البريد الإلكتروني',
    whatsappLabel: 'واتساب',
    viewGallery: 'عرض المعرض',
    close: 'إغلاق',
    years: '6+ سنوات الخبرة',
    projects: '50+ مشروع ناجح',
    satisfaction: '98% رضا العملاء',
    viewProject: 'عرض المشروع'
  },
  en: {
    role: 'Digital Marketer | Graphic Designer',
    tagline: 'Transforming ideas into impactful digital presence',
    whyTitle: 'Why We\'re Your Best Choice?',
    whyIntro: 'We offer you a comprehensive suite of innovative services to enhance your digital presence',
    service1Title: 'Custom Graphic Design',
    service1Desc: 'Custom graphic designs that reflect your visual identity and distinguish you from competitors.',
    service2Title: 'Professional Digital Marketing',
    service2Desc: 'Digital marketing expertise to help you reach your target audience efficiently.',
    service3Title: 'Advanced Website Development',
    service3Desc: 'Professional website development using the latest technologies and best coding practices.',
    service4Title: 'Continuous Technical Support',
    service4Desc: 'Technical support and ongoing adjustments after launch to ensure project success continuity.',
    processTitle: 'Work Process',
    processIntro: 'We follow a professional methodology to ensure achieving the best results',
    step1Title: 'Analysis and Client Needs',
    step1Desc: 'Initial meeting to determine project goals, requirements, understand audience, and budget.',
    step2Title: 'Interface Design',
    step2Desc: 'Design using Figma or Adobe XD with interactive models for review.',
    step3Title: 'Programming and Development',
    step3Desc: 'Converting design to code using HTML/CSS/JS or WordPress.',
    step4Title: 'Website Launch',
    step4Desc: 'Testing, speed optimization, SEO setup, publishing, and ongoing support.',
    portfolioTitle: 'Our Featured Work',
    extraGalleryTitle: 'Extra Work Gallery',
    experienceTitle: 'Experience & Skills',
    experienceSubtitle: 'Professional Experience',
    skillsSubtitle: 'Skills',
    educationTitle: 'Education & Certifications',
    contactTitle: 'Contact Us',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    viewGallery: 'View Gallery',
    close: 'Close',
    years: '6+ Years Experience',
    projects: '50+ Successful Projects',
    satisfaction: '98% Client Satisfaction',
    viewProject: 'View Project'
  }
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('ar')
  const [introPassed, setIntroPassed] = useState(false)
  const [scrollTriggered, setScrollTriggered] = useState(false)
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { scrollY } = useScroll()
  const t = translations[language]
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTriggered && window.scrollY > 50) {
        setScrollTriggered(true)
        setTimeout(() => {
          setIntroPassed(true)
        }, 1500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollTriggered])

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar')
    toast({
      title: language === 'ar' ? 'Language changed to English' : 'تم تغيير اللغة إلى العربية',
      duration: 2000,
    })
  }

  const openProject = (project: PortfolioProject) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % (selectedProject.gallery.length + 1))
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length + 1) % (selectedProject.gallery.length + 1))
    }
  }

  const getCurrentImage = () => {
    if (!selectedProject) return ''
    if (currentImageIndex === 0) return selectedProject.hero
    return selectedProject.gallery[currentImageIndex - 1]
  }

  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Toaster />

      {/* Opening Animation */}
      {!introPassed && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: scrollTriggered ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary text-glow">
              {language === 'ar' ? 'Welcome to Pico Media' : 'Welcome to Pico Media'}
            </h1>
          </motion.div>

          {/* Bat Silhouettes */}
          {scrollTriggered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`fixed text-black/40 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}
                  style={{
                    left: `${20 + i * 15}%`,
                    top: '-200px',
                    animationDelay: `${i * 0.2}s`
                  }}
                  initial={{ y: -500, opacity: 0 }}
                  animate={{ y: window.innerHeight + 500, opacity: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeIn' }}
                >
                  <svg width="120" height="80" viewBox="0 0 120 80" fill="currentColor">
                    <path d="M60 80C60 80 20 50 10 30C5 20 15 10 25 15C30 18 35 20 40 25C40 25 35 10 45 5C50 2 55 5 58 10C58 10 55 5 60 0C65 5 62 10 62 10C65 5 70 2 75 5C85 10 80 25 80 25C85 20 90 18 95 15C105 10 115 20 110 30C100 50 60 80 60 80Z"/>
                  </svg>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      )}

      {/* Language Toggle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={introPassed ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-40"
      >
        <Button
          onClick={toggleLanguage}
          variant="outline"
          className="bg-background/80 backdrop-blur-sm border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
        >
          <Globe className="w-4 h-4 ml-2" />
          {language === 'ar' ? 'English' : 'العربية'}
        </Button>
      </motion.div>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={introPassed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col"
      >
        {/* Profile Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introPassed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 mx-auto"
              initial={{ scale: 0, rotate: -180 }}
              animate={introPassed ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
            >
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <img
                src="https://res.cloudinary.com/duaec3vl4/image/upload/v1767508906/Picsart_26-01-04_09-40-07-527_ina23d.png"
                alt="Pico Media Logo"
                className="relative w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>

            {/* Brand Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={introPassed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-primary text-glow">
                Pico Media
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">
                {t.role}
              </p>
              <p className="text-lg md:text-xl text-foreground/80">
                {t.tagline}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={introPassed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6 md:gap-12 pt-8"
            >
              {[
                { value: t.years, icon: ExperienceIcon },
                { value: t.projects, icon: ProjectsIcon },
                { value: t.satisfaction, icon: SatisfactionIcon },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-20 h-20 md:w-24 md:h-24 mx-auto text-primary"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -2, 0]
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <stat.icon className="w-full h-full" />
                  </motion.div>
                  <p className="text-lg md:text-xl font-semibold text-primary">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2">
              <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </motion.div>
        </section>

        {/* Why Pico Media */}
        <section className="py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
                {t.whyTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.whyIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { title: t.service1Title, desc: t.service1Desc, icon: PenTool },
                { title: t.service2Title, desc: t.service2Desc, icon: TrendingUp },
                { title: t.service3Title, desc: t.service3Desc, icon: Code },
                { title: t.service4Title, desc: t.service4Desc, icon: Shield },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.5)' }}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 seal-border border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-primary">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Work Process */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
                {t.processTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t.processIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t.step1Title, desc: t.step1Desc, number: '01', icon: AnalysisIcon },
                { title: t.step2Title, desc: t.step2Desc, number: '02', icon: DesignIcon },
                { title: t.step3Title, desc: t.step3Desc, number: '03', icon: DevelopmentIcon },
                { title: t.step4Title, desc: t.step4Desc, number: '04', icon: LaunchIcon },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl group-hover:bg-primary/20 transition-all duration-500" />
                  <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                    <div className="text-5xl font-bold text-primary/20 mb-4">
                      {step.number}
                    </div>
                    <motion.div 
                      className="w-16 h-16 text-primary mb-4"
                      whileHover={{ 
                        scale: 1.08,
                        y: -2
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-full h-full" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Portfolio */}
        <section className="py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
                {t.portfolioTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openProject(project)}
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-border/30 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.hero}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Content overlay - always visible */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {project.name}
                        </h3>
                        <p className="text-sm text-white/70">
                          {project.gallery.length} {language === 'ar' ? 'صور' : 'images'}
                        </p>
                        
                        {/* Interactive indicator - always visible */}
                        <div className="flex items-center gap-2 text-primary font-medium mt-4 group-hover:gap-3 transition-all duration-300">
                          <span>{t.viewProject}</span>
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Top-right corner indicator on hover */}
                    <div className="absolute top-4 right-4 bg-primary text-background w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Extra Gallery */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
                {t.extraGalleryTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767510971/WhatsApp_Image_2026-01-04_at_10.11.25_AM_ck4mpo.jpg',
                'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767510967/WhatsApp_Image_2026-01-04_at_10.11.03_AM_1_hdqqeq.jpg',
                'https://res.cloudinary.com/dsstn0i8a/image/upload/v1767510964/WhatsApp_Image_2026-01-04_at_10.11.02_AM_1_oyf82m.jpg',
              ].map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{ scale: 1.03 }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={image}
                    alt={`Extra work ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Experience & Skills */}
        <section className="py-20 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
                {t.experienceTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Experience */}
              <motion.div
                initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-primary mb-6">
                  {t.experienceSubtitle}
                </h3>
                <div className="space-y-4">
                  {[
                    { year: '2024', company: 'شيشي بي الصينية', role: language === 'ar' ? 'التسويق الرقمي وإدارة المحتوى' : 'Digital Marketing & Content Management' },
                    { year: '2024', company: 'شركة رواشين للتسويق العقاري', role: language === 'ar' ? 'التسويق الرقمي وإدارة المحتوى' : 'Digital Marketing & Content Management' },
                    { year: '2023-2024', company: 'درة النزهة', role: language === 'ar' ? 'التسويق الرقمي وإدارة المحتوى' : 'Digital Marketing & Content Management' },
                    { year: '2025-2026', company: 'مجموعة الحراز', role: language === 'ar' ? 'التسويق الرقمي وإدارة المحتوى' : 'Digital Marketing & Content Management' },
                    { year: '2025', company: 'الباقر للطاقة الشمسية', role: language === 'ar' ? 'التسويق الرقمي وإدارة المحتوى' : 'Digital Marketing & Content Management' },
                    { year: '2025', company: 'Quba Perfumery', role: language === 'ar' ? 'التسويق الرقمي وإدارة المحتوى' : 'Digital Marketing & Content Management' },
                  ].map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                        <div>
                          <h4 className="font-semibold text-foreground">{exp.company}</h4>
                          <p className="text-sm text-muted-foreground">{exp.role}</p>
                        </div>
                        <span className="text-sm font-medium text-primary whitespace-nowrap">
                          {exp.year}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, x: language === 'ar' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-semibold text-primary mb-6">
                  {t.skillsSubtitle}
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Photoshop', level: 90 },
                    { name: 'Illustrator', level: 95 },
                    { name: 'InDesign', level: 85 },
                    { name: 'AI Tools', level: 80 },
                    { name: 'Analytics', level: 88 },
                    { name: 'Website Design', level: 85 },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                          className="h-full gold-gradient rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Education & Certifications */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
                {t.educationTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { title: 'Electrical & Vehicle Inspection Diploma', year: '2021-2023' },
                { title: 'Artificial Intelligence & Application Security', year: '2025' },
                { title: 'Python (Hands-On)', year: '2025' },
                { title: 'Autonomous Vehicles & Robotics', year: '2025' },
                { title: 'Digital Marketing', year: '2024' },
                { title: 'Advanced Google Courses', year: '2024' },
                { title: 'Google Graphic Design', year: '2023' },
                { title: 'I Learning Diploma', year: '2022' },
                { title: 'German Academy Certificate', year: '2019-2021' },
                { title: 'C++ + Office', year: '2019' },
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.5)' }}
                  className="bg-card/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
                >
                  <h4 className="font-semibold text-foreground mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-primary">
                    {cert.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact & Footer */}
        <footer className="py-20 px-4 md:px-8 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-primary text-glow">
                {t.contactTitle}
              </h2>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <motion.a
                  href="mailto:picorajab@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">{t.emailLabel}</p>
                    <p className="font-semibold">picorajab@gmail.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://wa.me/966503870362"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-4 bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border/50 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">{t.whatsappLabel}</p>
                    <p className="font-semibold dir-ltr">+966 50 387 0362</p>
                  </div>
                </motion.a>
              </div>

              <div className="pt-8 border-t border-border/50">
                <p className="text-muted-foreground text-sm">
                  © 2025 Pico Media. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
                </p>
              </div>
            </div>
          </motion.div>
        </footer>
      </motion.main>

      {/* Project Gallery Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-5xl w-full p-0 bg-background border-border/50">
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <Button
                  onClick={() => setSelectedProject(null)}
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="relative aspect-video">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={getCurrentImage()}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />

                  <Button
                    onClick={prevImage}
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>

                  <Button
                    onClick={nextImage}
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedProject.gallery.length + 1}
                  </div>
                </div>

                <div className="p-6 border-t border-border/50">
                  <h3 className="text-2xl font-bold text-primary">
                    {selectedProject.name}
                  </h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  )
}
