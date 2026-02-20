import { getSiteConfig } from "@/lib/site-config"
import { ContentForm } from "./_components/content-form"

export default async function ContentPage() {
  const config = await getSiteConfig()

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4 md:mb-6">
        Content Editor
      </h1>
      <ContentForm defaultValues={config} />
    </div>
  )
}
