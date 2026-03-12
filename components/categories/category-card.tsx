"use client";

import { slugify } from "@/lib/utils";
import { Category } from "@/drizzle/schemas";
import { useUpdateCategoryMutation } from "@/hooks/categories/use-update-category-mutation";
import {
  AlertCircleIcon,
  CircleCheckIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "@/components/categories/category-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({ category }: CategoryCardProps) {
  const updateCategoryMutation = useUpdateCategoryMutation();

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <ButtonGroup>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" size="sm">
                  <EditIcon />
                  <span>Edit</span>
                </Button>
              }
            />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit the category</DialogTitle>
                <DialogDescription>
                  Update the input below, and click continue to update.
                </DialogDescription>
              </DialogHeader>
              <CategoryForm
                defaultValues={category}
                onSubmit={(values, form) =>
                  updateCategoryMutation.mutate(
                    {
                      params: { id: category.id },
                      data: { ...values, slug: slugify(values.name) },
                    },
                    { onSuccess: () => form.reset() },
                  )
                }
              >
                {(updateCategoryMutation.isError ||
                  updateCategoryMutation.isSuccess) && (
                  <Alert
                    variant={
                      updateCategoryMutation.isError ? "destructive" : "success"
                    }
                  >
                    <AlertCircleIcon />
                    <AlertTitle>
                      {updateCategoryMutation.isError
                        ? "Uh-oh, something went wrong!"
                        : "Yehey, congrats!"}
                    </AlertTitle>
                    <AlertDescription>
                      {updateCategoryMutation.isError
                        ? updateCategoryMutation.error.message
                        : updateCategoryMutation.data.message}
                    </AlertDescription>
                  </Alert>
                )}
              </CategoryForm>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive" size="sm">
                  <TrashIcon />
                  <span>Delete</span>
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this category and products using it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel render={<Button>Cancel</Button>} />
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => {
                    toast(
                      `You have successfully deleted ${category.name} category.`,
                      {
                        position: "bottom-right",
                        icon: (
                          <CircleCheckIcon className="size-5 stroke-emerald-500" />
                        ),
                      },
                    );
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export { CategoryCard };
