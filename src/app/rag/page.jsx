// src/app/rag/page.tsx
"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RagPage;
const react_1 = require("react");
function RagPage() {
    const [query, setQuery] = (0, react_1.useState)("");
    const [answer, setAnswer] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)("");
    // Upload-specific state
    const [file, setFile] = (0, react_1.useState)(null);
    const [parsing, setParsing] = (0, react_1.useState)(false);
    const [parsedText, setParsedText] = (0, react_1.useState)("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setAnswer("");
        try {
            const res = await fetch("/api/rag", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
            if (res.ok) {
                setAnswer(data.answer);
            }
            else {
                setError(data.error || "Something went wrong");
            }
        }
        catch (err) {
            setError("Failed to fetch response");
        }
        finally {
            setLoading(false);
        }
    };
    // Upload handler: send the raw file as the POST body
    const handleUpload = async () => {
        if (!file)
            return setError("Please select a PDF file first.");
        setParsing(true);
        setError("");
        setParsedText("");
        try {
            // Send the raw file bytes as the body
            const res = await fetch("/api/upload", {
                method: "POST",
                body: file, // raw bytes; server will read arrayBuffer()
            });
            const data = await res.json();
            if (res.ok) {
                setParsedText(data.text || "");
            }
            else {
                setError(data.error || "Upload/parse failed");
            }
        }
        catch (err) {
            console.error(err);
            setError("Upload failed");
        }
        finally {
            setParsing(false);
        }
    };
    return (<div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>RAG Page</h1>

      {/* Upload section */}
      <section style={{ marginBottom: "1.5rem" }}>
        <h2>Upload PDF</h2>
        <input type="file" accept="application/pdf" onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setParsedText("");
            setError("");
        }}/>
        <button onClick={handleUpload} disabled={!file || parsing} style={{ marginLeft: 8, padding: "0.4rem 0.7rem" }}>
          {parsing ? "Parsing..." : "Upload & Parse"}
        </button>

        {file && <div style={{ marginTop: 8 }}>Selected: {file.name}</div>}
        {parsedText && (<div style={{ marginTop: 12 }}>
            <h3>Parsed text (preview)</h3>
            <div style={{ maxHeight: 240, overflow: "auto", background: "#f7f7f7", padding: 10 }}>
              <pre style={{ whiteSpace: "pre-wrap" }}>{parsedText}</pre>
            </div>
          </div>)}
      </section>

      <hr />

      {/* Query/chat section */}
      <section style={{ marginTop: "1.5rem" }}>
        <h2>Ask a question</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter your query" style={{ padding: "0.5rem", width: 360 }}/>
          <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: 8 }} disabled={loading}>
            {loading ? "Thinking..." : "Submit"}
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {answer && (<div>
            <strong>Answer:</strong>
            <pre>{answer}</pre>
          </div>)}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </div>);
}
