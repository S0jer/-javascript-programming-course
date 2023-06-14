import { Router } from "./dependencies.ts";
import { productCollection } from "./models/Product.ts";

const buyerRouter = new Router();

buyerRouter
  .get("/buyer", async (context: { render: (arg0: string) => void; }) => {
    context.render("buyer.ejs");
  })
  .get("/buyer/products", async (context: { response: { body: any; }; }) => {
    const products = await productCollection.find();
    context.response.body = products;
  });

export default buyerRouter;
