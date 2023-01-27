import express, { Application } from "express";
import { purchaseList, getMyList, searchItem, deleteItem, updateListItem, deleteAllItem } from "./logic";
import { ensureListItemExist } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/purchaselist", purchaseList);
app.get("/purchaseList", getMyList);
app.get("/purchaseList/:id", ensureListItemExist, searchItem);
app.delete("/purchaseList/:id", ensureListItemExist, deleteAllItem);
app.delete("/purchaseList/:id/:name", ensureListItemExist, deleteItem);
app.patch("/purchaseList/:id/:name", ensureListItemExist, updateListItem)

app.listen(3000, () => {
  console.log("Server is running");
});
