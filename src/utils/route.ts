// src/app/route.ts
import { Router } from "express";
import { processRAG } from "../utils/rag"; // make sure this points to your RAG logic

const router = Router();

// POST endpoint to process user queries
router.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
    const answer = await processRAG(query);
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET endpoint for health check
router.get("/", (req, res) => {
  res.json({ message: "LawBandit RAG API is running 🚀" });
});

export default router;
