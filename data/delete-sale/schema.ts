import z from "zod/v3";

export const deleteSaleSchema = z.object({ id: z.string().uuid() });

export type DeleteSaleSchema = z.infer<typeof deleteSaleSchema>;
