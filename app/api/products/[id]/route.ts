import { db } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const searchParams = request.nextUrl.searchParams;
  // exemplo: localhost:3000/api/products/1p2025id?teste=123
  const query = searchParams.get("teste");
  const productId = params.id;
  const products = await db.product.findUnique({ where: { id: productId } });

  if (!products || !query) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(
    {
      products,
      query,
    },
    { status: 200 },
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const productId = params.id;
  const products = await db.product.delete({ where: { id: productId } });

  return Response.json(products, { status: 200 });
}
