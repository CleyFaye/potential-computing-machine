import express from "express";

const router = express.Router();
export default router;

router.get("/", (_req, res) => {
  res.send("placeholder");
});
