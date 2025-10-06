import z from "zod/v3";

export const deleteProductSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
