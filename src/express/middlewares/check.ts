import {NextFunction, Request, Response} from "express";
import createError from "http-errors";
import HttpCodes from "@cley_faye/http-codes-consts";
import {TypePredicate} from "../services/types.js";

/** Check that the request body match the given predicate */
export const checkRequestBody = <BodyType>(
  bodyPredicate: TypePredicate<BodyType>,
) => (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const body = req.body as unknown;
  if (!bodyPredicate(body)) {
    return next(createError(HttpCodes.UnprocessableEntity));
  }
  next();
};

/**
 * Get the typed body value from a request
 *
 * Note: this does not perform any check; usually such checks are performed with the above
 * middleware.
 */
export const getBody = <BodyType>(
  req: Request,
): BodyType => {
  const body = req.body as unknown as BodyType;
  return body;
};
