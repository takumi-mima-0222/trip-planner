import { z } from "zod";

// スポットの優先度
export const spotPrioritySchema = z.enum(["must", "nice"]);
export type SpotPriority = z.infer<typeof spotPrioritySchema>;

// 出発地点: 文字列
// 出発時刻: 例）09:00
// 旅行開始日・終了日: YYYY-MM-DD形式
// 宿泊拠点: 文字列
// 行きたいスポット: オブジェクト配列（useFieldArray対応）
export const spotSchema = z.object({
	value: z.string().min(1, "スポット名を入力してください"),
	priority: spotPrioritySchema,
});

// 交通手段
export const transportModeSchema = z.enum(["car", "transit", "walk"]);
export type TransportMode = z.infer<typeof transportModeSchema>;

// 旅のペース
export const paceSchema = z.enum(["relaxed", "normal", "packed"]);
export type Pace = z.infer<typeof paceSchema>;

export const planCreateSchema = z.object({
	startDate: z
		.string()
		.min(1, "旅行開始日を入力してください")
		.regex(/^\d{4}-\d{2}-\d{2}$/, "日付はYYYY-MM-DD形式で入力してください"),
	endDate: z
		.string()
		.min(1, "旅行終了日を入力してください")
		.regex(/^\d{4}-\d{2}-\d{2}$/, "日付はYYYY-MM-DD形式で入力してください"),
	departure: z.string().min(1, "出発地点を入力してください"),
	departureTime: z
		.string()
		.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "時刻はHH:MM形式で入力してください"),
	baseStay: z.string().min(1, "宿泊拠点を入力してください"),
	spots: z.array(spotSchema).min(1, "1つ以上のスポットを入力してください"),
	// 終了条件（任意）
	endLocation: z.string().optional(),
	endTime: z
		.string()
		.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "時刻はHH:MM形式で入力してください")
		.optional()
		.or(z.literal("")),
	// 交通手段（必須 - デフォルトはフォームのdefaultValuesで設定）
	transportMode: transportModeSchema,
	// 旅のペース（必須 - デフォルトはフォームのdefaultValuesで設定）
	pace: paceSchema,
}).refine(
	(data) => new Date(data.startDate) <= new Date(data.endDate),
	{
		message: "終了日は開始日以降の日付を入力してください",
		path: ["endDate"],
	}
);

export type Spot = z.infer<typeof spotSchema>;
export type PlanCreateInput = z.infer<typeof planCreateSchema>;
