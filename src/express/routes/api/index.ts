import express from "express";
import v1 from "./v1/index.js";

const router = express.Router();
export default router;

router.use("/v1", v1);
