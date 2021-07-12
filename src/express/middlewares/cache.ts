import {NextFunction, Request, Response} from "express";

/** Middleware to disable cache on this request */
export const nocache = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.set("Cache-Control", "no-store");
  next();
};
