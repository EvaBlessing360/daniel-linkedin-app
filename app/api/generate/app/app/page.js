"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePost = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    setError("");
    setPost("");
    setCopied(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setPost(data.post);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyPost = () => {
    navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      generatePost();
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div style={styles.badge}>Overbooked · Daniel's Brand Voice</div>
          <h1 style={styles.title}>LinkedIn Post Generator</h1>
          <p style={styles.subtitle}>
            Type an idea. Get a post that sounds exactly like Daniel.
          </p>
        </div>

        <div style={styles.card}>
          <label style={styles.label}>Your idea</label>
          <textarea
            style={styles.textarea}
            placeholder={`e.g. "Why showing up on LinkedIn isn't enough"\n"A client who couldn't sell his offer until we fixed one thing"\n"What running a business taught me that no book could"`}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
          />
          <div style={styles.hint}>Tip: Cmd+Enter (Mac) or Ctrl+Enter (Windows) to generate</div>

          <button
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            onClick={generatePost}
            disabled={loading || !idea.trim()}
          >
            {loading ? (
              <span style={styles.buttonContent}>
                <span style={styles.spinner} /> Writing...
              </span>
            ) : (
              "Generate Post →"
            )}
          </button>
        </div>

        {error && (
          <div style={styles.errorCard}>
            <span style={styles.errorIcon}>⚠️</span> {error}
          </div>
        )}

        {post && (
          <div style={styles.outputCard}>
            <div style={styles.outputHeader}>
              <span style={styles.outputLabel}>Your LinkedIn post</span>
              <button style={styles.copyButton} onClick={copyPost}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <div style={styles.postContent}>
              {post.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < post.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
            <div style={styles.outputFooter}>
              <button style={styles.regenerateBtn} onClick={generatePost}>
                ↻ Regenerate
              </button>
            </div>
          </div>
        )}

        <div style={styles.footer}>
          Built for Daniel · Overbooked · Get Overbooked.
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0a 0%, #111827 100%)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 20px 80px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "680px",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  badge: {
    display: "inline-block",
    background: "rgba(99, 102, 241, 0.15)",
    border: "1px solid rgba(99, 102, 241, 0.4)",
    color: "#818cf8",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 8px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "16px",
    color: "#888",
    margin: 0,
  },
  card: {
    background: "#1a1a2e",
    border: "1px solid #2a2a4a",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "10px",
  },
  textarea: {
    width: "100%",
    background: "#0f0f1a",
    border: "1px solid #2a2a4a",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "15px",
    lineHeight: "1.6",
    padding: "14px",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  },
  hint: {
    fontSize: "12px",
    color: "#555",
    marginTop: "8px",
    marginBottom: "16px",
  },
  button: {
    width: "100%",
    background: "#6366f1",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "opacity 0.2s",
    letterSpacing: "-0.01em",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    display: "inline-block",
    width: "14px",
    height: "14px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  errorCard: {
    background: "rgba(220, 53, 69, 0.1)",
    border: "1px solid rgba(220, 53, 69, 0.3)",
    borderRadius: "10px",
    padding: "14px 16px",
    color: "#ff6b6b",
    fontSize: "14px",
    marginBottom: "16px",
  },
  errorIcon: {
    marginRight: "6px",
  },
  outputCard: {
    background: "#1a1a2e",
    border: "1px solid #2a2a4a",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "16px",
  },
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  outputLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  copyButton: {
    background: "#6366f1",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
  postContent: {
    fontSize: "15px",
    lineHeight: "1.75",
    color: "#e0e0e0",
    whiteSpace: "pre-wrap",
    background: "#0f0f1a",
    border: "1px solid #2a2a4a",
    borderRadius: "10px",
    padding: "16px",
  },
  outputFooter: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "flex-end",
  },
  regenerateBtn: {
    background: "transparent",
    color: "#888",
    border: "1px solid #333",
    borderRadius: "6px",
    padding: "6px 14px",
    fontSize: "13px",
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    fontSize: "12px",
    color: "#444",
    marginTop: "24px",
  },
};
