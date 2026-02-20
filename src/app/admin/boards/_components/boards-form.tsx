"use client"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { BoardSize } from "@/types/site-config"
import { saveBoardsAction } from "../actions"

interface BoardsFormProps {
  boards: BoardSize[]
}

export function BoardsForm({ boards }: BoardsFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(boards.map((b) => [b.id, b.imageUrl]))
  )
  const formRef = useRef<HTMLFormElement>(null)

  const handleImageChange = (
    boardId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreviews((prev) => ({ ...prev, [boardId]: url }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    const result = await saveBoardsAction(formData)

    if ("error" in result) {
      toast.error(result.error)
    } else {
      toast.success("Boards saved!")
    }

    setIsPending(false)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6"
    >
      {boards.map((board) => (
        <Card key={board.id}>
          <CardHeader>
            <CardTitle className="text-base capitalize">{board.id} Board</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label htmlFor={`${board.id}.name`}>Name</Label>
              <Input
                id={`${board.id}.name`}
                name={`${board.id}.name`}
                defaultValue={board.name}
                disabled={isPending}
              />
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <Label htmlFor={`${board.id}.price`}>Price</Label>
              <Input
                id={`${board.id}.price`}
                name={`${board.id}.price`}
                defaultValue={board.price}
                placeholder="e.g. Starting at $45"
                disabled={isPending}
              />
            </div>

            {/* Weight and Serves */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor={`${board.id}.weight`}>Weight</Label>
                <Input
                  id={`${board.id}.weight`}
                  name={`${board.id}.weight`}
                  defaultValue={board.weight}
                  placeholder="e.g. 1lb"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor={`${board.id}.serves`}>Serves</Label>
                <Input
                  id={`${board.id}.serves`}
                  name={`${board.id}.serves`}
                  defaultValue={board.serves}
                  placeholder="e.g. 1-3 people"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor={`${board.id}.description`}>Description</Label>
              <Textarea
                id={`${board.id}.description`}
                name={`${board.id}.description`}
                defaultValue={board.description}
                rows={3}
                disabled={isPending}
              />
            </div>

            {/* Most Popular */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`${board.id}.popular`}
                name={`${board.id}.popular`}
                defaultChecked={board.popular}
                disabled={isPending}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor={`${board.id}.popular`} className="cursor-pointer">
                Mark as Most Popular
              </Label>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label>Current Image</Label>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreviews[board.id] ?? board.imageUrl}
                alt={`${board.name} preview`}
                className="w-32 h-32 object-cover rounded border"
              />
              <div className="space-y-1.5">
                <Label htmlFor={`image_${board.id}`} className="text-slate-600 text-sm">
                  Replace Image
                </Label>
                <Input
                  id={`image_${board.id}`}
                  name={`image_${board.id}`}
                  type="file"
                  accept="image/*"
                  disabled={isPending}
                  onChange={(e) => handleImageChange(board.id, e)}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Saving..." : "Save All Boards"}
      </Button>
    </form>
  )
}
