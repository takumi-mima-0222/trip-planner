"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, Share2 } from 'lucide-react'


export interface PlanDetailPresentationProps {
}

const PlanDetailPresentation = ({}: PlanDetailPresentationProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
        <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
            {/* Sample Plan Section */}
            <section className="space-y-6">
                {/* Section Header */}
                <div className="text-center">
                    <h3 className="mb-2 text-2xl font-bold text-sky-900">サンプルプラン</h3>
                    <p className="text-sm text-slate-600">
                    プラン作成後は、このようなタイムライン形式で1日のスケジュールが表示されます。
                    </p>
                </div>

                {/* Summary Card */}
                <Card className="bg-gradient-to-br from-sky-500 to-cyan-500 p-6 text-white shadow-xl">
                    <div className="mb-4 flex items-start justify-between">
                    <h4 className="text-xl font-bold">沖縄1日観光プラン（サンプル）</h4>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 hover:text-white"
                    >
                        <Share2 className="mr-2 size-4" />
                        共有リンクをコピー
                    </Button>
                    </div>
                    <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span>出発：09:00 / 那覇空港</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4" />
                        <span>終了：18:00 / アメリカンビレッジ周辺</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="size-4" />
                        <span>スポット数：4 / 移動合計：約2時間30分</span>
                    </div>
                    </div>
                </Card>

                {/* Timeline */}
                <Card className="bg-white p-6 shadow-lg md:p-8">
                    <div className="space-y-8">
                    {/* Timeline Item 1 */}
                    <TimelineItem
                        time="09:30"
                        title="首里城公園"
                        duration="滞在 60分"
                        description="那覇市内の人気観光スポットです。世界遺産に登録されている琉球王国の城跡を見学できます。"
                    />

                    {/* Timeline Item 2 */}
                    <TimelineItem
                        time="11:30"
                        title="国際通り"
                        duration="滞在 90分"
                        description="沖縄のメインストリート。お土産屋さんやレストランが立ち並ぶ賑やかな通りです。"
                    />

                    {/* Timeline Item 3 */}
                    <TimelineItem
                        time="14:00"
                        title="瀬長島ウミカジテラス"
                        duration="滞在 90分"
                        description="海が見える絶景スポット。おしゃれなカフェやショップが並んでいます。"
                    />

                    {/* Timeline Item 4 */}
                    <TimelineItem
                        time="17:00"
                        title="アメリカンビレッジ"
                        duration="滞在 自由"
                        description="アメリカの雰囲気が漂う人気のショッピングエリア。夕日を見ながら散策できます。"
                        isLast
                    />
                    </div>
                </Card>

                {/* Map Placeholder */}
                <Card className="overflow-hidden bg-white shadow-lg">
                    <div className="p-6">
                    <h4 className="mb-4 text-lg font-bold text-slate-900">ルートのイメージ</h4>
                    <div className="flex h-64 items-center justify-center rounded-lg bg-slate-100 md:h-80">
                        <div className="text-center">
                        <MapPin className="mx-auto mb-2 size-12 text-slate-300" />
                        <p className="text-sm font-medium text-slate-400">Map preview</p>
                        </div>
                    </div>
                    <p className="mt-4 text-center text-xs text-slate-500">
                        実際の実装ではここにGoogleマップのルート表示が入ります。
                    </p>
                    </div>
                </Card>
            </section>
        </main>
    </div>
  )
}

function TimelineItem({
  time,
  title,
  duration,
  description,
  isLast = false,
}: {
  time: string
  title: string
  duration: string
  description: string
  isLast?: boolean
}) {
  return (
    <div className="flex gap-6">
      {/* Time */}
      <div className="w-16 shrink-0 pt-1 text-right">
        <span className="text-sm font-bold text-sky-700">{time}</span>
      </div>

      {/* Timeline Line */}
      <div className="relative flex flex-col items-center">
        <div className="size-3 rounded-full bg-sky-500 ring-4 ring-sky-100" />
        {!isLast && <div className="w-0.5 flex-1 bg-sky-200" />}
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <h5 className="mb-1 text-lg font-bold text-slate-900">{title}</h5>
        <p className="mb-2 text-sm font-medium text-sky-600">{duration}</p>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  )
}

export default PlanDetailPresentation