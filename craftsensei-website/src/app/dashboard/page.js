

import ClientDashboard from './ClientDashboard'
import Image from 'next/image'


export default async function DashboardPage() {

  return (
    <div className="fix min-h-screen bg-[#292010] text-zinc-50 relative overflow-hidden">
      <Image
      className="fixed inset-0 z-10 opacity-30 object-cover"
        src="/backgrounds/minecraft_bg4.png"
        alt="Dashboard background"
        fill
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/45" />

      <main className="mx-auto relative z-10">
        <section className="px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <ClientDashboard />
          </div>
        </section>
      </main>
    </div>
  )
}