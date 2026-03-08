interface Category {
  id: number;
  parentId: number | null;
  description: string;
  name: string;
  slug: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Drinks",
    slug: "drinks",
    parentId: null,
    description: "All beverages available in the cafe",
  },
  {
    id: 2,
    name: "Food",
    slug: "food",
    parentId: null,
    description: "Food items served in the cafe",
  },
  {
    id: 3,
    name: "Retail",
    slug: "retail",
    parentId: null,
    description: "Coffee beans and merchandise",
  },

  {
    id: 4,
    name: "Coffee",
    slug: "coffee",
    parentId: 1,
    description: "Espresso based and brewed coffee drinks",
  },
  {
    id: 5,
    name: "Tea",
    slug: "tea",
    parentId: 1,
    description: "Hot and iced tea beverages",
  },
  {
    id: 6,
    name: "Non Coffee",
    slug: "non-coffee",
    parentId: 1,
    description: "Drinks without coffee",
  },

  {
    id: 7,
    name: "Hot Coffee",
    slug: "hot-coffee",
    parentId: 4,
    description: "Hot espresso and brewed coffee drinks",
  },
  {
    id: 8,
    name: "Iced Coffee",
    slug: "iced-coffee",
    parentId: 4,
    description: "Cold coffee beverages",
  },

  {
    id: 9,
    name: "Hot Tea",
    slug: "hot-tea",
    parentId: 5,
    description: "Hot tea drinks",
  },
  {
    id: 10,
    name: "Iced Tea",
    slug: "iced-tea",
    parentId: 5,
    description: "Cold tea beverages",
  },

  {
    id: 11,
    name: "Chocolate Drinks",
    slug: "chocolate-drinks",
    parentId: 6,
    description: "Hot chocolate and mocha style drinks",
  },
  {
    id: 12,
    name: "Smoothies",
    slug: "smoothies",
    parentId: 6,
    description: "Fruit blended drinks",
  },

  {
    id: 13,
    name: "Breakfast",
    slug: "breakfast",
    parentId: 2,
    description: "Morning meals and light breakfast",
  },
  {
    id: 14,
    name: "Sandwiches",
    slug: "sandwiches",
    parentId: 2,
    description: "Savory sandwiches and wraps",
  },
  {
    id: 15,
    name: "Pastries",
    slug: "pastries",
    parentId: 2,
    description: "Baked pastries and sweet treats",
  },

  {
    id: 16,
    name: "Coffee Beans",
    slug: "coffee-beans",
    parentId: 3,
    description: "Whole bean coffee for brewing at home",
  },
  {
    id: 17,
    name: "Merchandise",
    slug: "merchandise",
    parentId: 3,
    description: "Mugs, tumblers, and cafe merchandise",
  },
];

export type { Category };
export { categories };
