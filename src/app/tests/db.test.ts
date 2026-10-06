import { prisma } from "../lib/prisma";

describe("Mock data store", () => {
  it("answers model queries without a database", async () => {
    const categories = await prisma.category.findMany();

    expect(categories.length).toBeGreaterThanOrEqual(2);
    expect(categories.map((c) => c.name).sort()).toEqual(["female", "male"]);
  });

  it("serves the seeded catalog with relations", async () => {
    const products = await prisma.product.findMany({
      where: { categoryId: 1 },
      select: {
        id: true,
        name: true,
        colors: { select: { color: true, hexCode: true } },
        sizes: { select: { size: true } },
        reviews: true,
        tags: { select: { name: true } },
      },
    });

    expect(products.length).toBeGreaterThan(0);
    expect(products[0].colors.length).toBeGreaterThan(0);
    expect(products[0].sizes.length).toBeGreaterThan(0);
    expect(products[0].tags.length).toBeGreaterThan(0);
  });
});
