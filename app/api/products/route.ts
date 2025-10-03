import { db } from "@/lib/prisma";

// MÉTODO ROUTE HANLDER: UTILIZADO PARA FAZER REQUISICOES NO SERVIDOR PARA WEB HOOKS
export async function GET() {
  const products = await db.product.findMany({});
  return Response.json(products, {
    status: 200,
  });
}
