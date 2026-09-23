"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Quote, 
  ArrowRight,
  Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, testimonials } from "@/data/mock";

export default function HomePage() {
  const featured = products.slice(0, 3);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // ระบบนับถอยหลังแบบไดนามิก (ชั่วโมง : นาที : วินาที)
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 48, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const categories = [
    { 
      title: "Accessories", 
      desc: "เครื่องประดับและกระเป๋าคอลเลกชันหนังแท้ ดีไซน์มินิมอลเหนือกาลเวลา",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80"
    },
    { 
      title: "Dresses & Tailored", 
      desc: "ชุดเดรสและเสื้อผ้าตัดเย็บทรงประณีต สวมใส่สบายและโดดเด่นในทุกโอกาส",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80"
    },
    { 
      title: "Outerwear", 
      desc: "โค้ท แจ็กเก็ต และเบลเซอร์คัตติ้งเนี้ยบ เพิ่มเลเยอร์ความมีระดับ",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80"
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
        {/* Animated Ambient Glow */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-stone-200/40 to-neutral-100 blur-3xl transition-all duration-1000 animate-pulse" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-amber-100/30 blur-2xl" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* ฝั่งซ้าย */}
            <div className="space-y-8 lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-neutral-700 backdrop-blur">
                <Sparkles size={13} className="text-neutral-500" />
                <span>NEW ARRIVALS • SPRING/SUMMER 2026</span>
              </div>

              <h1 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
                Discover <br />
                <span className="font-serif italic font-normal text-neutral-700">Your Signature</span> <br />
                Style.
              </h1>

              <p className="max-w-md text-sm sm:text-base leading-relaxed text-neutral-500 font-normal">
                สัมผัสความประณีตของเสื้อผ้าที่สะท้อนตัวตนของคุณ ดีไซน์ร่วมสมัยที่ผสานความเรียบง่ายและคุณภาพอันไร้กาลเวลา
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-neutral-900 px-7 py-3.5 text-xs font-medium tracking-wider text-white uppercase transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/10"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/shop?tag=HOT"
                  className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-7 py-3.5 text-xs font-medium tracking-wider text-neutral-700 uppercase transition-colors hover:border-neutral-900 hover:text-neutral-900"
                >
                  LOOKBOOK
                </Link>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-6 border-t border-neutral-200/60 pt-8">
                <div>
                  <p className="text-xl font-semibold text-neutral-900">100%</p>
                  <p className="text-xs text-neutral-400">Authentic Fabrics</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-neutral-900">14 Days</p>
                  <p className="text-xs text-neutral-400">Free Exchange</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-neutral-900">5★</p>
                  <p className="text-xs text-neutral-400">Customer Rating</p>
                </div>
              </div>
            </div>

            {/* ฝั่งขวา */}
            <div className="relative lg:col-span-6">
              <div className="group relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-neutral-100 shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80"
                  alt="Fashion Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/20 bg-white/80 p-4 shadow-lg backdrop-blur-md transition-all duration-300">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">Featured Item</span>
                    <p className="text-sm font-medium text-neutral-900">Oversized Minimalist Blazer</p>
                    <p className="text-xs text-neutral-600">฿3,890.00</p>
                  </div>
                  <Link
                    href="/shop"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform hover:scale-105 active:scale-95"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESSENTIALS (FEATURED PRODUCTS) */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center justify-between gap-4 border-b border-neutral-200/60 pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">Curated Lineup</span>
            <h2 className="mt-1 font-serif text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl">
              Essentials Summer 2026
            </h2>
          </div>
          <Link 
            href="/shop" 
            className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-neutral-800 hover:text-neutral-500 transition-colors"
          >
            <span>SEE ALL ITEMS</span>
            <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 3. EXCLUSIVE OFFER WITH LIVE COUNTDOWN */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-8 py-14 text-white shadow-2xl md:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-neutral-800/60 blur-3xl" />

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:col-span-5 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80"
                alt="Exclusive Offer"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center space-y-6 md:col-span-7 md:pl-6">
              <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-neutral-800 px-3.5 py-1 text-[11px] font-medium tracking-widest text-neutral-300 uppercase">
                <Clock size={12} className="text-amber-400" />
                Limited Time Release
              </span>

              <h3 className="font-serif text-3xl font-light leading-snug sm:text-4xl">
                Exclusive Season Offer <br />
                <span className="italic text-neutral-400">Savings Up to 40% Off</span>
              </h3>

              <p className="max-w-lg text-xs sm:text-sm leading-relaxed text-neutral-400">
                ยกระดับสไตล์ของคุณด้วยคอลเลกชัน New Arrivals ในราคาสุดพิเศษ สัมผัสความประณีตและเนื้อผ้าเกรดพรีเมียมก่อนสินค้าหมด
              </p>

              {/* Countdown Numbers */}
              <div className="flex items-center gap-3 pt-1">
                {[
                  ["06", "DAYS"],
                  [String(timeLeft.hours).padStart(2, "0"), "HOURS"],
                  [String(timeLeft.minutes).padStart(2, "MIN"), "MIN"],
                  [String(timeLeft.seconds).padStart(2, "0"), "SEC"]
                ].map(([n, l]) => (
                  <div 
                    key={l} 
                    className="flex min-w-[65px] flex-col items-center rounded-2xl border border-neutral-800 bg-neutral-800/80 px-3 py-2.5 backdrop-blur transition-all duration-300 hover:border-neutral-700"
                  >
                    <span className="font-mono text-xl font-medium tracking-tight text-white">{n}</span>
                    <span className="text-[9px] tracking-wider text-neutral-400">{l}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/shop?sale=true"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-medium tracking-wider text-neutral-900 uppercase transition-all hover:bg-neutral-200 hover:shadow-lg hover:shadow-white/10"
                >
                  <span>BUY NOW</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESIGNER CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">Meticulously Crafted</span>
          <h2 className="mt-1 font-serif text-3xl font-normal text-neutral-900 sm:text-4xl">
            Designer Clothes For You
          </h2>
          <p className="mx-auto mt-3 max-w-md text-xs sm:text-sm text-neutral-500 leading-relaxed">
            ดื่มด่ำไปกับโลกแห่งความประณีต ดีไซน์ร่วมสมัยที่คัดสรรมาเพื่อตอบสนองการแต่งกายของคุณในทุกฤดูกาล
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((c) => (
            <Link 
              key={c.title} 
              href="/shop" 
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-neutral-950/15 transition-opacity duration-300 group-hover:opacity-0" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h4 className="text-base font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                  {c.title}
                </h4>
                <ArrowUpRight size={16} className="text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
              </div>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. TESTIMONIALS (FEEDBACK) */}
      <section className="border-t border-neutral-200/60 bg-white/60 px-6 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl">
          <div className="text-center pb-12">
            <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">Testimonials</span>
            <h2 className="mt-1 font-serif text-3xl font-normal text-neutral-900">Feedback & Reviews</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  i === testimonialIndex 
                    ? "bg-neutral-900 text-white shadow-xl" 
                    : "border border-neutral-200/80 bg-white text-neutral-800 shadow-sm"
                }`}
              >
                <div>
                  <Quote size={22} className={i === testimonialIndex ? "text-neutral-600" : "text-neutral-300"} />
                  <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${i === testimonialIndex ? "text-neutral-200" : "text-neutral-600"}`}>
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>
                <div className={`mt-6 border-t pt-4 ${i === testimonialIndex ? "border-neutral-800" : "border-neutral-100"}`}>
                  <p className="text-xs font-semibold">{t.name}</p>
                  <p className={`text-[11px] ${i === testimonialIndex ? "text-neutral-400" : "text-neutral-400"}`}>
                    Verified Customer
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-10 flex justify-center gap-3">
            <button 
              onClick={handlePrevTestimonial}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900 active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={handleNextTestimonial}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-all hover:border-neutral-900 hover:text-neutral-900 active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}