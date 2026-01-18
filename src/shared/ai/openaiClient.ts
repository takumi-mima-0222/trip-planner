import OpenAI from "openai";

let _openaiClient: OpenAI | null = null;

export const getOpenaiClient = (): OpenAI => {
  if (!_openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not set");
    }
    _openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _openaiClient;
};