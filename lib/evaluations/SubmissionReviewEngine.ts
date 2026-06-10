"use server";

import { analyzeCommitVelocity, CommitData } from './CommitVelocityAnalyzer';
import { 
  AIReviewResultSchema, 
  AIReviewResult, 
  UNCOMPROMISING_ARCHITECT_PROMPT 
} from '../prompts/aiReviewerPrompt';

// Simulated local inference call
// In production, this targets the local Ollama daemon
async function callLocalLLM(prompt: string, codeContent: string, temperature: number): Promise<string> {
  console.log(`Calling local LLM with temperature: ${temperature}`);
  // Simulating output matching the new Matrix...
  return JSON.stringify({
    is_human_written: true,
    plagiarism_flags: [],
    tier_1: {
      SECURE_SDK_INIT: true,
      WEBHOOK_VERIFY: true,
      IDEMPOTENCY: true
    },
    tier_2: {
      REACT_STATE_POLISH: 85,
      ERROR_HANDLING: 90,
      TYPE_SAFETY: 88
    },
    evaluation_summary: "Robust architecture. Handled webhook signatures perfectly.",
    hire_recommendation: "STRONG_HIRE"
  });
}

export type SubmissionType = 'learning' | 'hiring_challenge';

export interface SubmissionPayload {
  submissionId: string;
  projectType: SubmissionType;
  commits: CommitData[];
  sourceCode: string;
}

export type SubmissionReviewResponse = 
  | { success: true; mode: string; report: AIReviewResult }
  | { success: false; error: string; errorType: 'VALIDATION_ERROR' | 'SYSTEM_ERROR' };

export async function processSubmission(payload: SubmissionPayload): Promise<SubmissionReviewResponse> {
  const { projectType, commits, sourceCode } = payload;

  if (projectType === 'hiring_challenge') {
    // 1. Commit Velocity Analysis
    const velocityResult = analyzeCommitVelocity(commits);

    // 2. Call local inference with strict temperature
    let rawResponse = "";
    try {
      rawResponse = await callLocalLLM(UNCOMPROMISING_ARCHITECT_PROMPT, sourceCode, 0.1);
    } catch (error) {
      return {
        success: false,
        error: "Local inference engine offline or crashed.",
        errorType: 'SYSTEM_ERROR'
      };
    }

    // 3. Strict Zod Schema Parsing & Error Catching
    let reviewData: AIReviewResult;
    try {
      let jsonPayload;
      try {
        jsonPayload = JSON.parse(rawResponse);
      } catch (parseError) {
        // Fallback JSON extraction
        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonPayload = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Could not extract JSON from LLM response");
        }
      }

      // Enforce the Uncompromising Architect Matrix
      reviewData = AIReviewResultSchema.parse(jsonPayload);
      
    } catch (error) {
      console.error("Zod Validation Error:", error);
      // Graceful degradation: Do not crash the UI. Return a validation error state.
      return {
        success: false,
        error: "The AI Reviewer returned a malformed or hallucinatory response that failed strict schema validation.",
        errorType: 'VALIDATION_ERROR'
      };
    }

    // 4. Override recommendation if velocity is flagged
    if (velocityResult.isFlagged) {
      reviewData.is_human_written = false;
      reviewData.plagiarism_flags = [
        ...reviewData.plagiarism_flags,
        ...velocityResult.flags
      ];
      reviewData.hire_recommendation = "NO_HIRE";
    }

    // 5. Hard enforcement of Tier 1 Kill Switches
    const t1 = reviewData.tier_1;
    if (!t1.SECURE_SDK_INIT || !t1.WEBHOOK_VERIFY || !t1.IDEMPOTENCY) {
      reviewData.hire_recommendation = "NO_HIRE";
    }

    return {
      success: true,
      mode: 'hiring_challenge',
      report: reviewData
    };
  }

  // Handle learning mode (omitted for brevity, focus is on Hiring Challenge)
  return {
    success: false,
    error: "Learning mode evaluation not yet fully ported to the new Matrix.",
    errorType: 'SYSTEM_ERROR'
  };
}
