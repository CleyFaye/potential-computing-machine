import express from "express";
import api from "./api/index.js";

const router = express.Router();
export default router;

router.use("/api", api);

router.get("/", (_req, res) => {
  res.send("placeholder");
});
