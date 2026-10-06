import { NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { isUserAdmin } from "@/app/server/controllers/admin.controllers";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } //  Promise here
) {
  const { id } = await context.params; //  await before using
  if (!id) return ApiResponds(400, "Customer ID required");

  const isAdmin = await isUserAdmin(req);
  if (!isAdmin) return ApiResponds(403, "User is not admin");

  try {
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) return ApiResponds(404, "Customer not found");

    await prisma.customer.delete({ where: { id } });

    return ApiResponds(200, "Customer deleted successfully");
  } catch (err) {
    console.error(err);
    return ApiResponds(500, "Server error");
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  if (!id) return ApiResponds(400, "Customer ID required");

  const isAdmin = await isUserAdmin(req);
  if (!isAdmin) return ApiResponds(403, "User is not admin");

  try {
    const body = await req.json();
    const { name, email, userAvatarUrl, provider, providerId } = body;

    if (!name && !email && !userAvatarUrl && !provider && !providerId)
      return ApiResponds(400, "No fields provided for update");

    const existing = await prisma.customer.findUnique({ where: { id } });
    if (!existing) return ApiResponds(404, "Customer not found");

    if (email && email !== existing.email) {
      const duplicate = await prisma.customer.findUnique({ where: { email } });
      if (duplicate)
        return ApiResponds(409, "Email already in use by another customer");
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: { name, email, userAvatarUrl, provider, providerId },
    });

    return ApiResponds(200, "Customer updated successfully", updatedCustomer);
  } catch (err) {
    console.error(err);
    return ApiResponds(500, "Server error");
  }
}
