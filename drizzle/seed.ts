import "dotenv/config";
import { db } from "@/lib/db";
import { productsTable } from "@/drizzle/tables/products";
import { categoriesTable } from "@/drizzle/tables/categories";
import { slugify } from "@/lib/utils";

async function clearTables() {
  try {
    const productsResponse = await db.delete(productsTable);
    console.log(
      `[log]: Successfully cleared products table, deleted ${productsResponse.rowCount}`,
    );
    const categoriesResponse = await db.delete(categoriesTable);

    console.log(
      `[log]: Successfully cleared categories table, deleted ${categoriesResponse.rowCount}`,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon clearing tables, ${error.message}`,
      );
    }
  }
}

async function seedData() {
  try {
    const [drinks, foods, retails] = await db
      .insert(categoriesTable)
      .values([
        {
          name: "Drinks",
          slug: "drinks",
          parentId: null,
          description: "All beverages available in the cafe",
        },
        {
          name: "Foods",
          slug: "foods",
          parentId: null,
          description: "Food items served in the cafe",
        },
        {
          name: "Retails",
          slug: "retails",
          parentId: null,
          description: "Coffee beans and merchandise",
        },
      ])
      .returning();

    if (!drinks || !foods || !retails) {
      return;
    }

    const [coffee, tea, nonCoffee] = await db
      .insert(categoriesTable)
      .values([
        {
          name: "Coffee",
          slug: "coffee",
          parentId: drinks.id,
          description: "Espresso based and brewed coffee drinks",
        },
        {
          name: "Tea",
          slug: "tea",
          parentId: drinks.id,
          description: "Hot and iced tea beverages",
        },
        {
          name: "Non Coffee",
          slug: "non-coffee",
          parentId: drinks.id,
          description: "Drinks without coffee",
        },
      ])
      .returning();

    if (!coffee || !tea || !nonCoffee) {
      return;
    }

    const [hotCoffee, icedCoffee] = await db
      .insert(categoriesTable)
      .values([
        {
          name: "Hot Coffee",
          slug: "hot-coffee",
          parentId: coffee.id,
          description: "Hot espresso and brewed coffee drinks",
        },
        {
          name: "Iced Coffee",
          slug: "iced-coffee",
          parentId: coffee.id,
          description: "Cold coffee beverages",
        },
      ])
      .returning();

    if (!hotCoffee || !icedCoffee) {
      return;
    }

    const [hotTea, icedTea] = await db
      .insert(categoriesTable)
      .values([
        {
          name: "Hot Tea",
          slug: "hot-tea",
          parentId: tea.id,
          description: "Hot tea drinks",
        },
        {
          name: "Iced Tea",
          slug: "iced-tea",
          parentId: tea.id,
          description: "Cold tea beverages",
        },
      ])
      .returning();

    if (!hotTea || !icedTea) {
      return;
    }

    const [chocolateDrinks, smoothies] = await db
      .insert(categoriesTable)
      .values([
        {
          name: "Chocolate Drinks",
          slug: "chocolate-drinks",
          parentId: nonCoffee.id,
          description: "Hot chocolate and mocha style drinks",
        },
        {
          name: "Smoothies",
          slug: "smoothies",
          parentId: nonCoffee.id,
          description: "Fruit blended drinks",
        },
      ])
      .returning();

    if (!chocolateDrinks || !smoothies) {
      return;
    }

    const [breakfasts, sandwiches, pastries] = await db
      .insert(categoriesTable)
      .values([
        {
          name: "Breakfasts",
          slug: "breakfasts",
          parentId: foods.id,
          description: "Morning meals and light breakfast",
        },
        {
          name: "Sandwiches",
          slug: "sandwiches",
          parentId: foods.id,
          description: "Savory sandwiches and wraps",
        },
        {
          name: "Pastries",
          slug: "pastries",
          parentId: foods.id,
          description: "Baked pastries and sweet treats",
        },
      ])
      .returning();

    if (!breakfasts || !sandwiches || !pastries) {
      return;
    }

    const [coffeeBeans, merchandise] = await db
      .insert(categoriesTable)
      .values([
        {
          name: "Coffee Beans",
          slug: "coffee-beans",
          parentId: retails.id,
          description: "Whole bean coffee for brewing at home",
        },
        {
          name: "Merchandise",
          slug: "merchandise",
          parentId: retails.id,
          description: "Mugs, tumblers, and cafe merchandise",
        },
      ])
      .returning();

    if (!coffeeBeans || !merchandise) {
      return;
    }

    console.log(`[log]: Successfully seeded categories table.`);

    await db.insert(productsTable).values(
      [
        // Hot Coffee
        {
          categoryId: hotCoffee.id,
          name: "Espresso",
          description: "Rich and concentrated shot of espresso",
          priceCents: 12000,
        },
        {
          categoryId: hotCoffee.id,
          name: "Americano",
          description: "Espresso diluted with hot water",
          priceCents: 14000,
        },
        {
          categoryId: hotCoffee.id,
          name: "Cappuccino",
          description: "Espresso with steamed milk and thick foam",
          priceCents: 16000,
        },
        {
          categoryId: hotCoffee.id,
          name: "Cafe Latte",
          description: "Smooth espresso with steamed milk",
          priceCents: 17000,
        },

        // Iced Coffee
        {
          categoryId: icedCoffee.id,
          name: "Iced Americano",
          description: "Chilled espresso with cold water and ice",
          priceCents: 15000,
        },
        {
          categoryId: icedCoffee.id,
          name: "Iced Latte",
          description: "Espresso with cold milk over ice",
          priceCents: 18000,
        },
        {
          categoryId: icedCoffee.id,
          name: "Cold Brew",
          description: "Slow brewed coffee served cold",
          priceCents: 19000,
        },

        // Hot Tea
        {
          categoryId: hotTea.id,
          name: "English Breakfast Tea",
          description: "Classic strong black tea",
          priceCents: 12000,
        },
        {
          categoryId: hotTea.id,
          name: "Green Tea",
          description: "Light and refreshing traditional green tea",
          priceCents: 12000,
        },

        // Iced Tea
        {
          categoryId: icedTea.id,
          name: "Iced Lemon Tea",
          description: "Refreshing iced tea with lemon",
          priceCents: 14000,
        },
        {
          categoryId: icedTea.id,
          name: "Peach Iced Tea",
          description: "Sweet iced tea with peach flavor",
          priceCents: 15000,
        },

        // Chocolate Drinks
        {
          categoryId: chocolateDrinks.id,
          name: "Hot Chocolate",
          description: "Creamy chocolate drink with steamed milk",
          priceCents: 17000,
        },
        {
          categoryId: chocolateDrinks.id,
          name: "Mocha",
          description: "Espresso with chocolate and steamed milk",
          priceCents: 18000,
        },

        // Smoothies
        {
          categoryId: smoothies.id,
          name: "Strawberry Smoothie",
          description: "Blended strawberries with yogurt and ice",
          priceCents: 19000,
        },
        {
          categoryId: smoothies.id,
          name: "Mango Smoothie",
          description: "Sweet mango blended smoothie",
          priceCents: 19000,
        },

        // Breakfast
        {
          categoryId: breakfasts.id,
          name: "Pancake Stack",
          description: "Fluffy pancakes served with maple syrup",
          priceCents: 22000,
        },
        {
          categoryId: breakfasts.id,
          name: "Egg and Toast",
          description: "Scrambled eggs with toasted bread",
          priceCents: 20000,
        },

        // Sandwiches
        {
          categoryId: sandwiches.id,
          name: "Ham and Cheese Sandwich",
          description: "Toasted sandwich with ham and melted cheese",
          priceCents: 21000,
        },
        {
          categoryId: sandwiches.id,
          name: "Chicken Pesto Sandwich",
          description: "Grilled chicken with pesto and fresh vegetables",
          priceCents: 24000,
        },

        // Pastries
        {
          categoryId: pastries.id,
          name: "Butter Croissant",
          description: "Flaky French butter croissant",
          priceCents: 14000,
        },
        {
          categoryId: pastries.id,
          name: "Chocolate Muffin",
          description: "Moist muffin filled with chocolate chips",
          priceCents: 15000,
        },

        // Coffee Beans
        {
          categoryId: coffeeBeans.id,
          name: "Brazil Santos Beans",
          description: "Medium roast Brazilian coffee beans",
          priceCents: 55000,
        },
        {
          categoryId: coffeeBeans.id,
          name: "Ethiopian Yirgacheffe Beans",
          description: "Floral and fruity Ethiopian beans",
          priceCents: 62000,
        },

        // Merchandise
        {
          categoryId: merchandise.id,
          name: "Cafe Logo Mug",
          description: "Ceramic mug with cafe logo",
          priceCents: 30000,
        },
        {
          categoryId: merchandise.id,
          name: "Insulated Tumbler",
          description: "Stainless steel tumbler for hot and cold drinks",
          priceCents: 65000,
        },
      ].map((product) => {
        return {
          ...product,
          image: "/placeholder.svg",
          slug: slugify(product.name),
        };
      }),
    );

    console.log(`[log]: Successfully seeded products table.`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `[error]: Unexpected error occured upon setting data. ${error.message}`,
      );
    }
  }
}

async function main() {
  await clearTables();
  await seedData();
}

main();
