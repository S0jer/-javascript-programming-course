import { Router } from "./dependencies.ts";
import { productCollection } from "./models/Product.ts";

const sellerRouter = new Router();

sellerRouter
  .get("/seller", async (context) => {
    context.render("index.ejs");
  })
  .post("/seller/add-product", async (context) => {
    const { value: { category, subcategory, name, properties } } = await context.request.body();

    const newProduct = {
      category: category,
      subcategory: subcategory,
      name: name,
      imageURL: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg",
      properties: properties.split(',').map((prop: string) => prop.trim()) || ["Super produkt", "Super cena"]
    };

    await productCollection.insertOne(newProduct);
    context.response.redirect("/seller");
  });

export default sellerRouter;
