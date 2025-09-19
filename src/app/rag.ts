import { Router } from "express";
import { getRagResponse } from "../services/ragService";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    const result = await getRagResponse(query);
    res.json({ answer: result });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
