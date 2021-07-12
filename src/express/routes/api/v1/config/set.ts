import express, {Request} from "express";
import {checkRequestBody} from "../../../../middlewares/check.js";
import {promiseHandler} from "../../../../middlewares/promise.js";
import {ConfigOptional, isConfigOptional, writeConfig} from "../../../../services/config.js";

const router = express.Router();
export default router;

const handler = async (
  req: Request<unknown, unknown, ConfigOptional>,
): Promise<undefined> => {
  await writeConfig(req.body);
  return undefined;
};

router.post(
  "/",
  checkRequestBody(isConfigOptional),
  promiseHandler(handler),
);
