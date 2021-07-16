import {Config} from "../shared/types.js";
import {get, post} from "./utils.js";

export const getConfig = (): Promise<Config> => get("/api/v1/config/get");

export const setConfig = (config: Config): Promise<void> => post(
  "/api/v1/config/set",
  {config},
);
