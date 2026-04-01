import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ClientDashboard from './ClientDashboard'
import Image from 'next/image'
import { findUserBySessionToken } from '../lib/users-db'

async function getServerUser() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')?.value

  if (!sessionToken) return null

  const user = await findUserBySessionToken(sessionToken)
  if (!user) return null

  return {
    name: user.name,
    email: user.email
  }
}

export default async function DashboardPage() {
  const user = await getServerUser()

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