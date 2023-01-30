import express, { request, Request, Response } from "express";
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
    return payload.data
      .map((elem) => {
        const newProp = ["name", "quantity"].every((proper) => {
          return Object.keys(elem).includes(proper);
        });
        return newProp;
      })
      .every((newObject: boolean) => newObject == true);
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

const getMyList = (request: Request, response: Response): Response => {
  return response.json(itens);
};

const searchItem = (request: Request, response: Response): Response => {
  const indexItemSearch: number = request.itemList.indexItem;

  return response.json(itens[indexItemSearch]);
};

const deleteAllItem = (request: Request, response: Response): Response => {
  const indexItemToRemove: number = request.itemList.indexItem;

  itens.splice(indexItemToRemove, 1);

  return response.status(204).send();
};

const deleteItem = (request: Request, response: Response): Response => {
  const indexItemToRemove: number = request.itemList.indexItem;
  const findIndex = itens[indexItemToRemove].data.findIndex(
    (elem) => elem.name === request.params.name
  );

  itens[indexItemToRemove].data.splice(findIndex, findIndex);
  if (findIndex === -1) {
    return response.status(404).json({
      message: `Item with name ${request.params.name} does not exist`,
    });
  }

  return response.status(200).json({
    message: `Item with name ${request.params.name} has been delete`
  });
};

const updateListItem = (request: Request, response: Response): Response => {
  const indexItemForUpdate: number = request.itemList.indexItem;
  const findIndex = itens[indexItemForUpdate].data.findIndex(
    (elem) => elem.name === request.params.name
  );

  if (findIndex === -1) {
    return response.status(400).json({
      message: `Item with name ${request.params.name} does not exist`,
    });
  }

  // Object.values(request.body).map((elem) => {
  //   if (typeof elem != "string") {
  //     return response.status(400).json({
  //     message: "The list name need to be a string",
  //     });
  //   }
  // });

  if (request.body.quantity) {
    if (typeof request.body.quantity != "string") {
      return response.status(400).json({
        message: "The list name need to be a string",
      });
    }
  }

  if (request.body.name) {
    if (typeof request.body.name != "string") {
      return response.status(400).json({
        message: "The list name need to be a string",
      });
    }
  }

  const dataValues = ["quantity", "name"];
  const dataItensName: boolean = Object.keys(request.body).every(
    (key: string) => {
      return dataValues.includes(key);
    }
  );

  if (!dataItensName) {
    return response.status(400).json({
      message: 'Updatable fields are: "name" and "quantity"',
    });
  }

  itens[indexItemForUpdate].data[findIndex] = {
    ...itens[indexItemForUpdate].data[findIndex],
    ...request.body,
  };

  return response.json(itens[indexItemForUpdate]);
};

export {
  purchaseList,
  getMyList,
  searchItem,
  deleteItem,
  updateListItem,
  deleteAllItem,
};
