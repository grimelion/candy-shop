import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

const sections = [
  {
    title: "Store Info",
    description: "Edit name, phone, hours, address, and social links",
    href: "/admin/site-info",
  },
  {
    title: "Content",
    description: "Edit page texts, hero headline, and section copy",
    href: "/admin/content",
  },
  {
    title: "Boards",
    description: "Edit board prices, descriptions, and images",
    href: "/admin/boards",
  },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 md:mb-6">
        Welcome to the Admin Panel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Card key={section.href} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={section.href}
                className="text-sm font-medium text-slate-700 hover:text-slate-900 underline-offset-4 hover:underline"
              >
                Edit &rarr;
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
