import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getOneProduct,
} from "./logic";
import { idVerification, nameVerification } from "./middlewares";

const app = express();

app.use(express.json());

app.post("/products", nameVerification, createProduct);
app.get("/products", getAllProducts);
app.get("/products/:id", idVerification, getOneProduct);
app.patch("/products/:id", idVerification, nameVerification, editProduct);
app.delete("/products/:id", idVerification, deleteProduct);

app.listen(3000, () => {
  console.log("API iniciada com sucesso!");
});
