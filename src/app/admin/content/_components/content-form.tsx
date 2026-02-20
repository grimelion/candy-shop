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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import type { SiteConfig } from "@/types/site-config"
import { saveContentAction } from "../actions"

const contentSchema = z.object({
  hero: z.object({
    headline: z.string().min(1, "Headline is required"),
    subhead: z.string().min(1, "Subhead is required"),
    primaryCTA: z.string().min(1, "Primary CTA is required"),
  }),
  featured: z.object({
    title: z.string().min(1, "Featured title is required"),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      })
    ),
  }),
  gallery: z.object({
    title: z.string().min(1, "Gallery title is required"),
    description: z.string().min(1, "Gallery description is required"),
  }),
  b2b: z.object({
    title: z.string().min(1, "B2B title is required"),
    description: z.string().min(1, "B2B description is required"),
    services: z.array(z.string()),
  }),
  testimonials: z.object({
    title: z.string().min(1, "Testimonials title is required"),
    items: z.array(
      z.object({
        name: z.string(),
        review: z.string(),
        rating: z.number().min(1).max(5),
      })
    ),
  }),
  location: z.object({
    title: z.string().min(1, "Location title is required"),
    description: z.string().min(1, "Location description is required"),
  }),
})

type ContentFormValues = z.infer<typeof contentSchema>

interface ContentFormProps {
  defaultValues: SiteConfig
}

export function ContentForm({ defaultValues }: ContentFormProps) {
  const [isPending, setIsPending] = useState(false)

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      hero: defaultValues.hero,
      featured: defaultValues.featured,
      gallery: defaultValues.gallery,
      b2b: defaultValues.b2b,
      testimonials: defaultValues.testimonials,
      location: defaultValues.location,
    },
  })

  const onSubmit = (data: ContentFormValues) => {
    setIsPending(true)

    const formData = new FormData()

    // Hero
    formData.set("hero.headline", data.hero.headline)
    formData.set("hero.subhead", data.hero.subhead)
    formData.set("hero.primaryCTA", data.hero.primaryCTA)

    // Featured
    formData.set("featured.title", data.featured.title)
    data.featured.items.forEach((item, i) => {
      formData.set(`featured.items.${i}.title`, item.title)
      formData.set(`featured.items.${i}.description`, item.description)
      formData.set(`featured.items.${i}.image`, item.image)
    })

    // Gallery
    formData.set("gallery.title", data.gallery.title)
    formData.set("gallery.description", data.gallery.description)

    // B2B
    formData.set("b2b.title", data.b2b.title)
    formData.set("b2b.description", data.b2b.description)
    data.b2b.services.forEach((service, i) => {
      formData.set(`b2b.services.${i}`, service)
    })

    // Testimonials
    formData.set("testimonials.title", data.testimonials.title)
    data.testimonials.items.forEach((item, i) => {
      formData.set(`testimonials.items.${i}.name`, item.name)
      formData.set(`testimonials.items.${i}.review`, item.review)
      formData.set(`testimonials.items.${i}.rating`, String(item.rating))
    })

    // Location
    formData.set("location.title", data.location.title)
    formData.set("location.description", data.location.description)

    startTransition(async () => {
      const result = await saveContentAction(formData)

      if ("error" in result) {
        toast.error(result.error)
      } else {
        toast.success("Content saved!")
      }

      setIsPending(false)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="hero">
          <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="b2b">B2B</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          {/* Hero */}
          <TabsContent value="hero" className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Hero Section
            </h2>
            <FormField
              control={form.control}
              name="hero.headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hero.subhead"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subheadline</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hero.primaryCTA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary CTA Button Text</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* Featured */}
          <TabsContent value="featured" className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Featured Section
            </h2>
            <FormField
              control={form.control}
              name="featured.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {[0, 1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Item {i + 1}
                </p>
                <FormField
                  control={form.control}
                  name={`featured.items.${i}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`featured.items.${i}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`featured.items.${i}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Path</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="/images/example.jpg"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery" className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Gallery Section
            </h2>
            <FormField
              control={form.control}
              name="gallery.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gallery.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          {/* B2B */}
          <TabsContent value="b2b" className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              B2B Section
            </h2>
            <FormField
              control={form.control}
              name="b2b.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="b2b.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-3">
              <p className="text-sm font-medium text-slate-700">Services</p>
              {[0, 1, 2, 3].map((i) => (
                <FormField
                  key={i}
                  control={form.control}
                  name={`b2b.services.${i}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-500">
                        Service {i + 1}
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </TabsContent>

          {/* Testimonials */}
          <TabsContent value="testimonials" className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Testimonials Section
            </h2>
            <FormField
              control={form.control}
              name="testimonials.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {[0, 1, 2].map((i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Testimonial {i + 1}
                </p>
                <FormField
                  control={form.control}
                  name={`testimonials.items.${i}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`testimonials.items.${i}.review`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`testimonials.items.${i}.rating`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min={1}
                          max={5}
                          disabled={isPending}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </TabsContent>

          {/* Location */}
          <TabsContent value="location" className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Location Section
            </h2>
            <FormField
              control={form.control}
              name="location.title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? "Saving..." : "Save All Changes"}
        </Button>
      </form>
    </Form>
  )
}
