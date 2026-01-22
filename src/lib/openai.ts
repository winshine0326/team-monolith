import OpenAI from "openai";

// OpenAI 클라이언트 초기화
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // 프론트엔드에서 직접 호출
});

// API 키 확인
export function checkApiKey(): boolean {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return !!apiKey && apiKey !== "your_openai_api_key_here";
}
