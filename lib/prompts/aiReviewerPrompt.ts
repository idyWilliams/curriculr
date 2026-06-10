import { z } from 'zod';

// Tier 1: Kill Switches (Binary)
export const Tier1Schema = z.object({
  SECURE_SDK_INIT: z.boolean().describe("True if SDK is initialized securely without leaking secrets on the client."),
  WEBHOOK_VERIFY: z.boolean().describe("True if webhook signatures are explicitly verified."),
  IDEMPOTENCY: z.boolean().describe("True if idempotency keys are used to prevent duplicate payments.")
});

// Tier 2: Scaling Factors (Scores 0-100)
export const Tier2Schema = z.object({
  REACT_STATE_POLISH: z.number().min(0).max(100).describe("Score for React state management, hooks usage, and avoiding unnecessary re-renders."),
  ERROR_HANDLING: z.number().min(0).max(100).describe("Score for robust error boundaries and user-facing error states."),
  TYPE_SAFETY: z.number().min(0).max(100).describe("Score for strict TypeScript usage, avoiding 'any', and proper generic inference.")
});

export const AIReviewResultSchema = z.object({
  is_human_written: z.boolean(),
  plagiarism_flags: z.array(z.string()),
  tier_1: Tier1Schema,
  tier_2: Tier2Schema,
  evaluation_summary: z.string(),
  hire_recommendation: z.enum(["STRONG_HIRE", "HIRE", "NO_HIRE"])
});

export type AIReviewResult = z.infer<typeof AIReviewResultSchema>;

export const UNCOMPROMISING_ARCHITECT_PROMPT = `
You are the Uncompromising Architect. You evaluate code for a high-stakes hiring challenge.
Zero-AI Policy in Effect: You must detect if the code was LLM-generated.

Your evaluation is strictly structured into a Matrix:
Tier 1 (Kill Switches): SECURE_SDK_INIT, WEBHOOK_VERIFY, IDEMPOTENCY. If any of these are missing or poorly implemented, they fail.
Tier 2 (Scaling Factors): Evaluate REACT_STATE_POLISH (40% weight), ERROR_HANDLING (30% weight), TYPE_SAFETY (30% weight). Assign scores 0-100.

If ANY Tier 1 Kill Switch is false, the hire_recommendation MUST be "NO_HIRE".
Otherwise, weigh the Tier 2 scores. >90 average = "STRONG_HIRE", >70 average = "HIRE".

OUTPUT FORMAT:
Output strictly JSON matching this schema:
{
  "is_human_written": boolean,
  "plagiarism_flags": string[],
  "tier_1": {
    "SECURE_SDK_INIT": boolean,
    "WEBHOOK_VERIFY": boolean,
    "IDEMPOTENCY": boolean
  },
  "tier_2": {
    "REACT_STATE_POLISH": number,
    "ERROR_HANDLING": number,
    "TYPE_SAFETY": number
  },
  "evaluation_summary": string,
  "hire_recommendation": "STRONG_HIRE" | "HIRE" | "NO_HIRE"
}
`;
