export const tripPlanJsonSchema = {
  name: "tripPlanV2",
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["version", "timezone", "request", "feasibility", "plan", "issues", "alternatives"],
    properties: {
      version: { type: "string", enum: ["trip-plan.v2"] },
      timezone: { type: "string", enum: ["Asia/Tokyo"] },

      request: {
        type: "object",
        additionalProperties: false,
        required: ["startDate", "endDate", "startLocation", "startTime", "baseStay", "spots", "endLocation", "endTime", "transportMode", "pace"],
        properties: {
          startDate: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
          endDate: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
          startLocation: { type: "string", minLength: 1 },
          startTime: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d$" },
          baseStay: { type: "string", minLength: 1 },
          spots: {
            type: "array",
            minItems: 1,
            items: { type: "string", minLength: 1 }
          },
          // 終了条件（任意 - nullを許容）
          endLocation: { type: ["string", "null"] },
          endTime: { type: ["string", "null"] },
          // 交通手段・ペース
          transportMode: { type: "string", enum: ["car", "transit", "walk"] },
          pace: { type: "string", enum: ["relaxed", "normal", "packed"] }
        }
      },

      // 旅程が成立するかどうか
      feasibility: {
        type: "object",
        additionalProperties: false,
        required: ["isFeasible", "summary"],
        properties: {
          isFeasible: { type: "boolean" },
          summary: { type: "string", minLength: 1 }
        }
      },

      // 日別のプラン
      plan: {
        type: "object",
        additionalProperties: false,
        required: ["title", "totalDays", "days"],
        properties: {
          title: { type: "string", minLength: 1 },
          totalDays: { type: "integer", minimum: 1 },
          days: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              additionalProperties: false,
              required: ["dayNumber", "date", "theme", "items"],
              properties: {
                dayNumber: { type: "integer", minimum: 1 },
                date: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
                theme: { type: "string", minLength: 1 },
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["spotId", "type", "startTime", "endTime", "name", "stayMinutes", "detail"],
                    properties: {
                      spotId: { type: "string", minLength: 1 },
                      type: { type: "string", enum: ["spot", "meal", "hotel", "travel"] },
                      startTime: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d$" },
                      endTime: { type: "string", pattern: "^([01]\\d|2[0-3]):[0-5]\\d$" },
                      name: { type: "string", minLength: 1 },
                      stayMinutes: { type: "integer", minimum: 0 },
                      detail: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },

      // 破綻している場合の問題点
      issues: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["type", "severity", "description", "affectedSpots"],
          properties: {
            type: { type: "string", enum: ["time", "distance", "constraint", "capacity"] },
            severity: { type: "string", enum: ["critical", "warning", "info"] },
            description: { type: "string", minLength: 1 },
            affectedSpots: {
              type: "array",
              items: { type: "string" }
            }
          }
        }
      },

      // 代替案（破綻時や最適化提案）
      alternatives: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "title", "description", "changes"],
          properties: {
            id: { type: "string", minLength: 1 },
            title: { type: "string", minLength: 1 },
            description: { type: "string", minLength: 1 },
            changes: {
              type: "array",
              items: { type: "string", minLength: 1 }
            }
          }
        }
      }
    }
  }
} as const;
