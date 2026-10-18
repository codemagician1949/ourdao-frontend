import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exit DAO',
  description: 'Withdraw your stake and exit the DAO.',
  robots: { index: false },
}

export default function ExitLayout({ children }: { children: React.ReactNode }) {
  return children
}
