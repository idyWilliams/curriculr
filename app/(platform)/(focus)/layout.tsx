import { XPToastContainer } from '@/components/shared/XPToast'

export default function FocusLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <XPToastContainer />
      {children}
    </div>
  )
}
