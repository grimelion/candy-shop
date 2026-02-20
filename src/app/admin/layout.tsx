import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logoutAction } from "./actions"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-50 border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <h1 className="font-semibold text-sm text-slate-800">Admin Panel</h1>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Link
            href="/admin/site-info"
            className="block px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Store Info
          </Link>
          <Link
            href="/admin/content"
            className="block px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Content
          </Link>
          <Link
            href="/admin/boards"
            className="block px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Boards
          </Link>
        </nav>

        <div className="p-3 border-t">
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="w-full text-sm">
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white [&_[data-slot=input]]:bg-gray-50 [&_[data-slot=input]]:border-gray-400 [&_textarea]:bg-gray-50 [&_textarea]:border-gray-400">
        {children}
      </main>
    </div>
  )
}
