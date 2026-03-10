"use client";

import { CategoryCollapsibleBranch } from "@/components/categories/category-collapsible-branch";
import { CategoryCard } from "@/components/categories/category-card";
import { CategoryForm } from "@/components/categories/category-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categories } from "@/data/categories";
import { PackageOpenIcon, PlusCircleIcon, TagIcon } from "lucide-react";
import * as React from "react";

function CategoriesPage() {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | null
  >(null);

  const selectedCategory = React.useMemo(() => {
    if (!selectedCategoryId) {
      return null;
    }

    const foundSelectedCategory = categories.find(
      (category) => category.id === selectedCategoryId,
    );

    if (!foundSelectedCategory) {
      return null;
    }

    return foundSelectedCategory;
  }, [selectedCategoryId]);

  return (
    <div className="container mx-auto w-full max-w-360 space-y-4 px-4 py-4 sm:px-8 md:space-y-8 md:px-16 md:py-8">
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            Content Management for Categories
          </h1>
          <p className="text-muted-foreground">
            Manage your categories by creating, updating, or deleting a
            category.
          </p>
        </div>
        <div className="flex items-center">
          <div className="ml-auto">
            <Dialog>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <DialogTrigger
                      render={
                        <Button size="icon">
                          <PlusCircleIcon />
                        </Button>
                      }
                    />
                  }
                />
                <TooltipContent>Add category</TooltipContent>
              </Tooltip>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new category</DialogTitle>
                  <DialogDescription>
                    Fill up the form below, and click continue to create a new
                    category.
                  </DialogDescription>
                </DialogHeader>
                <CategoryForm>
                  {/* <div className="rounded-md bg-emerald-500/15 px-4 py-2">
                    <p className="text-sm text-emerald-500">
                      You have successfully created a new category.
                    </p>
                  </div> */}
                </CategoryForm>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-1 md:max-w-80">
          {categories
            .filter((category) => category.parentId === null)
            .map((category) => {
              return (
                <CategoryCollapsibleBranch
                  onSelectCategory={(categoryId) =>
                    setSelectedCategoryId((selectedCategoryId) =>
                      selectedCategoryId === categoryId ? null : categoryId,
                    )
                  }
                  key={category.id}
                  category={category}
                >
                  <TagIcon />
                </CategoryCollapsibleBranch>
              );
            })}
        </div>
        <div className="flex-1">
          {selectedCategory ? (
            <CategoryCard category={selectedCategory} />
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <PackageOpenIcon />
                </EmptyMedia>
                <EmptyTitle>No selected category</EmptyTitle>
                <EmptyDescription>
                  Select a category to view, update or delete.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
