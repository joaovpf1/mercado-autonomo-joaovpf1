import { Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

let numberId: number = 1;

export const createProduct = (req: Request, res: Response):Response<IProduct> => {
  const day = new Date().getDay();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const newDate = `${day}/${month}/${year + 1}`;
  const newProduct: IProduct = {
    id: numberId,
    name: req.body.name,
    price: req.body.price,
    weight: req.body.weight,
    section: req.body.section,
    calories: req.body.calories,
    expirationDate: new Date(newDate),
  };
  market.push(newProduct);
  numberId++;
  return res.status(201).json(newProduct);
};

export const getAllProducts = (req: Request, res: Response):Response<IProduct[]> => {
  const total = market.reduce((accumulator, currentValue) => {
    return Number(accumulator) + Number(currentValue.price);
  }, 0);
  return res.status(200).json({ total, products: market });
};

export const getOneProduct = (req: Request, res: Response):Response<IProduct> => {
  const product = market.find(
    (product) => product.id === Number(req.params.id)
  );
  return res.status(200).json(product);
};

export const editProduct = (req: Request, res: Response):Response<IProduct> => {
  const indexProduct = market.findIndex(
    (product) => product.id === Number(req.params.id)
  );
  const editedProduct: IProduct = (market[indexProduct] = {
    ...market[indexProduct],
    ...req.body,
  });
  return res.status(200).json(editedProduct);
};

export const deleteProduct = (req: Request, res: Response):Response<void> => {
  const product = market.findIndex(
    (product) => product.id === Number(req.params.id)
  );
  market.splice(product, 1);
  return res.status(204).json();
};
