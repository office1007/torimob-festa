import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const filePath = path.join(process.cwd(), "content", "business-plan.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d1a] via-[#1a0a2e] to-[#0d0d1a]">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-[#0d0d1a]/80 border-b border-orange-900/30">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">🎃</span>
          <span className="text-orange-400 font-semibold text-sm tracking-wide">
            トリモブフェスタ ハロウィンナイト — 事業計画書
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 text-orange-400 text-xs font-medium mb-6 tracking-widest uppercase">
          2026.10 鳥取市
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          🎃 トリモブの<br className="sm:hidden" />ハロウィンナイト
        </h1>
        <p className="text-gray-400 text-lg">
          サンロード商店街 × 丸由百貨店 × 風紋広場
        </p>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl">
          <article className="prose prose-invert prose-orange max-w-none
            prose-headings:font-bold
            prose-h1:text-3xl prose-h1:text-orange-400 prose-h1:border-b prose-h1:border-orange-900/40 prose-h1:pb-4
            prose-h2:text-2xl prose-h2:text-orange-300 prose-h2:mt-10 prose-h2:border-l-4 prose-h2:border-orange-500 prose-h2:pl-4
            prose-h3:text-xl prose-h3:text-purple-300
            prose-h4:text-lg prose-h4:text-gray-200
            prose-p:text-gray-300 prose-p:leading-8
            prose-strong:text-white
            prose-a:text-orange-400
            prose-blockquote:border-orange-500 prose-blockquote:bg-orange-950/30 prose-blockquote:rounded-r-lg prose-blockquote:py-1
            prose-code:text-orange-300 prose-code:bg-orange-950/40 prose-code:px-1.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700
            prose-table:text-sm
            prose-thead:bg-purple-900/40
            prose-th:text-purple-200 prose-th:font-semibold
            prose-td:text-gray-300
            prose-tr:border-white/10
            prose-hr:border-orange-900/40
            prose-li:text-gray-300
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 text-center py-8 text-gray-600 text-sm">
        株式会社琴線 — トリモブフェスタ 2026
      </footer>
    </div>
  );
}
