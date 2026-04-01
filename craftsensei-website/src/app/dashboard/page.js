"use client";

import { redirect } from 'next/navigation'
import ClientDashboard from './ClientDashboard'
import Image from 'next/image'
import {useAuth} from "@/app/context/authContext";



export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-[#292010] text-zinc-50 relative overflow-hidden">
      <Image
        src="/backgrounds/minecraft_bg4.png"
        alt="Dashboard background"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />

      <main className="mx-auto relative z-10">
        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <ClientDashboard userName={user.name} />
          </div>
        </section>
      </main>
    </div>
  )
}