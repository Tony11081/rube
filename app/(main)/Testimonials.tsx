'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface TestimonialProps {
  quote: string
  author: string
  city: string
  country: string
  flag: string
  index: number
}

const Testimonial = ({ quote, author, city, country, flag, index }: TestimonialProps) => {
  // 不同的头像风格数组
  const styles = [
    'adventurer', 'avataaars', 'bottts', 'micah', 'personas', 'pixel-art', 'lorelei'
  ];
  
  // 基于索引选择不同的风格，让头像更加多样化
  const avatarStyle = styles[index % styles.length];
  
  // 使用最新的DiceBear API URL格式
  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${encodeURIComponent(author)}`;
  
  // 静态头像备用URL，当DiceBear API不可用时使用
  const fallbackAvatarUrl = `/avatars/avatar_${(index % 8) + 1}.png`;
  
  return (
    <motion.blockquote 
      className="bg-zinc-50 dark:bg-zinc-800/70 p-4 rounded-lg shadow-sm break-inside-avoid mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
    >
      <p className="text-zinc-800 dark:text-zinc-200">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-2 flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-700">
          <Image
            src={avatarUrl}
            alt={`${author}'s avatar`} 
            className="w-full h-full object-cover"
            width={32}
            height={32}
            unoptimized={true}
            onError={(e) => {
              // 当API加载失败时使用本地静态头像
              const target = e.target as HTMLImageElement;
              target.onerror = null; // 防止无限循环
              target.src = fallbackAvatarUrl;
            }}
          />
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {author}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {flag} {city}, {country}
          </p>
        </div>
      </footer>
    </motion.blockquote>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      quote: "Finally found the perfect soccer cleats size guide. No more guessing between US and European sizing.",
      author: "Emily J.",
      city: "San Diego",
      country: "USA",
      flag: "🇺🇸"
    },
    {
      quote: "Their jersey authenticity guide saved me from buying a fake Barcelona shirt. Worth every penny.",
      author: "Daniel K.",
      city: "London",
      country: "UK",
      flag: "🇬🇧"
    },
    {
      quote: "The gear care tips extended my running shoes' life by months. My marathon training gear lasts longer now.",
      author: "Leon M.",
      city: "Berlin",
      country: "Germany",
      flag: "🇩🇪"
    },
    {
      quote: "As a basketball coach, their training guides helped me prevent player injuries. Game changer.",
      author: "Sophia R.",
      city: "Toronto",
      country: "Canada",
      flag: "🇨🇦"
    },
    {
      quote: "Found authentic fan gear for my team that's not available in Sweden. Quality was perfect.",
      author: "Anna L.",
      city: "Stockholm",
      country: "Sweden",
      flag: "🇸🇪"
    },
    {
      quote: "Their buying guide helped me avoid counterfeit sports equipment. Honest, no-nonsense advice.",
      author: "Maximilian P.",
      city: "Vienna",
      country: "Austria",
      flag: "🇦🇹"
    },
    {
      quote: "The sizing conversion chart for tennis rackets was spot on. Perfect grip size recommendation.",
      author: "Takashi Y.",
      city: "Tokyo",
      country: "Japan",
      flag: "🇯🇵"
    },
    {
      quote: "Tactical analysis made simple — now I understand pressing and transitions like never before.",
      author: "Claire D.",
      city: "Paris",
      country: "France",
      flag: "🇫🇷"
    },
    {
      quote: "Fan travel guide saved me hundreds on Champions League away days. Great accommodation tips.",
      author: "Marco V.",
      city: "Rome",
      country: "Italy",
      flag: "🇮🇹"
    },
    {
      quote: "Their football boot breakdown helped me choose based on playing surface. No more blisters!",
      author: "Isabella C.",
      city: "Barcelona",
      country: "Spain",
      flag: "🇪🇸"
    },
    {
      quote: "Training schedule for beginners was perfect. Started running 5Ks without injuries.",
      author: "Thomas W.",
      city: "Sydney",
      country: "Australia",
      flag: "🇦🇺"
    },
    {
      quote: "Jersey washing guide kept all my team colors vibrant. Numbers haven't peeled once.",
      author: "Laura B.",
      city: "Amsterdam",
      country: "Netherlands",
      flag: "🇳🇱"
    },
    {
      quote: "Recovery routine recommendations cut my muscle soreness in half. Training consistency improved.",
      author: "Michael O.",
      city: "Dublin",
      country: "Ireland",
      flag: "🇮🇪"
    },
    {
      quote: "Gym equipment guides helped me set up a home workout space within budget. No scams.",
      author: "Pavel K.",
      city: "Prague",
      country: "Czech Republic",
      flag: "🇨🇿"
    },
    {
      quote: "Match day etiquette tips made my first away game experience amazing. Felt like a local fan.",
      author: "Nina S.",
      city: "Oslo",
      country: "Norway",
      flag: "🇳🇴"
    },
    {
      quote: "Swimming gear recommendations were perfect for my triathlon training. Quality lasted all season.",
      author: "Maria F.",
      city: "Mexico City",
      country: "Mexico",
      flag: "🇲🇽"
    },
    {
      quote: "Injury prevention tips for runners saved my knees. Three marathons with zero issues.",
      author: "David L.",
      city: "Seoul",
      country: "South Korea",
      flag: "🇰🇷"
    },
    {
      quote: "Youth coaching drills from their training section made practice more engaging for kids.",
      author: "Emma H.",
      city: "Wellington",
      country: "New Zealand",
      flag: "🇳🇿"
    },
    {
      quote: "Authentic vs replica jersey guide helped me make informed purchases. No regrets anymore.",
      author: "Raj P.",
      city: "Singapore",
      country: "Singapore",
      flag: "🇸🇬"
    },
    {
      quote: "Cycling gear maintenance schedule keeps my bike running smooth. Extended component life significantly.",
      author: "Andre M.",
      city: "Rio de Janeiro",
      country: "Brazil",
      flag: "🇧🇷"
    }
  ]
  
  return (
    <section className="bg-white dark:bg-zinc-900 py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="text-center px-4">
        <motion.h2 
          className="text-3xl font-bold text-zinc-900 dark:text-zinc-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Trusted by sports fans worldwide
        </motion.h2>
        <motion.p 
          className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Here&apos;s what athletes and fans say about Kkgool:
        </motion.p>
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-4">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-0">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={`testimonial-${index}`}
              quote={testimonial.quote}
              author={testimonial.author}
              city={testimonial.city}
              country={testimonial.country}
              flag={testimonial.flag}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 