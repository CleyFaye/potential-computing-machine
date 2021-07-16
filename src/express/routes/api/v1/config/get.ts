import express from "express";
import {Config} from "../../../../../shared/types.js";
import {nocache} from "../../../../middlewares/cache.js";
import {promiseHandler} from "../../../../middlewares/promise.js";
import {readConfig} from "../../../../services/config.js";

const router = express.Router();
export default router;

const handler = async (): Promise<Config> => readConfig();

router.get(
  "/",
  nocache,
  promiseHandler(handler),
);
