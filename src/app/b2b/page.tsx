import { siteConfig } from "@/content/site"
import { sections } from "@/content/sections"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckIcon, ArrowRightIcon, UsersIcon, BuildingIcon, TruckIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Corporate & Event Services",
  description: "Elevate your business with our premium candy and chocolate services. Corporate gifts, office programs, and event catering in the Philadelphia area.",
  keywords: ["corporate gifts", "office catering", "business events", "bulk candy orders", "corporate chocolate", "Philadelphia business catering"],
  openGraph: {
    title: "Corporate & Event Services | Candy Shop",
    description: "Elevate your business with our premium candy and chocolate services. Corporate gifts, office programs, and event catering.",
  }
}

const benefits = [
  {
    icon: <UsersIcon className="h-6 w-6" />,
    title: "Boost Team Morale",
    description: "Regular office treats that actually get people excited. Monthly deliveries, special occasion surprises, or just-because moments."
  },
  {
    icon: <BuildingIcon className="h-6 w-6" />,
    title: "Impress Clients",
    description: "Custom-branded packaging and premium presentations that leave a lasting impression. Perfect for client meetings or thank-you gifts."
  },
  {
    icon: <TruckIcon className="h-6 w-6" />,
    title: "Stress-Free Service",
    description: "We handle everything from consultation to delivery. Set up recurring orders and never worry about office treats again."
  },
  {
    icon: <StarIcon className="h-6 w-6" />,
    title: "Memorable Events",
    description: "Turn your next corporate event into something people actually talk about. Candy bars, dessert stations, and custom setups."
  }
]

const corporateServices = [
  {
    title: "Office Subscription Programs",
    description: "Monthly deliveries of fresh treats for your team",
    features: [
      "Customizable frequency and quantity",
      "Seasonal variety rotations",
      "Special dietary accommodations",
      "No long-term contracts required"
    ],
    badge: "Most Popular"
  },
  {
    title: "Client Gift Programs",
    description: "Premium gifts that strengthen business relationships",
    features: [
      "Custom branded packaging",
      "Personalized messaging",
      "Bulk order discounts",
      "White-glove delivery service"
    ]
  },
  {
    title: "Event Catering",
    description: "Full-service dessert and candy stations for events",
    features: [
      "On-site setup and breakdown",
      "Custom themed displays",
      "Attendant service available",
      "Accommodates any event size"
    ]
  }
]

export default function B2BPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6">Corporate Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {sections.b2b.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {sections.b2b.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="#contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="tel:{siteConfig.phone}">Call {siteConfig.phone}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Businesses Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand what it takes to make your business relationships sweeter.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-none">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Corporate Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible programs designed to fit your business needs and budget.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {corporateServices.map((service, index) => (
              <Card key={index} className="relative">
                {service.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    {service.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <CheckIcon className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your corporate program up and running.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Tell Us Your Needs",
                description: "Share your budget, frequency, team size, and any special requirements."
              },
              {
                step: "2",
                title: "We Create Your Plan",
                description: "Custom program proposal with pricing, delivery schedule, and product selection."
              },
              {
                step: "3",
                title: "Enjoy the Results",
                description: "Regular deliveries, happy teams, and impressed clients. Adjust anytime."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 2 && (
                  <ArrowRightIcon className="h-6 w-6 text-muted-foreground mx-auto mt-6 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Let&apos;s Start Something Sweet</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ready to elevate your business with premium confections? Tell us about your needs and we&apos;ll create a custom proposal.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Get Your Custom Quote</h3>
                <ContactForm defaultService="b2b" />
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Prefer to talk?</h4>
                  <p className="text-muted-foreground mb-2">
                    Call us during business hours for immediate assistance.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href={`tel:${siteConfig.phone}`}>
                      {siteConfig.phone}
                    </Link>
                  </Button>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Office Hours</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Monday - Friday: {siteConfig.hours.monday}</div>
                    <div>Saturday: {siteConfig.hours.saturday}</div>
                    <div>Sunday: {siteConfig.hours.sunday}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Time</h4>
                  <p className="text-sm text-muted-foreground">
                    We typically respond to B2B inquiries within 2 business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}