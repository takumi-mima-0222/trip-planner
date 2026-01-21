// LP用の定数・データ定義

export const HERO_CONTENT = {
  headline: "行きたい場所は決まっている。回り方と時間は、AIが整えます。",
  subText: "行きたい場所が多すぎて整理できない。移動時間を考慮した現実的なプランを自動作成します。",
} as const;

export const TARGET_AUDIENCE = [
  "行きたい場所はあるが、順番が決められない",
  "2泊3日〜で時間配分が不安",
  "最終日に空港や駅へ間に合うか気になる",
  "詰め込みすぎず、でも満足したい",
] as const;

export const FEATURES = [
  {
    title: "移動時間を考慮した順番",
    description: "スポット間の移動時間を計算し、無理なく回れる順番を自動で提案します。",
    iconName: "Route" as const,
  },
  {
    title: "最終日の到着条件で慌てない",
    description: "帰りの飛行機や新幹線に合わせて、余裕を持った旅程を組みます。",
    iconName: "Clock" as const,
  },
  {
    title: "旅のペースを調整",
    description: "ゆったり派もぎゅっと派も。あなたに合ったペースでプランを作成。",
    iconName: "Sliders" as const,
  },
] as const;

export const STEPS = [
  {
    number: 1,
    title: "基本情報を入力",
    description: "出発地・宿泊地・行きたい場所を入力",
  },
  {
    number: 2,
    title: "オプションを設定",
    description: "交通手段・ペース・到着条件を選択",
  },
  {
    number: 3,
    title: "プランを受け取る",
    description: "日別スケジュールを受け取って旅へ",
  },
] as const;

// サンプルプランの概要情報（PlanSummaryPropsに対応）
export const SAMPLE_PLAN_SUMMARY = {
  title: "沖縄の魅力を満喫する2日間プラン",
  feasibilitySummary: "指定された全スポットを無理なく回ることが可能です。",
  startDate: "2026-01-21",
  endDate: "2026-01-22",
  totalDays: 2,
  startLocation: "那覇空港",
  startTime: "09:00",
  baseStay: "オリオンホテル",
  spotCount: 3,
  isFeasible: true,
  endLocation: "那覇空港",
  endTime: "19:00",
  transportMode: "car" as const,
  pace: "normal" as const,
} as const;

// サンプルプランの日程詳細（TripPlanDayに対応）
export const SAMPLE_PLAN_DAYS = [
  {
    dayNumber: 1,
    date: "2026-01-21",
    theme: "那覇周辺の魅力を堪能",
    items: [
      {
        spotId: "start",
        type: "travel" as const,
        startTime: "09:00",
        endTime: "09:30",
        name: "那覇空港から移動",
        stayMinutes: 30,
        detail: "レンタカーを受け取り、首里城へ向かいます",
      },
      {
        spotId: "spot-1",
        type: "spot" as const,
        startTime: "09:30",
        endTime: "11:30",
        name: "首里城公園",
        stayMinutes: 120,
        detail: "世界遺産の首里城を見学。正殿や御庭を巡ります",
      },
      {
        spotId: "meal-1",
        type: "meal" as const,
        startTime: "12:00",
        endTime: "13:00",
        name: "沖縄そば 首里ほりかわ",
        stayMinutes: 60,
        detail: "地元で人気の沖縄そば専門店でランチ",
      },
      {
        spotId: "travel-2",
        type: "travel" as const,
        startTime: "13:00",
        endTime: "13:30",
        name: "国際通りへ移動",
        stayMinutes: 30,
        detail: "首里から那覇市街地へ",
      },
      {
        spotId: "spot-2",
        type: "spot" as const,
        startTime: "13:30",
        endTime: "16:00",
        name: "国際通り散策",
        stayMinutes: 150,
        detail: "お土産選びや沖縄スイーツを楽しみます",
      },
      {
        spotId: "travel-3",
        type: "travel" as const,
        startTime: "16:00",
        endTime: "16:30",
        name: "ホテルへ移動",
        stayMinutes: 30,
        detail: "本日の宿泊先へ向かいます",
      },
      {
        spotId: "hotel-1",
        type: "hotel" as const,
        startTime: "16:30",
        endTime: "17:00",
        name: "オリオンホテル チェックイン",
        stayMinutes: 30,
        detail: "チェックイン後、夕食まで自由時間",
      },
    ],
  },
  {
    dayNumber: 2,
    date: "2026-01-22",
    theme: "美ら海水族館と最終日",
    items: [
      {
        spotId: "hotel-2",
        type: "hotel" as const,
        startTime: "08:00",
        endTime: "08:30",
        name: "チェックアウト",
        stayMinutes: 30,
        detail: "荷物を車に積んで出発準備",
      },
      {
        spotId: "travel-4",
        type: "travel" as const,
        startTime: "08:30",
        endTime: "10:30",
        name: "美ら海水族館へ移動",
        stayMinutes: 120,
        detail: "沖縄自動車道を利用して北部へ",
      },
      {
        spotId: "spot-3",
        type: "spot" as const,
        startTime: "10:30",
        endTime: "13:30",
        name: "沖縄美ら海水族館",
        stayMinutes: 180,
        detail: "黒潮の海の大水槽やイルカショーを楽しみます",
      },
      {
        spotId: "meal-2",
        type: "meal" as const,
        startTime: "13:30",
        endTime: "14:30",
        name: "海人料理 海邦丸",
        stayMinutes: 60,
        detail: "新鮮な海鮮料理でランチ",
      },
      {
        spotId: "travel-5",
        type: "travel" as const,
        startTime: "14:30",
        endTime: "17:00",
        name: "那覇空港へ移動",
        stayMinutes: 150,
        detail: "レンタカーを返却し、空港へ",
      },
      {
        spotId: "end",
        type: "travel" as const,
        startTime: "17:00",
        endTime: "19:00",
        name: "那覇空港で搭乗手続き",
        stayMinutes: 120,
        detail: "お土産の最終購入と搭乗手続き",
      },
    ],
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "無料で使えますか？",
    answer: "はい、現在は無料でご利用いただけます。登録も不要で、すぐにプラン作成を始められます。",
  },
  {
    question: "入力はどれくらい必要ですか？",
    answer: "最低限必要なのは「旅行日程」「出発地点」「宿泊拠点」「行きたいスポット（1つ以上）」の4項目です。より詳細なプランが欲しい場合は、交通手段やペースなども設定できます。",
  },
  {
    question: "2泊3日以外の旅行でも使えますか？",
    answer: "もちろんです。日帰りから1週間以上の旅行まで、幅広い日程に対応しています。",
  },
  {
    question: "生成されたプランは編集できますか？",
    answer: "現在は生成されたプランの直接編集機能はありませんが、条件を変更して再生成することができます。また、共有リンクでプランを保存・共有できます。",
  },
  {
    question: "うまくプランが組めないときはどうなりますか？",
    answer: "入力されたスポットを全て回ることが難しい場合、AIが問題点と代替案を提示します。どのスポットを優先するかの判断材料としてお使いください。",
  },
] as const;

export const CTA_CONTENT = {
  title: "まずは1回、無料で旅程を整えてみませんか？",
  subText: "登録不要・すぐに使えます",
} as const;

export const FOOTER_LINKS = [
  { href: "/guide", label: "使い方ガイド" },
  { href: "/tips", label: "旅行ノウハウ" },
  { href: "/faq", label: "よくある質問" },
  { href: "/privacy-policy", label: "プライバシーポリシー" },
] as const;
