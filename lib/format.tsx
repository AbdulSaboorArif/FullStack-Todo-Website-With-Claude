export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

type InlineSegment = {
  text: string;
  bold?: boolean;
  italic?: boolean;
};

function splitInline(text: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    if (token.startsWith("**")) {
      segments.push({ text: token.slice(2, -2), bold: true });
    } else {
      segments.push({ text: token.slice(1, -1), italic: true });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex) });
  }
  return segments;
}

export function renderInline(text: string, keyPrefix: string) {
  return splitInline(text).map((segment, i) => {
    const key = `${keyPrefix}-${i}`;
    if (segment.bold) {
      return (
        <strong key={key} className="text-on-surface font-semibold">
          {segment.text}
        </strong>
      );
    }
    if (segment.italic) {
      return <em key={key}>{segment.text}</em>;
    }
    return <span key={key}>{segment.text}</span>;
  });
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { text: string; checked?: boolean }[] }
  | { type: "ordered"; items: string[] }
  | { type: "quote"; text: string };

export function parseContent(content: string): ContentBlock[] {
  const rawLines = content.split(/\n/);
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i].trimEnd();

    if (line.trim() === "") {
      i += 1;
      continue;
    }

    // Bullet list
    if (/^[-•*]\s+/.test(line)) {
      const items: { text: string }[] = [];
      while (
        i < rawLines.length &&
        /^[-•*]\s+/.test(rawLines[i].trim())
      ) {
        items.push({ text: rawLines[i].trim().replace(/^[-•*]\s+/, "") });
        i += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (
        i < rawLines.length &&
        /^\d+[.)]\s+/.test(rawLines[i].trim())
      ) {
        items.push(rawLines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "ordered", items });
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const quote = line.replace(/^>\s?/, "");
      blocks.push({ type: "quote", text: quote });
      i += 1;
      continue;
    }

    // Paragraph (may span multiple lines)
    const lines = [line.trim()];
    i += 1;
    while (
      i < rawLines.length &&
      rawLines[i].trim() !== "" &&
      !/^[-•*]\s+/.test(rawLines[i].trim()) &&
      !/^\d+[.)]\s+/.test(rawLines[i].trim()) &&
      !/^>\s?/.test(rawLines[i].trim())
    ) {
      lines.push(rawLines[i].trim());
      i += 1;
    }
    blocks.push({ type: "paragraph", text: lines.join(" ") });
  }

  return blocks;
}
