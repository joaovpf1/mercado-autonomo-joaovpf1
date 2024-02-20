import { Request, Response, NextFunction } from "express";
import { market } from "./database";

export const nameVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (market.some((product) => product.name === req.body.name)) {
    return res.status(409).json({ message: "Product already registered." });
  }
  return next();
};

export const idVerification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!market.some((product) => product.id === Number(req.params.id))) {
    return res.status(404).json({ message: "Product not found." });
  }
  return next();
};
