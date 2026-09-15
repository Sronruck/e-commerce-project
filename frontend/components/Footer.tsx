"use client";

import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-mint px-6 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold text-brand-green">Fashion Store</h3>
          <p className="mt-4 text-sm font-medium text-gray-700">Social Media</p>
          <div className="mt-2 flex gap-3 text-gray-700">
            <Facebook size={18} />
            <Twitter size={18} />
            <Instagram size={18} />
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-brand-green">Shop</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Products</li>
            <li>Overview</li>
            <li>Pricing</li>
            <li>Releases</li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-brand-green">Company</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>About Us</li>
            <li>Contact</li>
            <li>News</li>
            <li>Support</li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-brand-green">Stay up to date</p>
          <form className="flex overflow-hidden rounded-lg border border-gray-300 bg-white">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm outline-none"
            />
            <button className="bg-brand-teal px-4 text-sm font-medium text-white">SUBMIT</button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl justify-between border-t border-brand-teal/20 pt-4 text-xs text-gray-600">
        <span>© 2026 Fashion Store</span>
        <div className="flex gap-4">
          <span>Terms</span>
          <span>Privacy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
