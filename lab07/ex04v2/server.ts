import { Application, Router } from "./dependencies.ts";
import { viewEngine, dejsEngine, oakAdapter } from "./dependencies.ts";
import buyerRouter from "./buyerRouter.ts";
import { send } from "https://deno.land/x/oak/mod.ts";
import sellerRouter from './sellerRouter.ts';

const app = new Application();
const router = new Router();

app.use(viewEngine(oakAdapter, dejsEngine));

app.use(buyerRouter.routes());
app.use(sellerRouter.routes());

app.use(async (context: any, next: any) => {
    if (context.request.url.pathname.startsWith("/public")) {
      const filePath = context.request.url.pathname.substring(7);
      await send(context, filePath, {
        root: `${Deno.cwd()}/public`,
      });
    } else {
      await next();
    }
  });
  

// app.use(async (context: { request: { url: { pathname: any; }; }; }, next: any) => {
//   await send(context, context.request.url.pathname, {
//     root: `${Deno.cwd()}/public`,
//     index: "index.html",
//   });
// });

console.log("Server running on http://localhost:3000");
await app.listen({ port: 3000 });
