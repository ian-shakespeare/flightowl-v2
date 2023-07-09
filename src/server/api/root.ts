import { amadeusRouter } from "./routers/amadeus";
import { exampleRouter } from "./routers/example";
import { createTRPCRouter } from "./utils";

export const appRouter = createTRPCRouter({
  amadeus: amadeusRouter,
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
