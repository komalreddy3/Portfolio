import React from "react";

function renderMarkdownLine(line, index) {
  // Headings
  if (line.startsWith("# ")) {
    return (
      <h1 key={index} className="md-h1">
        {line.replace(/^#\s+/, "")}
      </h1>
    );
  }
  if (line.startsWith("## ")) {
    return (
      <h2 key={index} className="md-h2">
        {line.replace(/^##\s+/, "")}
      </h2>
    );
  }
  if (line.startsWith("### ")) {
    return (
      <h3 key={index} className="md-h3">
        {line.replace(/^###\s+/, "")}
      </h3>
    );
  }

  // Blockquotes
  if (line.startsWith("> ")) {
    return (
      <blockquote key={index} className="md-blockquote">
        {line.replace(/^>\s+/, "")}
      </blockquote>
    );
  }

  // Horizontal Rule
  if (line.trim() === "---" || line.trim() === "***") {
    return <hr key={index} className="md-hr" />;
  }

  // List Items
  if (line.startsWith("- ") || line.startsWith("* ")) {
    const raw = line.replace(/^[-*]\s+/, "");
    return (
      <li key={index} className="md-li">
        {parseInline(raw)}
      </li>
    );
  }

  // Numbered list
  const numMatch = line.match(/^(\d+)\.\s+(.*)/);
  if (numMatch) {
    return (
      <li key={index} className="md-li" style={{ listStyleType: "decimal" }}>
        {parseInline(numMatch[2])}
      </li>
    );
  }

  // Empty Line
  if (!line.trim()) {
    return <div key={index} style={{ height: "10px" }} />;
  }

  // Paragraph
  return (
    <p key={index} className="md-p">
      {parseInline(line)}
    </p>
  );
}

// Inline formatting: **bold**, `code`, [link](url)
function parseInline(text) {
  if (!text) return null;

  // Split by bold (**...**) and inline code (`...`)
  const parts = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} style={{ color: "var(--text)" }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code key={match.index} className="md-inline-code">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const label = token.substring(1, token.indexOf("]("));
      const url = token.substring(token.indexOf("](") + 2, token.length - 1);
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="md-link"
        >
          {label}
        </a>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export default function MarkdownPreview({ content }) {
  if (!content) {
    return <div style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Empty document</div>;
  }

  const lines = content.split("\n");

  return (
    <article className="md-preview" aria-label="Markdown Rendered Document">
      {lines.map((line, idx) => renderMarkdownLine(line, idx))}
    </article>
  );
}
