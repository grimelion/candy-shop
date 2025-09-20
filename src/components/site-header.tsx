"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigation } from "@/content/nav";
import { siteConfig } from "@/content/site";
import {
  AnnouncementBar,
  seasonalAnnouncements,
} from "@/components/announcement-bar";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <AnnouncementBar {...seasonalAnnouncements.shipping} /> */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigation.main.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Link>
            </Button>
            {navigation.cta.map((item) => (
              <Button key={item.name} variant={item.variant} size="sm" asChild>
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="sm">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {siteConfig.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navigation.main.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-2 py-1 text-lg hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`tel:${siteConfig.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {siteConfig.phone}
                    </Link>
                  </Button>
                  {navigation.cta.map((item) => (
                    <Button
                      key={item.name}
                      variant={item.variant}
                      size="sm"
                      asChild
                    >
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
