// Root khrienadmin layout: just a passthrough.
// Auth and sidebar rendering are handled by individual route groups:
//   (auth)/login  - no sidebar
//   (admin)/*     - with sidebar, requires auth
export default function KhrienAdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
