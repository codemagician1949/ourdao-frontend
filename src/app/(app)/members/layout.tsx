import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Members', template: '%s · OurDAO' },
  description: 'Browse DAO members and view individual member profiles.',
}

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return children
}
