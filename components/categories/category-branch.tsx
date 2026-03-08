"use client";

import { categories, Category } from "@/data/categories";
import { ChevronRightIcon, TagIcon, TagsIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

interface CategoryBranchProps {
  category: Category;
  onSelectCategory?: (categoryId: number) => void;
}

function CategoryBranch({ category, onSelectCategory }: CategoryBranchProps) {
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
            className="flex-1 justify-start"
          >
            <TagsIcon />
            <span>{category.name}</span>
          </Button>

          <CollapsibleTrigger
            render={
              <Button variant="ghost">
                <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" />
              </Button>
            }
          />
        </ButtonGroup>
        <CollapsibleContent className="ml-6">
          <Collapsible>
            <div className="flex flex-col gap-1">
              {subcategories.map((subcategory) => {
                return (
                  <CategoryBranch
                    key={subcategory.id}
                    category={subcategory}
                    onSelectCategory={onSelectCategory}
                  />
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
      className="justify-start"
      onClick={() => onSelectCategory?.(category.id)}
    >
      <TagIcon />
      <span>{category.name}</span>
    </Button>
  );
}

export { CategoryBranch };
