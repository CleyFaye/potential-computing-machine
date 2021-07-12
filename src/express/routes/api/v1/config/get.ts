import express from "express";
import {nocache} from "../../../../middlewares/cache.js";
import {promiseHandler} from "../../../../middlewares/promise.js";
import {Config, readConfig} from "../../../../services/config.js";

const router = express.Router();
export default router;

const handler = async (): Promise<Config> => readConfig();

router.get(
  "/",
  nocache,
  promiseHandler(handler),
);
