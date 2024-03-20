import { products } from "@db/schema";

export type TProduct = typeof products.$inferSelect;
