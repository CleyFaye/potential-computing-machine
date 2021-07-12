import express from "express";
import get from "./get.js";
import set from "./set.js";

const router = express.Router();
export default router;

router.use("/get", get);
router.use("/set", set);
