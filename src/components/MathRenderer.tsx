import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathRendererProps {
  content: string;
  className?: string;
}

const MathRenderer = ({ content, className = "" }: MathRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Replace LaTeX-style math with KaTeX rendering
    const processedContent = content.replace(/\$\$(.*?)\$\$/g, (_, math) => {
      try {
        return katex.renderToString(math, { displayMode: true, throwOnError: false });
      } catch (e) {
        return math;
      }
    }).replace(/\$(.*?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math, { displayMode: false, throwOnError: false });
      } catch (e) {
        return math;
      }
    });

    containerRef.current.innerHTML = processedContent;
  }, [content]);

  return <div ref={containerRef} className={className} />;
};

export default MathRenderer;
