"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Skeleton } from "@/components/ui/skeleton";
import { faqs } from "@/data/faqs";
import { stats } from "@/data/stats";
import { Category } from "@/drizzle/schemas";
import { useCategoriesQuery } from "@/hooks/categories/use-categories-query";
import { useProductsQuery } from "@/hooks/products/use-products-query";
import { cn } from "@/lib/utils";
import { MailIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

function Homepage() {
  const categoriesQuery = useCategoriesQuery({ filter: { parentId: null } });
  const categories = categoriesQuery.data
    ? categoriesQuery.data.categories
    : [];

  return (
    <div>
      <div className="relative">
        <div
          className="z-0 h-[80vh] w-full bg-cover bg-center bg-no-repeat brightness-50"
          style={{ backgroundImage: `url("/cover.jpg")` }}
        />
        <div className="dark:text-foreground text-background absolute inset-0 top-1/2 mx-auto max-h-min w-full max-w-360 -translate-y-1/2 space-y-4 px-4 md:space-y-8 md:px-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-7xl">
              Perfect Coffee,
              <br />
              Perfect Moment
            </h1>
            <p className="text-sm sm:text-base md:text-lg">
              Handcrafted with love, served with passion. Experience the finest
              coffee in town.
            </p>
          </div>
          <div className="space-x-2">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/products">Explore Products</Link>}
            />
            <Button size="lg" variant="secondary">
              <span>Contact Us</span>
            </Button>
          </div>
        </div>
      </div>
      <div id="about">
        <div className="mx-auto w-full max-w-360 px-4 py-8 md:px-8 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center gap-2 md:gap-4">
              <h3 className="text-2xl font-semibold text-balance sm:text-4xl">
                Crafting Coffee Excellence Since 2009
              </h3>
              <p className="text-sm text-balance sm:text-base">
                At Brew & Bean, we believe that great coffee brings people
                together. Our journey began with a simple mission: to serve the
                finest coffee while creating a warm, welcoming space for our
                community.
              </p>
              <p className="text-sm text-balance sm:text-base">
                We source our beans directly from sustainable farms around the
                world, ensuring every cup tells a story of quality, ethics, and
                exceptional taste.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src="/about_us.jpg"
                className="size-full max-h-full max-w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
        <div className="bg-card text-card-foreground">
          <div className="mx-auto w-full max-w-360 space-y-8 px-4 py-8 md:space-y-16 md:px-8 md:py-16">
            <div className="flex flex-col gap-2 md:gap-4">
              <h3 className="text-2xl font-semibold sm:text-4xl">
                Our Achievements
              </h3>
              <p className="text-sm sm:text-base">
                Providing businesses with effective tools to improve workflows,
                boost efficiency, and encourage growth.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
              {stats.map((stat) => {
                return (
                  <div className="space-y-2" key={stat.id}>
                    <div className="font-mono text-2xl font-bold md:text-4xl">
                      {stat.value}
                      {stat.unitOfMeasure === "percentage" && "%"}
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-360 space-y-4 px-4 py-8 md:space-y-8 md:px-8 md:py-16">
        {categoriesQuery.isLoading
          ? Array.from({ length: 5 }, (_, i) => {
              return (
                <CategoryCardSkeleton
                  key={i}
                  className={cn(
                    i % 2 === 0
                      ? "flex-col md:flex-row-reverse"
                      : "flex-col md:flex-row",
                  )}
                />
              );
            })
          : categories.map((category, i) => {
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  className={cn(
                    i % 2 === 0
                      ? "flex-col md:flex-row-reverse"
                      : "flex-col md:flex-row",
                  )}
                />
              );
            })}
      </div>
      <div id="contact">
        <div className="bg-card text-card-foreground">
          <div className="mx-auto w-full max-w-360 space-y-4 px-4 py-8 md:space-y-8 md:px-8 md:py-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold md:text-4xl">
                How can we help?
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Check our FAQ for quick answers or send us a message.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageCircleIcon className="size-4" />
                  <span className="text-xl font-semibold">
                    Frequently Asked Questions
                  </span>
                </div>
                <Accordion>
                  {faqs.map((faq) => {
                    return (
                      <AccordionItem key={faq.id}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MailIcon className="size-4" />
                  <span className="text-xl font-semibold">
                    Still have questions?
                  </span>
                </div>
                <FieldGroup>
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input placeholder="John Doe" />
                      <FieldContent>
                        <FieldDescription>
                          Please enter your name to know what should we call
                          you.
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input placeholder="foobar@example.com" />
                      <FieldContent>
                        <FieldDescription>
                          Please enter your email to know where should we
                          response to you.
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Message</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea placeholder="What's your vision and mission?" />
                      <InputGroupAddon align="block-end" className="border-t">
                        <InputGroupText>
                          Maximum of 255 characters.
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldContent>
                      <FieldDescription>
                        What do you need to asked about us?
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                  <Field>
                    <Button>Continue</Button>
                  </Field>
                </FieldGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CategoryCardProps extends React.ComponentProps<"div"> {
  category: Category;
}

function CategoryCard({ category, className, ...props }: CategoryCardProps) {
  const productsQuery = useProductsQuery({
    filter: { category: category.slug },
    pagination: { limit: 1 },
  });
  const [product] = productsQuery.data ? productsQuery.data.products : [];

  if (productsQuery.isLoading) {
    return <CategoryCardSkeleton className={className} {...props} />;
  }

  if (!product) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-card text-card-foregroundx flex overflow-hidden rounded-md shadow",
        className,
      )}
      {...props}
    >
      <div className="aspect-video max-h-80 flex-1/2 shrink-0">
        <img
          src={product.image}
          alt={product.description}
          className="size-full max-h-full max-w-full shrink-0 object-cover"
        />
      </div>
      <div className="flex flex-1/2 flex-col items-center justify-center gap-4 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold md:text-3xl">
            {category.name}
          </h3>
          <p className="text-muted-foreground text-sm">
            {category.description}
          </p>
        </div>
        <Link
          href={`/products?category=${category.slug}`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Explore {category.name}
        </Link>
      </div>
    </div>
  );
}

interface CategoryCardSkeletonProps extends React.ComponentProps<"div"> {}

function CategoryCardSkeleton({
  className,
  ...props
}: CategoryCardSkeletonProps) {
  return (
    <div
      className={cn(
        "bg-card text-card-foregroundx flex overflow-hidden rounded-md shadow",
        className,
      )}
      {...props}
    >
      <div className="aspect-video max-h-80 flex-1/2 shrink-0">
        <Skeleton className="size-full max-h-full max-w-full rounded-none" />
      </div>
      <div className="flex flex-1/2 flex-col items-center justify-center gap-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Skeleton className="h-8 w-52" />
          <Skeleton className="h-8 w-80" />
        </div>
        <Skeleton className="h-8 w-28" />
      </div>
    </div>
  );
}

export default Homepage;
