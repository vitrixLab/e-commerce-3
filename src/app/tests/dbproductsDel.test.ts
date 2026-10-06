// src/app/tests/productsDel.test.ts
import { prisma } from "@/app/lib/prisma";
import { DELETE } from "@/app/api/private/admin/products/route";
import { NextRequest } from "next/server";

describe("Product API - DELETE existing products by ID", () => {
  const productIds = ["cmhdof2yk0001sipsgqf07f98"];
  let categoryId: number;

  beforeAll(async () => {
    const category = await prisma.category.create({
      data: { name: "male", description: "Category for delete tests" },
    });
    categoryId = category.id;

    await prisma.product.upsert({
      where: { id: productIds[0] },
      update: {},
      create: {
        id: productIds[0],
        name: "Product To Delete",
        description: "Fixture created for the delete test",
        sellingPrice: 100,
        costPrice: 50,
        stockQty: 10,
        categoryId,
        brand: "TestBrand",
        material: "Cotton",
        originCountry: "USA",
      },
    });
  });

  it("should delete the specified products", async () => {
    const request = new NextRequest(
      "http://localhost/api/private/admin/products",
      {
        method: "DELETE",
        body: JSON.stringify({ ids: productIds }),
      }
    );

    const response = await DELETE(request);
    const body = await response.json();

    console.log("DELETE Response:", body);

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);

    // Verify deletion in DB
    const remaining = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });
    expect(remaining.length).toBe(0);
  });

  it("should return 404 if no products found for provided IDs", async () => {
    const fakeIds = ["nonexistent-id-999"];

    const request = new NextRequest(
      "http://localhost/api/private/admin/products",
      {
        method: "DELETE",
        body: JSON.stringify({ ids: fakeIds }),
      }
    );

    const response = await DELETE(request);
    const body = await response.json();

    console.log("DELETE Nonexistent Response:", body);

    expect(response.status).toBe(404);
    expect(body.success).toBe(false);
    expect(body.message).toBe("No products found for the provided IDs");
  });
});
