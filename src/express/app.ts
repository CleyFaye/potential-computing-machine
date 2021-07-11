import express from "express";
import {createPipeline} from "@cley_faye/boilerplate/lib/express.js";
import routes from "./routes/index.js";

const app = express();
app.use(createPipeline({
  postStatics: [routes],
  statics: ["dist/pocoma"],
  options: {
    log: {
      route: true,
      error: true,
      timestamp: true,
    },
    middleware: {json: true},
    defaultErrorHandler: true,
  },
}));

export default app;
