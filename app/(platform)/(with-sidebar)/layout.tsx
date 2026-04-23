import { Sidebar } from '@/components/layout/sidebar'
import { TopBar } from '@/components/layout/topbar'
import { XPToastContainer } from '@/components/shared/XPToast'

export default function WithSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <Sidebar />
      <TopBar />
      <XPToastContainer />
      <main className="ml-60 pt-14 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
