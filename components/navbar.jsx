"use client";

import Link from "next/link";
import {
  useAuth,
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, PenBox } from "lucide-react";
import UserMenu from "./user-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 px-4 py-4">
      {/* Gradient line above navbar */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#DEB887]/20 to-transparent" />

      <nav
        className={`mx-auto max-w-7xl rounded-full transition-all duration-300 border relative overflow-hidden ${
          scrolled
            ? "bg-black/70 backdrop-blur-sm border-beige/20 shadow-[0_0_15px_rgba(245,245,220,0.07)]"
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Gradient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DEB887]/5 via-transparent to-[#DEB887]/5 animate-pulse-slow" />

        <div className="px-6 relative">
          <div className="flex items-center justify-between h-14">
            {/* Logo/Brand with gradient */}
            <Link
              href="/"
              className={`text-xl font-bold transition-all duration-300 ${
                scrolled
                  ? "bg-gradient-to-r from-[#DEB887] to-[#D2B48C] bg-clip-text text-transparent"
                  : "text-white hover:text-beige"
              }`}
            >
              ZCRUM
            </Link>

            {/* Navigation Links with underline effect */}
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "About"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={`transition-all duration-300 hover:text-beige relative group ${
                    scrolled ? "text-beige/80" : "text-white"
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[#DEB887] to-[#D2B48C] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Auth Buttons with enhanced gradients */}
            <div className="flex items-center gap-4">
              {!isLoaded ? (
                <Loader2 className="h-8 w-8 animate-spin text-beige" />
              ) : (
                <>
                  <SignedIn>
                    <Link href="/project/create">
                      <Button
                        variant="destructive"
                        className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
                          scrolled
                            ? "bg-gradient-to-r from-[#DEB887] to-[#D2B48C] text-black hover:opacity-90"
                            : "bg-white text-black hover:bg-white/90"
                        }`}
                      >
                        <PenBox size={18} />
                        <span className="hidden md:inline">Create Project</span>
                      </Button>
                    </Link>
                    <UserMenu />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton forceRedirectUrl="/onboarding">
                      <Button
                        variant="outline"
                        className={`rounded-full transition-all duration-300 relative group overflow-hidden ${
                          scrolled
                            ? "border-beige/30 text-beige hover:border-beige/50"
                            : "border-white/30 text-white hover:border-white/50"
                        }`}
                      >
                        <span className="relative z-10">Login</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#DEB887]/10 to-[#D2B48C]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </Button>
                    </SignInButton>
                  </SignedOut>
                </>
              )}
            </div>

            {/* Mobile Menu Button with gradient hover */}
            <div className="md:hidden">
              <button
                className={`p-2 transition-all duration-300 rounded-full hover:bg-gradient-to-r hover:from-[#DEB887]/10 hover:to-[#D2B48C]/10 ${
                  scrolled ? "text-beige" : "text-white"
                }`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
