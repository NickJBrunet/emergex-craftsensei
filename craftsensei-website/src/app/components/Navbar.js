"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const { user, logout } = useAuth();

  // Fetch session from your /api/auth/session endpoint
  // useEffect(() => {
  //   async function fetchSession() {
  //     try {
  //       const res = await fetch("/api/auth/session", { cache: "no-store" });
  //       const data = await res.json();
  //       setSession(data.session);
  //     } catch (err) {
  //       console.error("Session fetch error:", err);
  //     }
  //   }
  //   fetchSession();
  // }, []);
  //
  // // Handle logout by clearing the token cookie via backend route
  const handleLogout = async () => {

    logout().then(() => {

      router.push("/");

    }).catch((err) => {

      console.error(err.message);

    });

  };

  return (
    <header className="sticky top-0 z-30 bg-[#22190a] px-6 py-3 shadow-md">
      <nav className="mx-auto gap-5 flex px-1 sm:px-10 items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="relative h-10 w-10">
            <Image
              src="/minecraft_logo.svg"
              alt="Craft Sensei Logo"
              fill
              sizes="32px"
              className="rounded-sm object-contain hover:animate-spin hover:cursor-pointer active:scale-80"
            />
          </div>

          <Link
            href="/"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
            className="text-2xl md:text-3xl font-['Silkscreen'] tracking-[-0.05em] text-white [text-shadow:1px_1px_0_#059669,2px_2px_0_#047857,3px_3px_0_#065f46,4px_4px_0_rgba(6,95,70,0.9)] hover:scale-105 active:scale-95 flex items-center pb-1"
          >
            Craft Sensei
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="md:flex hidden items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="hover:cursor-pointer rounded-full border border-emerald-200/60 px-4 py-1.5 text-sm font-medium text-emerald-50 hover:bg-emerald-900/40"
                >
                  Logout
                </button>
                <Link
                  href="/dashboard"
                  className="hover:cursor-pointer rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:bg-emerald-400"
                >
                  Your Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hover:cursor-pointer rounded-full border border-emerald-200/60 px-4 py-1.5 text-sm font-medium text-emerald-50 hover:bg-emerald-900/40"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="hover:cursor-pointer rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:bg-emerald-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          >
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-[#22190a] mt-3 border-t border-emerald-500/20 px-6 py-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 text-emerald-50 hover:text-emerald-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left py-2 text-emerald-50 hover:text-emerald-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="block py-2 text-emerald-50 hover:text-emerald-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/auth/signup"
                className="block py-2 text-emerald-50 hover:text-emerald-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}



                {/* 3D with more glow testing this */}
                {/* <span className="text-3xl font-semibold tracking-tight text-white 
                  [text-shadow:2px_2px_0_#059669,4px_4px_0_#047857,6px_6px_0_#065f46,8px_8px_0_rgba(6,95,70,0.9)]">
                  Craft Sensei
                </span> */}
    
              {/* <span className="text-3xl font-semibold tracking-tight text-white 
      [text-shadow:1px_1px_0_#059669,2px_2px_0_#047857,3px_3px_0_#065f46,4px_4px_0_rgba(6,95,70,0.9)]">
                Craft Sensei
              </span> */}
