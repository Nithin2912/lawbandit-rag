// src/utils/testEmbeddings.ts
import { generateAndStoreEmbeddings, processRAG } from "./rag";

async function main() {
  // Step 1: Generate local embeddings for all PDFs
  console.log("Generating local embeddings for all PDFs...");
  await generateAndStoreEmbeddings();

  // Step 2: Define multiple test queries
  const queries = [
    "What is this PDF about?",
    "Explain RAG usage in the document",
    "Give me a summary of Section 1"
  ];

  // Step 3: Process each query and show results
  for (const query of queries) {
    console.log(`\nQuery: ${query}`);
    const answer = processRAG(query);
    console.log("\nAnswer:");
    console.log(answer);
    console.log("\n-------------------------------");
  }
}

main();
