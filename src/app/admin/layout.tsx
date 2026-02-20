import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logoutAction } from "./actions"

const navLinks = [
  { href: "/admin/site-info", label: "Store Info" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/boards", label: "Boards" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Navigation — top strip on mobile, sidebar on desktop */}
      <aside className="bg-slate-50 border-b md:border-b-0 md:border-r md:w-56 md:flex md:flex-col md:shrink-0">
        {/* Header row */}
        <div className="flex items-center justify-between px-4 py-3 border-b md:py-4">
          <h1 className="font-semibold text-sm text-slate-800">Admin Panel</h1>
          {/* Logout button visible only on mobile */}
          <form action={logoutAction} className="md:hidden">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="text-xs text-slate-600 h-7 px-2"
            >
              Logout
            </Button>
          </form>
        </div>

        {/* Nav links — horizontal scrollable on mobile, vertical on desktop */}
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible md:flex-1 p-2 md:p-3 gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="whitespace-nowrap shrink-0 px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Logout button visible only on desktop */}
        <div className="hidden md:block p-3 border-t">
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="w-full text-sm">
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main id="admin-content" className="flex-1 p-4 md:p-8 bg-white min-w-0">
        {children}
      </main>
    </div>
  )
}
