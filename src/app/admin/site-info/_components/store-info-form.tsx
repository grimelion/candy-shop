"use client"

import { startTransition, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { SiteConfig } from "@/types/site-config"
import { saveStoreInfoAction } from "../actions"

const storeInfoSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  hours: z.object({
    sunday: z.string(),
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
    saturday: z.string(),
  }),
  social: z.object({
    instagram: z.string(),
    yelp: z.string(),
    facebook: z.string(),
  }),
})

type StoreInfoFormValues = z.infer<typeof storeInfoSchema>

const DAYS: Array<keyof StoreInfoFormValues["hours"]> = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

interface StoreInfoFormProps {
  defaultValues: SiteConfig
}

export function StoreInfoForm({ defaultValues }: StoreInfoFormProps) {
  const [isPending, setIsPending] = useState(false)

  const form = useForm<StoreInfoFormValues>({
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      storeName: defaultValues.storeName,
      tagline: defaultValues.tagline,
      phone: defaultValues.phone,
      address: defaultValues.address,
      hours: defaultValues.hours,
      social: defaultValues.social,
    },
  })

  const onSubmit = (data: StoreInfoFormValues) => {
    setIsPending(true)

    const formData = new FormData()
    formData.set("storeName", data.storeName)
    formData.set("tagline", data.tagline)
    formData.set("phone", data.phone)
    formData.set("address", data.address)

    for (const day of DAYS) {
      formData.set(`hours.${day}`, data.hours[day])
    }

    formData.set("social.instagram", data.social.instagram)
    formData.set("social.yelp", data.social.yelp)
    formData.set("social.facebook", data.social.facebook)

    startTransition(async () => {
      const result = await saveStoreInfoAction(formData)

      if ("error" in result) {
        toast.error(result.error)
      } else {
        toast.success("Store info saved!")
      }

      setIsPending(false)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic info */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={2} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Hours */}
        <div>
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            Business Hours
          </h2>
          <div className="space-y-3">
            {DAYS.map((day) => (
              <FormField
                key={day}
                control={form.control}
                name={`hours.${day}`}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="w-24 shrink-0 capitalize text-slate-600">
                      {day}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. 10:00 AM - 7:30 PM"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Social links */}
        <div>
          <h2 className="text-sm font-semibold text-slate-800 mb-3">
            Social Links
          </h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="social.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://www.instagram.com/..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.yelp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yelp URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://www.yelp.com/biz/..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://www.facebook.com/..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  )
}
