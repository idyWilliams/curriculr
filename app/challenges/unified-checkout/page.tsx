"use client";

import React, { useState } from 'react';
import { VerifiedEngineeringReport } from '@/components/evaluations/VerifiedEngineeringReport';
import { processSubmission } from '@/lib/evaluations/SubmissionReviewEngine';
import { Code2, Github, TerminalSquare, UploadCloud, Loader2 } from 'lucide-react';

export default function UnifiedCheckoutChallengePage() {
  const [githubUrl, setGithubUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl) return;

    setIsSubmitting(true);
    setError(null);
    setReport(null);

    try {
      // Mocked commit history and source code for the sake of the UI scaffolding
      const mockPayload = {
        submissionId: "sub-123",
        projectType: "hiring_challenge" as const,
        commits: [
          {
            hash: "a1b2c3d",
            message: "Initial commit - full checkout architecture",
            timestamp: new Date().toISOString(),
            linesAdded: 2500,
            linesDeleted: 0,
            filesChanged: 20
          }
        ],
        sourceCode: `import { AfricaPay } from '@use-africa-pay/core';\n\nfunction calculateTotalAmountWithDiscountAndTax() { return 100; }`
      };

      const result = await processSubmission(mockPayload);
      
      if (result.success && result.mode === 'hiring_challenge') {
        setReport(result.report);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during submission evaluation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Challenge Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20 mb-4">
            <TerminalSquare className="w-4 h-4" />
            Hiring Challenge
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Unified Checkout Architecture
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Design and implement a resilient payment routing system integrating the <code className="text-zinc-300">@use-africa-pay/core</code> library. AI-generated code is strictly forbidden.
          </p>
        </div>

        {!report ? (
          /* Submission Form */
          <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-zinc-400" />
              Submit Your Solution
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-zinc-300 mb-2">
                  GitHub Repository URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Github className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="url"
                    id="githubUrl"
                    className="block w-full pl-10 bg-zinc-950 border border-zinc-800 rounded-lg py-3 text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                    placeholder="https://github.com/username/unified-checkout"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-sm text-amber-200/80">
                <strong>Warning:</strong> By submitting, you agree to our Zero-AI Policy. Your commit history and code structure will be analyzed for structural fingerprints.
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-sm text-rose-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !githubUrl}
                className="w-full bg-white text-zinc-950 font-semibold py-3 px-4 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Running Evaluation Engine...
                  </>
                ) : (
                  <>
                    <Code2 className="w-5 h-5" />
                    Submit for Verification
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Results Dashboard */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <VerifiedEngineeringReport 
              isHumanWritten={report.is_human_written}
              domainExecutionScore={report.domain_execution_score}
              engineeringPolishScore={report.engineering_polish_score}
              hireRecommendation={report.hire_recommendation}
              plagiarismFlags={report.plagiarism_flags}
              evaluationSummary={report.evaluation_summary}
            />
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => setReport(null)}
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
              >
                ← Submit another solution
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
