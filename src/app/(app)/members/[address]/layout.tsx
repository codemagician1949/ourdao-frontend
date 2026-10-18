import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Member Profile',
  description: 'View a DAO member profile: voting weight, stake, loan history.',
  robots: { index: false },
}

export default function MemberAddressLayout({ children }: { children: React.ReactNode }) {
  return children
}
