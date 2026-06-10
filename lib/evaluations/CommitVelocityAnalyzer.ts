export interface CommitData {
  hash: string;
  message: string;
  timestamp: string;
  linesAdded: number;
  linesDeleted: number;
  filesChanged: number;
}

export interface VelocityAnalysisResult {
  isFlagged: boolean;
  flags: string[];
  riskScore: number; // 0-100
}

/**
 * Analyzes commit history to detect suspicious velocity patterns.
 * e.g., jumping from an empty repo to a complex architecture in a single commit.
 */
export function analyzeCommitVelocity(commits: CommitData[]): VelocityAnalysisResult {
  let isFlagged = false;
  const flags: string[] = [];
  let riskScore = 0;

  if (!commits || commits.length === 0) {
    return {
      isFlagged: true,
      flags: ['No commit history provided. Suspicious for a complex architecture.'],
      riskScore: 100,
    };
  }

  if (commits.length === 1) {
    flags.push('Only a single commit found. Missing iterative development history.');
    riskScore += 50;
  }

  // Check for anomalous first commit (huge chunk of code at once)
  const initialCommit = commits[commits.length - 1]; // Assuming reverse chronological order
  if (initialCommit && initialCommit.linesAdded > 2000 && initialCommit.filesChanged > 15) {
    flags.push('Initial commit contains an abnormally large amount of code, suggesting copy-paste or LLM generation.');
    riskScore += 70;
  }

  // Check for rapid successive massive commits
  for (let i = 0; i < commits.length - 1; i++) {
    const current = commits[i];
    const previous = commits[i + 1];

    const timeDiffMs = new Date(current.timestamp).getTime() - new Date(previous.timestamp).getTime();
    const timeDiffMinutes = Math.abs(timeDiffMs) / (1000 * 60);

    if (timeDiffMinutes < 5 && current.linesAdded > 1500) {
      flags.push(`Massive code addition (${current.linesAdded} lines) within ${Math.round(timeDiffMinutes)} minutes of previous commit.`);
      riskScore += 40;
    }
  }

  if (riskScore >= 70) {
    isFlagged = true;
  }

  // Normalize risk score to 0-100
  riskScore = Math.min(riskScore, 100);

  return {
    isFlagged,
    flags,
    riskScore,
  };
}
