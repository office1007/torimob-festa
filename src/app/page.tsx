"use client";

import { useState } from "react";

const KPI_DATA = [
  {
    icon: "👥",
    label: "来場見込み",
    value: "3,000〜5,000",
    unit: "人",
    note: "子育て王国連携・SNS広報込み",
    color: "orange",
  },
  {
    icon: "🍽️",
    label: "出店目標",
    value: "15〜20",
    unit: "ブース",
    note: "キッチンカー・物販・体験含む",
    color: "purple",
  },
  {
    icon: "💴",
    label: "予算規模",
    value: "〜125",
    unit: "万円",
    note: "協賛・後援により圧縮可能",
    color: "yellow",
  },
  {
    icon: "📅",
    label: "開催まで",
    value: "129",
    unit: "日",
    note: "2026年10月末を想定",
    color: "green",
  },
];

const VENUES = [
  {
    emoji: "🏮",
    name: "サンロード商店街",
    concept: "魔女の市場",
    items: [
      "トリック・オア・トリートスタンプラリー",
      "ハロウィンフォトスポット設置",
      "仮装コンテスト＆パレード",
      "トリモブキャラクター巡回",
    ],
    badge: "ZONE 01",
  },
  {
    emoji: "🎃",
    name: "丸由百貨店アーケード",
    concept: "ハロウィンフードコート",
    items: [
      "キッチンカー5〜8台集結",
      "コラボ限定メニュー販売",
      "ナイトマーケット演出",
      "クラフトワークショップ",
    ],
    badge: "ZONE 02",
  },
  {
    emoji: "🎤",
    name: "風紋広場（駅前）",
    concept: "ハロウィンメインステージ",
    items: [
      "ライブ・ダンスパフォーマンス",
      "キャラクターショー（1日2〜3回）",
      "大型かぼちゃオブジェ設置",
      "子どもアクティビティゾーン",
    ],
    badge: "ZONE 03",
  },
];

const PHASES = [
  {
    phase: "Phase 1",
    title: "企画・許可取得",
    deadline: "8月末まで",
    status: "current",
    tasks: [
      { text: "サンロード商店街振興組合への説明・許可申請" },
      { text: "丸由百貨店（ビル管理会社）への交渉・使用許可" },
      { text: "風紋広場の使用許可申請（鳥取市）" },
      { text: "鳥取県・鳥取市への後援申請" },
      { text: "子育て王国担当課へのタイアップ提案" },
      { text: "保健所への露店営業届出" },
    ],
  },
  {
    phase: "Phase 2",
    title: "出店者・協力者の招致",
    deadline: "9月末まで",
    status: "upcoming",
    tasks: [
      { text: "キッチンカー・飲食出店者の募集・審査" },
      { text: "ワークショップ・物販出店者の募集" },
      { text: "キャラクターショー・パフォーマー手配" },
      { text: "地元アーティスト・ステージ出演者の確定" },
      { text: "スポンサー企業への提案・協賛契約" },
      { text: "メディアパートナーへの告知依頼" },
    ],
  },
  {
    phase: "Phase 3",
    title: "広報・集客",
    deadline: "10月上旬まで",
    status: "upcoming",
    tasks: [
      { text: "フライヤー・ポスター作成・配布" },
      { text: "SNS告知開始（Instagram/X/Facebook）" },
      { text: "県・市の広報チャンネルへの掲載依頼" },
      { text: "プレスリリース配信（メディア向け）" },
      { text: "出店者によるSNS拡散・ハッシュタグ統一" },
    ],
  },
  {
    phase: "Phase 4",
    title: "直前準備",
    deadline: "10月中旬〜",
    status: "upcoming",
    tasks: [
      { text: "会場レイアウト確定・機材発注" },
      { text: "電源・設備確認（キッチンカー用電力・PA機材）" },
      { text: "ボランティアスタッフ説明会・役割分担" },
      { text: "緊急時・中止時の連絡網整備" },
      { text: "天候モニタリング開始" },
    ],
  },
  {
    phase: "Phase 5",
    title: "当日運営・事後対応",
    deadline: "10月下旬〜",
    status: "upcoming",
    tasks: [
      { text: "会場設営（前日〜当日朝）" },
      { text: "出店者受け入れ・配置確認" },
      { text: "ステージ進行管理・来場者カウント" },
      { text: "来場者数・売上データ集計" },
      { text: "報告書提出・反省会" },
    ],
  },
];

const WEATHER_RULES = [
  { level: "通常開催", rain: "1mm/時未満", wind: "5m/s未満", color: "green", icon: "☀️" },
  { level: "注意・待機", rain: "1〜3mm/時", wind: "5〜8m/s", color: "yellow", icon: "🌦️" },
  { level: "屋外エリア中止", rain: "3mm/時以上", wind: "8〜10m/s", color: "orange", icon: "🌧️" },
  { level: "全面中止", rain: "5mm以上が1時間継続", wind: "10m/s以上 or 警報", color: "red", icon: "⛔" },
];

function SectionTitle({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xl">{icon}</span>
      <h2 className="text-lg font-bold text-white">{label}</h2>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

export default function Home() {
  const [openPhase, setOpenPhase] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#0c0c1e] text-white font-sans">

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-purple-900/20 to-[#0c0c1e]" />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-14 text-center">
          <span className="inline-block bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            2026.10 鳥取市 — 事業計画書
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight">
            <span className="text-orange-400">🎃</span>{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
              トリモブの
            </span>
            <br className="sm:hidden" />
            <span className="text-white">ハロウィンナイト</span>
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            サンロード商店街 × 丸由百貨店アーケード × 風紋広場
          </p>
          <p className="text-gray-500 text-sm">主催：株式会社琴線</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-24 space-y-16">

        {/* KPI Cards */}
        <section>
          <SectionTitle icon="📊" label="目標数値（暫定）" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {KPI_DATA.map((k) => (
              <div
                key={k.label}
                className={`rounded-2xl border p-5 flex flex-col gap-2 ${
                  k.color === "orange" ? "bg-orange-950/40 border-orange-700/40" :
                  k.color === "purple" ? "bg-purple-950/40 border-purple-700/40" :
                  k.color === "yellow" ? "bg-yellow-950/30 border-yellow-700/40" :
                  "bg-green-950/30 border-green-700/40"
                }`}
              >
                <span className="text-2xl">{k.icon}</span>
                <div>
                  <p className="text-xs text-gray-400 mb-1">{k.label}</p>
                  <p className={`text-2xl sm:text-3xl font-extrabold leading-none ${
                    k.color === "orange" ? "text-orange-400" :
                    k.color === "purple" ? "text-purple-400" :
                    k.color === "yellow" ? "text-yellow-400" : "text-green-400"
                  }`}>
                    {k.value}
                    <span className="text-sm font-medium ml-1">{k.unit}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{k.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Venues */}
        <section>
          <SectionTitle icon="📍" label="開催エリア" />
          <div className="grid sm:grid-cols-3 gap-5">
            {VENUES.map((v) => (
              <div key={v.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{v.emoji}</span>
                  <span className="text-xs text-gray-500 border border-gray-700 rounded-full px-2 py-0.5">{v.badge}</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{v.name}</p>
                  <p className="text-orange-400 text-xs font-medium mt-0.5">「{v.concept}」</p>
                </div>
                <ul className="space-y-1.5">
                  {v.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-orange-500 mt-0.5 shrink-0">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Tasks */}
        <section>
          <SectionTitle icon="✅" label="今後やること（フェーズ別タスク）" />
          <div className="space-y-3">
            {PHASES.map((p, i) => (
              <div
                key={p.phase}
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  p.status === "current"
                    ? "border-orange-500/60 bg-orange-950/20"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenPhase(openPhase === i ? -1 : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      p.status === "current"
                        ? "bg-orange-500/20 border-orange-500/50 text-orange-400"
                        : "bg-white/5 border-white/20 text-gray-400"
                    }`}>
                      {p.phase}
                    </span>
                    <div>
                      <p className="font-semibold text-white text-sm">{p.title}</p>
                      <p className="text-xs text-gray-500">{p.deadline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {p.status === "current" && (
                      <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">
                        NOW
                      </span>
                    )}
                    <span className="text-gray-400 text-sm">{openPhase === i ? "▲" : "▼"}</span>
                  </div>
                </button>
                {openPhase === i && (
                  <div className="px-6 pb-5 border-t border-white/10">
                    <ul className="mt-4 space-y-2.5">
                      {p.tasks.map((task) => (
                        <li key={task.text} className="flex items-start gap-3">
                          <span className="mt-0.5 shrink-0 w-4 h-4 rounded border border-gray-600 flex items-center justify-center text-xs" />
                          <span className="text-sm text-gray-200">{task.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Weather */}
        <section>
          <SectionTitle icon="🌧️" label="天候中止ボーダーライン" />
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {WEATHER_RULES.map((w) => (
              <div
                key={w.level}
                className={`rounded-xl border p-4 flex items-center gap-4 ${
                  w.color === "green" ? "border-green-700/40 bg-green-950/20" :
                  w.color === "yellow" ? "border-yellow-700/40 bg-yellow-950/20" :
                  w.color === "orange" ? "border-orange-700/40 bg-orange-950/20" :
                  "border-red-700/40 bg-red-950/20"
                }`}
              >
                <span className="text-3xl">{w.icon}</span>
                <div className="flex-1">
                  <p className={`font-bold text-sm ${
                    w.color === "green" ? "text-green-400" :
                    w.color === "yellow" ? "text-yellow-400" :
                    w.color === "orange" ? "text-orange-400" : "text-red-400"
                  }`}>{w.level}</p>
                  <p className="text-xs text-gray-400 mt-0.5">雨量：{w.rain}　風速：{w.wind}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-950/30 border border-blue-800/40 rounded-xl p-5">
            <p className="font-semibold text-blue-400 mb-3 text-sm">🛡️ フードロス対策スキーム（中止時）</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="font-bold text-white text-sm mb-2">スキームA：運営が代替販売</p>
                <p className="text-xs text-gray-400 leading-relaxed">出店者に代わり運営スタッフがアーケード内で販売代行。売上は全額出店者へ返還（手数料ゼロ）。</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="font-bold text-white text-sm mb-2">スキームB：運営が買い取り</p>
                <p className="text-xs text-gray-400 leading-relaxed">残品を原価の50〜70%で運営が買い取り。スタッフの食事・スポンサー贈呈・実店舗誘導PRに活用。</p>
              </div>
            </div>
          </div>
        </section>

        {/* Budget */}
        <section>
          <SectionTitle icon="💰" label="予算・収入概要" />
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-sm text-gray-400 font-medium mb-4">支出概算</p>
              <div className="space-y-3">
                {[
                  { name: "会場設営・装飾", min: 30, max: 50 },
                  { name: "PA・照明機材", min: 10, max: 20 },
                  { name: "キャラクター・パフォーマー", min: 10, max: 20 },
                  { name: "広報・印刷物", min: 5, max: 10 },
                  { name: "フードロス買い取り予備費", min: 5, max: 10 },
                  { name: "保険・保証費用", min: 3, max: 5 },
                  { name: "雑費・備品", min: 5, max: 10 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="text-white font-medium tabular-nums">
                      {item.min}〜{item.max}<span className="text-gray-500 text-xs ml-0.5">万</span>
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 flex justify-between font-bold">
                  <span className="text-gray-200">合計</span>
                  <span className="text-orange-400 text-lg">68〜125<span className="text-sm ml-0.5">万円</span></span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-sm text-gray-400 font-medium mb-4">収入源</p>
              <div className="space-y-3">
                {[
                  { name: "出店料（飲食・物販）", note: "ブース数×単価" },
                  { name: "スポンサー協賛費", note: "企業冠スポンサー" },
                  { name: "ワークショップ参加費", note: "有料体験ブース" },
                  { name: "グッズ・コラボ商品販売", note: "トリモブコラボ" },
                  { name: "県・市からの補助金", note: "後援申請と連動" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <span className="text-green-500 text-sm shrink-0">＋</span>
                    <div>
                      <p className="text-sm text-gray-200">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partnership */}
        <section>
          <SectionTitle icon="🤝" label="連携・集客戦略" />
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🏛️",
                title: "鳥取県「子育て王国」",
                points: ["共催・後援名義取得", "県公式SNS・メルマガで広報", "参加者向け子育て特典配布"],
              },
              {
                icon: "📺",
                title: "地元メディア連携",
                points: ["NHK鳥取・日本海新聞", "プレスリリース配信", "取材誘致・当日密着"],
              },
              {
                icon: "🎓",
                title: "大学・短大ボランティア",
                points: ["鳥取大学・鳥取短大", "学生スタッフ確保", "コスプレ文化との連携"],
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <span className="text-2xl block mb-3">{item.icon}</span>
                <p className="font-semibold text-white text-sm mb-3">{item.title}</p>
                <ul className="space-y-2">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-purple-400 shrink-0 mt-0.5">▸</span>{pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section>
          <SectionTitle icon="🗓️" label="スケジュール" />
          <div className="relative pl-6 border-l-2 border-orange-900/60 space-y-4">
            {[
              { month: "2026年6月", text: "基本企画確定・各会場への初回説明", current: true },
              { month: "2026年7月", text: "行政への許可申請・鳥取県後援打診" },
              { month: "2026年8月", text: "出店者募集開始・スポンサー交渉・広報素材制作" },
              { month: "2026年9月", text: "出店者確定・メディア告知・スタッフ募集" },
              { month: "2026年10月上旬", text: "最終確認・リハーサル・SNS集中告知" },
              { month: "2026年10月下旬", text: "🎃 トリモブのハロウィンナイト 開催！", highlight: true },
              { month: "2026年11月", text: "報告・振り返り・次回企画へ" },
            ].map((item) => (
              <div key={item.month} className="relative flex gap-4 items-start">
                <div className={`absolute -left-[1.65rem] mt-1.5 w-3 h-3 rounded-full border-2 ${
                  item.highlight ? "bg-orange-400 border-orange-400" :
                  item.current ? "bg-orange-600 border-orange-400" :
                  "bg-[#0c0c1e] border-gray-600"
                }`} />
                <div className={`rounded-xl px-4 py-3 flex-1 ${
                  item.highlight ? "bg-orange-500/15 border border-orange-500/50" :
                  item.current ? "bg-white/[0.08] border border-white/15" :
                  "bg-white/[0.03] border border-white/8"
                }`}>
                  <p className={`text-xs font-bold mb-0.5 ${
                    item.highlight ? "text-orange-400" :
                    item.current ? "text-orange-300" : "text-gray-500"
                  }`}>{item.month}</p>
                  <p className={`text-sm ${item.highlight ? "text-white font-semibold" : "text-gray-300"}`}>
                    {item.text}
                    {item.current && (
                      <span className="ml-2 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded font-bold">現在</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <footer className="border-t border-white/8 text-center py-8 text-gray-600 text-xs">
        株式会社琴線 — トリモブフェスタ 2026 | 本資料は事業計画の暫定案です
      </footer>
    </div>
  );
}
