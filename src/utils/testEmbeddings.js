"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rag_1 = require("./rag");
(0, rag_1.generateAndStoreEmbeddings)()
    .then(() => console.log("Done generating embeddings"))
    .catch(console.error);
