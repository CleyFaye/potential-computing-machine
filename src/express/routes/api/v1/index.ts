import express from "express";
import config from "./config/index.js";

const router = express.Router();
export default router;

router.use("/config", config);
