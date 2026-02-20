import { getSiteConfig } from "@/lib/site-config"
import { StoreInfoForm } from "./_components/store-info-form"

export default async function SiteInfoPage() {
  const config = await getSiteConfig()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Store Info</h1>
      <StoreInfoForm defaultValues={config} />
    </div>
  )
}
