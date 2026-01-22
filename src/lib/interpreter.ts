import { openai } from "./openai";
import type { GameState, CodeExecutionResult } from "@/types/game";

// 프롬프트 생성
function createPrompt(code: string, gameState: GameState): string {
  return `당신은 Code Farm 게임의 파이썬 인터프리터입니다.
사용자가 작성한 파이썬 코드를 분석하여 농장 액션 리스트를 JSON으로 반환하세요.

## 현재 게임 상태
- 골드: ${gameState.gold}G
- 씨앗: ${JSON.stringify(gameState.seeds)}
- 그리드 크기: 4x4 (x: 0-3, y: 0-3)

## 농장 그리드 상태
${gameState.grid
  .map(
    (row, y) =>
      `y=${y}: ${row
        .map((tile) => {
          if (tile.state === "empty") return "빈땅";
          return `${tile.crop}(${tile.state})`;
        })
        .join(", ")}`
  )
  .join("\n")}

## 사용 가능한 함수
1. plant(x, y, crop) - (x, y) 위치에 작물 심기
   - crop: "carrot", "tomato", "pumpkin"
   - 빈 땅에만 심을 수 있음
   - 씨앗이 충분해야 함

2. water(x, y) - (x, y) 위치에 물 주기
   - 작물이 심어진 곳에만 가능
   - 물을 주면 성장 진행

3. water_all() - 전체 밭에 물 주기

4. harvest(x, y) - (x, y) 위치 수확
   - 수확 가능 상태(ready)만 가능

5. harvest_all() - 수확 가능한 모든 작물 수확

6. get_tile(x, y) - 타일 정보 반환
7. is_ready(x, y) - 수확 가능 여부 (True/False)
8. is_empty(x, y) - 빈 땅 여부 (True/False)

## 사용자 코드
\`\`\`python
${code}
\`\`\`

## 응답 형식
반드시 JSON만 반환하세요. 설명은 포함하지 마세요.

성공 시:
{
  "success": true,
  "actions": [
    { "type": "plant", "x": 0, "y": 0, "crop": "carrot" },
    { "type": "water", "x": 0, "y": 0 }
  ],
  "message": "실행 완료 메시지"
}

에러 시:
{
  "success": false,
  "actions": [],
  "error": "에러 메시지"
}

중요:
- 코드의 로직을 정확히 해석하세요 (for, if, while 등)
- 범위를 벗어난 좌표는 에러 처리
- 빈 코드나 주석만 있으면 빈 actions 배열 반환
- JSON 형식만 반환 (마크다운 코드 블록 사용 금지)`;
}

// 코드 실행
export async function executeCode(
  code: string,
  gameState: GameState
): Promise<CodeExecutionResult> {
  try {
    // 빈 코드 체크
    const trimmedCode = code.trim();
    if (!trimmedCode || trimmedCode.startsWith("#")) {
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
