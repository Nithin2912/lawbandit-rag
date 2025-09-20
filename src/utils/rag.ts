// src/utils/rag.ts
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

/** Simple cosine similarity */
function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB + 1e-10);
}

/** Dummy local embedding generator */
function generateLocalEmbedding(text: string, dim = 50): number[] {
  const vec = Array(dim)
    .fill(0)
    .map((_, i) => (text.charCodeAt(i % text.length) % 100) / 100);
  return vec;
}

/** Split text into chunks */
export function chunkText(text: string, chunkSize = 500): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize;
  }
  return chunks;
}

/** Generate embeddings per PDF and store separately */
export async function generateAndStoreEmbeddings() {
  const dataDir = path.join(process.cwd(), "src", "data");
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".pdf"));

  for (const file of files) {
    const pdfPath = path.join(dataDir, file);
    const pdfBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(pdfBuffer);
    const textChunks = chunkText(data.text, 500);

    const vectorStore = textChunks.map(chunk => ({
      chunk,
      embedding: generateLocalEmbedding(chunk),
    }));

    const vectorFileName = `${path.basename(file, ".pdf")}_vectorStore.json`;
    fs.writeFileSync(path.join(dataDir, vectorFileName), JSON.stringify(vectorStore, null, 2));
    console.log(`Embeddings saved for ${file} → ${vectorFileName}`);
  }
}

/** Query across all PDF embeddings */
export function processRAG(query: string) {
  const dataDir = path.join(process.cwd(), "src", "data");
  const vectorFiles = fs.readdirSync(dataDir).filter(f => f.endsWith("_vectorStore.json"));

  if (vectorFiles.length === 0) {
    console.log("No vector stores found. Run generateAndStoreEmbeddings() first.");
    return null;
  }

  const queryEmbedding = generateLocalEmbedding(query);
  const scoredChunks: { chunk: string; score: number; file: string }[] = [];

  for (const file of vectorFiles) {
    const vectorStore: { chunk: string; embedding: number[] }[] = JSON.parse(
      fs.readFileSync(path.join(dataDir, file), "utf-8")
    );

    for (const entry of vectorStore) {
      scoredChunks.push({
        chunk: entry.chunk,
        score: cosineSimilarity(queryEmbedding, entry.embedding),
        file: file.replace("_vectorStore.json", ".pdf"),
      });
    }
  }

  // Top 3 matching chunks across all PDFs
  const topChunks = scoredChunks.sort((a, b) => b.score - a.score).slice(0, 3);

  const context = topChunks.map(c => `[${c.file}] ${c.chunk}`).join("\n\n");

  return `Answer based on PDF context:\n\n${context}`;
}
