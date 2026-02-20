import { getSiteConfig } from "@/lib/site-config"
import { BoardsForm } from "./_components/boards-form"

export default async function BoardsPage() {
  const config = await getSiteConfig()

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">
        Board Editor
      </h1>
      <BoardsForm boards={config.boards} />
    </div>
  )
}
