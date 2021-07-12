import {NextFunction, Request, Response} from "express";

export type HandlerResult = undefined
| null
| "next"
| unknown;

export type PromiseHandler<ReqType extends Request> = (
  req: ReqType,
  res: Response,
) => Promise<HandlerResult>;

/**
 * Process the return value of a promise handler
 *
 * Return true if the request was processed, false otherwise.
 */
const handleResult = (
  handlerResult: HandlerResult,
  res: Response,
  next: NextFunction,
): void => {
  if (handlerResult === undefined) {
    res.json({"status": "ok"});
    return;
  }
  if (handlerResult === null) {
    return;
  }
  if (handlerResult === "next") {
    next();
    return;
  }
  const rec = handlerResult as Record<string, unknown>;
  res.json({
    status: "ok",
    ...rec,
  });
};

/**
 * Use a promise as an express router's handler.
 *
 * If the promise resolve with an object, it is returned as JSON (if no "status" property is
 * present, it is added with the "ok" value).
 * If the promise resolve with `undefined`, a reply containing `{"status": "ok"}` is returned.
 * If the promise resolve with `null`, nothing is explicitely returned (i.e. it is assumed the
 * handler did handle the response)
 * If the promise resolve with "next", the next handler is called.
 */
export const promiseHandler = <ReqType extends Request>(handler: PromiseHandler<ReqType>) => (
  req: ReqType,
  res: Response,
  next: NextFunction,
): void => {
  handler(req, res).then(
    (handlerResult: HandlerResult) => {
      handleResult(handlerResult, res, next);
    },
  )
    .catch((error: Error) => {
      next(error);
    });
};
