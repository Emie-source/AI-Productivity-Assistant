import ReactMarkdown from "react-markdown";

export function MessageContent({ text }: { text: string }) {
  return (
    <div className="prose-blade text-sm leading-relaxed">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
