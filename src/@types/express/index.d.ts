import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      itemList: {
        indexItem: number;
      }
    }
  }
}
