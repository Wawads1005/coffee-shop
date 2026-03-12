"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils";
import { GetCategoriesQuerySchema } from "@/validators/categories/get-categories";

import { useCategoryQuery } from "@/hooks/categories/use-category-query";
import { useCategoriesQuery } from "@/hooks/categories/use-categories-query";
import { useCreateCategoryMutation } from "@/hooks/categories/use-create-category-mutation";

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
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  PackageOpenIcon,
  PlusCircleIcon,
  RefreshCcwIcon,
  TagIcon,
} from "lucide-react";

interface CategoriesPageSearchParams {
  id?: string;
}

interface CategoriesPageProps {
  searchParams: Promise<CategoriesPageSearchParams>;
}

function CategoriesPage({ ...props }: CategoriesPageProps) {
  const router = useRouter();
  const searchParams = React.use(props.searchParams);
  const query: GetCategoriesQuerySchema = { filter: { parentId: null } };

  const categoriesQuery = useCategoriesQuery(query);
  const categories = React.useMemo(
    () => (categoriesQuery.data ? categoriesQuery.data.categories : []),
    [categoriesQuery.data],
  );

  const createCategoryMutation = useCreateCategoryMutation();

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
                <CategoryForm
                  onSubmit={(values, form) =>
                    createCategoryMutation.mutate(
                      { ...values, slug: slugify(values.name) },
                      { onSuccess: () => form.reset() },
                    )
                  }
                >
                  {(createCategoryMutation.isError ||
                    createCategoryMutation.isSuccess) && (
                    <Alert
                      variant={
                        createCategoryMutation.isError
                          ? "destructive"
                          : "success"
                      }
                    >
                      <AlertCircleIcon />
                      <AlertTitle>
                        {createCategoryMutation.isError
                          ? "Uh-oh, something went wrong!"
                          : "Yehey, congrats!"}
                      </AlertTitle>
                      <AlertDescription>
                        {createCategoryMutation.isError
                          ? createCategoryMutation.error.message
                          : createCategoryMutation.data.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </CategoryForm>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex w-full flex-col gap-1 md:max-w-80">
          {categories.map((category) => {
            return (
              <CategoryCollapsibleBranch
                onSelectCategory={(categoryId) =>
                  router.push(`/admin/categories?id=${categoryId}`)
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
          {searchParams.id ? (
            <SelectedCategoryCard id={searchParams.id} />
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

interface SelectedCategoryCardProps {
  id: string;
}

function SelectedCategoryCard({ id }: SelectedCategoryCardProps) {
  const categoryQuery = useCategoryQuery({ id });
  const category = categoryQuery.data ? categoryQuery.data.category : null;

  if (categoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!category) {
    return (
      <Alert variant="destructive">
        <AlertTriangleIcon />
        <AlertTitle>No category found</AlertTitle>
        <AlertDescription>
          Category didn't exists in our database, please enter a valid url.
        </AlertDescription>
        <AlertAction>
          <Button
            variant="ghost"
            size="sm"
            onClick={async () => await categoryQuery.refetch()}
          >
            <RefreshCcwIcon />
            <span>Retry</span>
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  return <CategoryCard category={category} />;
}

export default CategoriesPage;
