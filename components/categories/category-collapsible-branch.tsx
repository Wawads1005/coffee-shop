"use client";

import * as React from "react";
import { categories, Category } from "@/data/categories";
import { ChevronRightIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

interface CategoryCollapsibleBranchProps extends React.ComponentProps<
  typeof Button
> {
  category: Category;
  onSelectCategory?: (categoryId: number) => void;
}

function CategoryCollapsibleBranch({
  category,
  onSelectCategory,
  children,
  className,
  ...props
}: CategoryCollapsibleBranchProps) {
  const subcategories = categories.filter(
    (subcategory) => subcategory.parentId === category.id,
  );

  if (subcategories.length) {
    return (
      <Collapsible>
        <ButtonGroup className="w-full">
          <Button
            onClick={() => onSelectCategory?.(category.id)}
            variant="ghost"
            className={cn("flex-1 justify-start", className)}
            {...props}
          >
            {children}
            <span>{category.name}</span>
          </Button>

          <CollapsibleTrigger
            render={
              <Button variant="ghost" size="icon">
                <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" />
              </Button>
            }
          />
        </ButtonGroup>
        <CollapsibleContent className="ml-6">
          <Collapsible>
            <div className="flex flex-col">
              {subcategories.map((subcategory) => {
                return (
                  <CategoryCollapsibleBranch
                    key={subcategory.id}
                    category={subcategory}
                    onSelectCategory={onSelectCategory}
                    className={cn("", className)}
                    {...props}
                  >
                    {children}
                  </CategoryCollapsibleBranch>
                );
              })}
            </div>
          </Collapsible>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      variant="ghost"
      className={cn("justify-start")}
      onClick={() => onSelectCategory?.(category.id)}
      {...props}
    >
      {children}
      <span>{category.name}</span>
    </Button>
  );
}

export { CategoryCollapsibleBranch };
