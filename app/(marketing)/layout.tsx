export const metadata = {
  title: 'Curriculr — Open-Source Learning Platform',
  description: 'The open platform for structured learning — for students, schools, and teams. Build real skills, track progress, and integrate learning into anything.',
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-base font-sans antialiased">
      {children}
    </div>
  )
}
