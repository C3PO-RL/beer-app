"use client";

import Link from "next/link";
import { Home, ShoppingBag, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-[#020202]">
                Beer Bar
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <Home size={18} className="mr-1" />
              Home
            </Link>
            <Link
              href="/orders"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith("/orders")
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <ShoppingBag size={18} className="mr-1" />
              Orders
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg animate-fade-in">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/"
                  ? "text-red-600 bg-gray-50"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home size={18} className="mr-2" />
                Home
              </div>
            </Link>
            <Link
              href="/orders"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname.startsWith("/orders")
                  ? "text-red-600 bg-gray-50"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                Orders
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
