"use client"

import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendInquiry, type InquiryFormState } from "@/app/actions/sendInquiry"

const initialState: InquiryFormState = {}

interface ContactFormProps {
  defaultService?: string
  showTitle?: boolean
}

export function ContactForm({ defaultService, showTitle = true }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(sendInquiry, initialState)

  useEffect(() => {
    if (state.success) {
      toast.success("Message sent!", {
        description: "We'll get back to you within 24 hours."
      })
    } else if (state.errors?.general) {
      toast.error("Failed to send message", {
        description: state.errors.general[0]
      })
    }
  }, [state])

  return (
    <section className={showTitle ? "py-24 bg-background" : ""}>
      <div className={showTitle ? "container mx-auto px-4" : ""}>
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to create something sweet? Tell us about your needs and we&apos;ll craft the perfect solution.
            </p>
          </div>
        )}

        <Card className={showTitle ? "max-w-2xl mx-auto" : ""}>
          <CardHeader>
            <CardTitle>Send Us an Inquiry</CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              {/* Honeypot field for spam protection */}
              <input
                type="text"
                name="honeypot"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {state.errors?.general && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{state.errors.general[0]}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your full name"
                    aria-describedby={state.errors?.name ? "name-error" : undefined}
                  />
                  {state.errors?.name && (
                    <p id="name-error" className="text-destructive text-sm">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    aria-describedby={state.errors?.email ? "email-error" : undefined}
                  />
                  {state.errors?.email && (
                    <p id="email-error" className="text-destructive text-sm">
                      {state.errors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(267) 555-0123"
                    aria-describedby={state.errors?.phone ? "phone-error" : undefined}
                  />
                  {state.errors?.phone && (
                    <p id="phone-error" className="text-destructive text-sm">
                      {state.errors.phone[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Interest *</Label>
                  <Select name="service" required defaultValue={defaultService}>
                    <SelectTrigger>
                      <SelectValue placeholder="What can we help with?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gifts">Candy Gifts & Baskets</SelectItem>
                      <SelectItem value="chocolate-boards">Chocolate Charcuterie Boards</SelectItem>
                      <SelectItem value="events">Event Candy Bars</SelectItem>
                      <SelectItem value="b2b">Corporate/B2B Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {state.errors?.service && (
                    <p className="text-destructive text-sm">
                      {state.errors.service[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us about your event, preferences, or any special requirements..."
                  rows={4}
                  aria-describedby={state.errors?.message ? "message-error" : undefined}
                />
                {state.errors?.message && (
                  <p id="message-error" className="text-destructive text-sm">
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isPending}>
                {isPending ? "Sending..." : "Send Inquiry"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Prefer to call? Reach us at{" "}
                <a href="tel:+12675889191" className="text-primary hover:underline">
                  (267) 588-9191
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}