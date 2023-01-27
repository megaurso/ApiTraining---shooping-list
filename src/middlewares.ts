import { NextFunction, Request, Response } from "express";
import { itens } from "./database";

const ensureListItemExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { id } = request.params;
  const indexItem = itens.findIndex((element) => element.id === +id);

  if (indexItem === -1) {
    return response.status(404).json({
      message: `List with id ${id} does not exist`,
    });
  }

  request.itemList = {
    indexItem: indexItem,
  };

  return next();
};


export { ensureListItemExist };
