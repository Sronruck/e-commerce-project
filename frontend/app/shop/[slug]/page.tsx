import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mock";

export default function ShopCategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  const filtered = category ? products.filter((p) => p.categoryId === category.id) : [];

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h1 className="font-serif text-2xl font-semibold capitalize text-brand-green">
          {category?.name || params.slug}
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {filtered.length === 0 ? (
            <p className="col-span-full text-sm text-gray-400">ยังไม่มีสินค้าในหมวดหมู่นี้</p>
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
