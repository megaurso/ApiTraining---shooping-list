import express, { Request, Response } from "express";
import { itens } from "./database";
import { IListComplete, IListPost } from "./interfaces";

const validateList = (payload: IListPost): IListPost => {
  const keys: Array<string> = Object.keys(payload);
  const requiredKeys = ["listName", "data"];

  const containsAllRequired: boolean = requiredKeys.every((key: string) => {
    return keys.includes(key);
  });

  if (!containsAllRequired) {
    throw new Error(`Required fields are: ${requiredKeys}`);
  }

  const validateNameandQuantity = () => {
    return payload.data.map((elem) => {
      const newProp = ["name", "quantity"].every((proper) => {

        return Object.keys(elem).includes(proper);
      });
      return newProp;
    }).every((newObject:boolean)=> newObject == true);

  };
  
  if (!validateNameandQuantity()) {
    throw new Error('Required fields are: "name" and "quantity"');
  }
  return payload;
};

const purchaseList = (request: Request, response: Response): Response => {
  try {
    const itensData: IListPost = validateList(request.body);
    const newItem: IListComplete = {
      id: itens.length + 1,
      ...itensData,
    };

    if (!isNaN(Number(newItem.listName))) {
      throw new Error(`The list name need to be a string`);
    }

    itens.push(newItem);
    return response.status(201).json(newItem);
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

export { purchaseList };
