"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app/route.ts
const express_1 = require("express");
const rag_1 = require("../utils/rag"); // make sure this points to your RAG logic
const router = (0, express_1.Router)();
// POST endpoint to process user queries
router.post("/", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }
        const answer = await (0, rag_1.processRAG)(query);
        res.json({ answer });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});
// GET endpoint for health check
router.get("/", (req, res) => {
    res.json({ message: "LawBandit RAG API is running 🚀" });
});
exports.default = router;
