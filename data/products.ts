interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const products: Product[] = [
  // Hot Coffee
  {
    id: 1,
    categoryId: 7,
    name: "Espresso",
    description: "Rich and concentrated shot of espresso",
    price: 120,
    image: "/products/espresso.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    categoryId: 7,
    name: "Americano",
    description: "Espresso diluted with hot water",
    price: 140,
    image: "/products/americano.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    categoryId: 7,
    name: "Cappuccino",
    description: "Espresso with steamed milk and thick foam",
    price: 160,
    image: "/products/cappuccino.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    categoryId: 7,
    name: "Cafe Latte",
    description: "Smooth espresso with steamed milk",
    price: 170,
    image: "/products/latte.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Iced Coffee
  {
    id: 5,
    categoryId: 8,
    name: "Iced Americano",
    description: "Chilled espresso with cold water and ice",
    price: 150,
    image: "/products/iced-americano.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    categoryId: 8,
    name: "Iced Latte",
    description: "Espresso with cold milk over ice",
    price: 180,
    image: "/products/iced-latte.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    categoryId: 8,
    name: "Cold Brew",
    description: "Slow brewed coffee served cold",
    price: 190,
    image: "/products/cold-brew.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Hot Tea
  {
    id: 8,
    categoryId: 9,
    name: "English Breakfast Tea",
    description: "Classic strong black tea",
    price: 120,
    image: "/products/english-breakfast.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 9,
    categoryId: 9,
    name: "Green Tea",
    description: "Light and refreshing traditional green tea",
    price: 120,
    image: "/products/green-tea.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Iced Tea
  {
    id: 10,
    categoryId: 10,
    name: "Iced Lemon Tea",
    description: "Refreshing iced tea with lemon",
    price: 140,
    image: "/products/iced-lemon-tea.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 11,
    categoryId: 10,
    name: "Peach Iced Tea",
    description: "Sweet iced tea with peach flavor",
    price: 150,
    image: "/products/peach-iced-tea.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Chocolate Drinks
  {
    id: 12,
    categoryId: 11,
    name: "Hot Chocolate",
    description: "Creamy chocolate drink with steamed milk",
    price: 170,
    image: "/products/hot-chocolate.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 13,
    categoryId: 11,
    name: "Mocha",
    description: "Espresso with chocolate and steamed milk",
    price: 180,
    image: "/products/mocha.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Smoothies
  {
    id: 14,
    categoryId: 12,
    name: "Strawberry Smoothie",
    description: "Blended strawberries with yogurt and ice",
    price: 190,
    image: "/products/strawberry-smoothie.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 15,
    categoryId: 12,
    name: "Mango Smoothie",
    description: "Sweet mango blended smoothie",
    price: 190,
    image: "/products/mango-smoothie.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Breakfast
  {
    id: 16,
    categoryId: 13,
    name: "Pancake Stack",
    description: "Fluffy pancakes served with maple syrup",
    price: 220,
    image: "/products/pancakes.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 17,
    categoryId: 13,
    name: "Egg and Toast",
    description: "Scrambled eggs with toasted bread",
    price: 200,
    image: "/products/egg-toast.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Sandwiches
  {
    id: 18,
    categoryId: 14,
    name: "Ham and Cheese Sandwich",
    description: "Toasted sandwich with ham and melted cheese",
    price: 210,
    image: "/products/ham-cheese.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 19,
    categoryId: 14,
    name: "Chicken Pesto Sandwich",
    description: "Grilled chicken with pesto and fresh vegetables",
    price: 240,
    image: "/products/chicken-pesto.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Pastries
  {
    id: 20,
    categoryId: 15,
    name: "Butter Croissant",
    description: "Flaky French butter croissant",
    price: 140,
    image: "/products/croissant.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 21,
    categoryId: 15,
    name: "Chocolate Muffin",
    description: "Moist muffin filled with chocolate chips",
    price: 150,
    image: "/products/chocolate-muffin.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Coffee Beans
  {
    id: 22,
    categoryId: 16,
    name: "Brazil Santos Beans",
    description: "Medium roast Brazilian coffee beans",
    price: 550,
    image: "/products/brazil-beans.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 23,
    categoryId: 16,
    name: "Ethiopian Yirgacheffe Beans",
    description: "Floral and fruity Ethiopian beans",
    price: 620,
    image: "/products/ethiopian-beans.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Merchandise
  {
    id: 24,
    categoryId: 17,
    name: "Cafe Logo Mug",
    description: "Ceramic mug with cafe logo",
    price: 300,
    image: "/products/mug.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 25,
    categoryId: 17,
    name: "Insulated Tumbler",
    description: "Stainless steel tumbler for hot and cold drinks",
    price: 650,
    image: "/products/tumbler.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export type { Product };
export { products };
