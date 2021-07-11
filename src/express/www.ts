import {consoleLogger} from "@cley_faye/boilerplate/lib/winston.js";
import {appStart} from "@cley_faye/boilerplate/lib/express.js";
import app from "./app.js";

const serverInfo = await appStart({
  app,
  allowNonLocal: false,
  port: 3000,
  logger: consoleLogger,
});

consoleLogger.info(`Server started on port ${serverInfo.port}`);
