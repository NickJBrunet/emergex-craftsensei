"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() { 



  return (
          <header className="sticky top-0 z-30 bg-[#22190a] px-6 py-3 shadow-md">
            <nav className="mx-auto flex px-10 items-center justify-between">
      
              <div className="flex items-center gap-5">
                <div className="relative h-10 w-10">
                  
                  {/* Add feature if logo clicked 31 times title changes to craft skibidi */}
                  <Image
                    src="/minecraft_logo.svg"
                    // To be replaced with the Craft Sensei logo once designed. For now, using a placeholder Minecraft bot image.
                    alt="Craft Sensei Logo"
                    fill
                    sizes="32px"
                    className="rounded-sm object-contain hover:animate-spin hover:cursor-pointer active:scale-80"
                  />
                </div>
                
                <Link href="/" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })} className="text-3xl font-['Silkscreen'] tracking-[-0.05em] text-white [text-shadow:1px_1px_0_#059669,2px_2px_0_#047857,3px_3px_0_#065f46,4px_4px_0_rgba(6,95,70,0.9)] hover:scale-105 active:scale-95 flex items-center pb-1">
                Craft Sensei
                </Link>


                {/* 3D with more glow testing this */}
                {/* <span className="text-3xl font-semibold tracking-tight text-white 
                  [text-shadow:2px_2px_0_#059669,4px_4px_0_#047857,6px_6px_0_#065f46,8px_8px_0_rgba(6,95,70,0.9)]">
                  Craft Sensei
                </span> */}
    
              {/* <span className="text-3xl font-semibold tracking-tight text-white 
      [text-shadow:1px_1px_0_#059669,2px_2px_0_#047857,3px_3px_0_#065f46,4px_4px_0_rgba(6,95,70,0.9)]">
                Craft Sensei
              </span> */}
    
    
              </div>
    
              <div className="flex items-center gap-3">
                <button className="hover:cursor-pointer rounded-full border border-emerald-200/60 px-4 py-1.5 text-sm font-medium text-emerald-50 hover:bg-emerald-900/40">
                <Link href="/auth/login">
                  Log in
                </Link>
                </button>
                <button className="hover:cursor-pointer rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-semibold text-emerald-950 shadow hover:bg-emerald-400">
                <Link href="/auth/signup">
                  Sign Up
                </Link>
                </button>
              </div>
            </nav>
          </header>

  );

}


