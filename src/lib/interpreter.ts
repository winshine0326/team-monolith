import { openai } from "./openai";
import type { GameState, CodeExecutionResult } from "@/types/game";

// 프롬프트 생성
function createPrompt(code: string, gameState: GameState): string {
  return `당신은 Code Farm 게임의 파이썬 코드 분석기입니다.
사용자가 작성한 파이썬 코드를 분석하여 농장 액션 리스트를 JSON으로 변환하세요.

**중요: 유효성 검사를 하지 마세요. 코드를 있는 그대로 액션으로 변환만 하세요.**

## 현재 게임 상태 (참고용)
- 골드: ${gameState.gold}G
- 씨앗: ${JSON.stringify(gameState.seeds)}
- 그리드 크기: 4x4 (x: 0-3, y: 0-3)

## 사용 가능한 함수
1. plant(x, y, crop) - (x, y) 위치에 작물 심기
   - crop: "carrot", "tomato", "pumpkin"
2. water(x, y) - (x, y) 위치에 물 주기
3. water_all() - 전체 밭에 물 주기
4. harvest(x, y) - (x, y) 위치 수확
5. harvest_all() - 수확 가능한 모든 작물 수확

## 사용자 코드
\`\`\`python
${code}
\`\`\`

## 응답 형식
**반드시 JSON만 반환하세요.**

성공 시 (항상 success: true로 반환):
{
  "success": true,
  "actions": [
    { "type": "plant", "x": 0, "y": 0, "crop": "carrot" },
    { "type": "water", "x": 0, "y": 0 }
  ],
  "message": "액션 변환 완료"
}

구문 에러가 있는 경우에만:
{
  "success": false,
  "actions": [],
  "error": "파이썬 구문 에러 메시지"
}

**규칙:**
1. 코드의 로직을 정확히 해석하세요 (for, if, while, range 등)
2. for 루프는 모든 반복을 펼쳐서 각각의 액션으로 변환하세요
   예: for i in range(2): plant(i, 0, "carrot")
   → [{"type": "plant", "x": 0, "y": 0, "crop": "carrot"}, {"type": "plant", "x": 1, "y": 0, "crop": "carrot"}]
3. 중첩 for문도 완전히 펼치세요
4. **유효성 검사는 절대 하지 마세요** (빈 땅 체크, 씨앗 체크 등 하지 마세요)
5. JSON 형식만 반환 (마크다운 코드 블록 사용 금지)`;
}

// 코드 실행
export async function executeCode(
  code: string,
  gameState: GameState
): Promise<CodeExecutionResult> {
  try {
    // 빈 코드 체크 - 주석을 제외한 실제 코드가 있는지 확인
    const codeLines = code.split("\n");
    const hasCode = codeLines.some(
      (line) => line.trim() && !line.trim().startsWith("#")
    );

    if (!hasCode) {
      return {
        success: true,
        actions: [],
        message: "코드를 작성해주세요!",
      };
    }

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "당신은 Code Farm 게임의 파이썬 인터프리터입니다. JSON만 반환하세요.",
        },
        {
          role: "user",
          content: createPrompt(code, gameState),
        },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const result = response.choices[0]?.message?.content;
    if (!result) {
      throw new Error("OpenAI 응답이 비어있습니다.");
    }

    // JSON 파싱
    const parsed = JSON.parse(result) as CodeExecutionResult;

    // 디버깅 로그
    console.log("🤖 OpenAI 응답:", parsed);
    console.log("📋 실행할 액션:", parsed.actions);

    return parsed;
  } catch (error) {
    console.error("Code execution error:", error);
    return {
      success: false,
      actions: [],
      error: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
    };
  }
}
