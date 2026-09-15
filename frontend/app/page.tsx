import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, testimonials } from "@/data/mock";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="bg-brand-mint px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-serif font-semibold leading-tight text-brand-teal md:text-5xl">
              Discover and Find Your Own Fashion!
            </h1>
            <p className="mt-4 max-w-md text-sm text-gray-700">
              Explore our curated collection of stylish clothing and accessories tailored to your unique taste.
            </p>
            <button className="mt-6 rounded-lg bg-brand-teal px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
              SHOP
            </button>
          </div>
          <div className="aspect-[4/5] rounded-2xl bg-brand-dark" />
        </div>
      </section>

      {/* ESSENTIALS */}
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="font-serif text-2xl font-semibold text-brand-green md:text-3xl">
          ESSENTIALS SUMMER 2026
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Get in on the trend with our curated selection of best-selling styles.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 text-left md:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <a href="/shop" className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal">
          See all <ChevronRight size={14} />
        </a>
      </section>

      {/* EXCLUSIVE OFFER */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 rounded-2xl bg-gray-100 p-6 md:grid-cols-2">
          <div className="aspect-[16/9] rounded-xl bg-gray-300 md:aspect-auto" />
          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-xl font-semibold text-brand-teal">Exclusive offer</h3>
            <p className="mt-2 text-sm text-gray-600">
              Unlock the ultimate style upgrade with our exclusive offer. Enjoy savings of up to 40% off on our latest New Arrivals.
            </p>
            <div className="mt-4 flex gap-3">
              {[["06", "Days"], ["18", "Hours"], ["48", "Min"]].map(([n, l]) => (
                <div key={l} className="rounded-lg bg-white px-4 py-2 text-center shadow-sm">
                  <p className="text-lg font-semibold">{n}</p>
                  <p className="text-xs text-gray-500">{l}</p>
                </div>
              ))}
            </div>
            <button className="mt-6 w-fit rounded-lg bg-brand-teal px-6 py-3 text-sm font-semibold text-white">
              BUY NOW
            </button>
          </div>
        </div>
      </section>

      {/* DESIGNER CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 pb-16 text-center">
        <h2 className="font-serif text-2xl font-semibold text-brand-green md:text-3xl">
          Designer Clothes For You
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Immerse yourself in the world of luxury fashion with our meticulously crafted designer clothes!
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {[
            { title: "Accessories", desc: "Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats." },
            { title: "Dresses", desc: "Explore a stunning range of designer dresses, including evening gowns and chic day dresses." },
            { title: "Outerwear", desc: "Browse luxurious designer coats, jackets, and blazers to stay stylishly warm during colder seasons." },
          ].map((c) => (
            <div key={c.title}>
              <div className="aspect-[4/5] rounded-xl bg-gray-200" />
              <p className="mt-3 font-semibold">{c.title}</p>
              <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white px-6 pb-16 text-center">
        <h2 className="font-serif text-2xl font-semibold text-brand-green">Feedback</h2>
        <div className="mx-auto mt-8 flex max-w-4xl flex-col gap-4 md:flex-row">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`flex-1 rounded-xl p-6 text-left ${i === 1 ? "bg-brand-mint" : "bg-gray-50"}`}
            >
              <p className="text-2xl text-brand-teal">&ldquo;</p>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="mt-2 text-xs text-gray-400">{t.comment}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <button className="rounded-full border border-gray-200 p-2"><ChevronLeft size={16} /></button>
          <button className="rounded-full border border-gray-200 p-2"><ChevronRight size={16} /></button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
