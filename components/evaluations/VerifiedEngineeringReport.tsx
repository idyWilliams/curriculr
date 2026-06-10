"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ShieldAlert, ShieldCheck, Code2, Layers, AlertOctagon, Terminal } from 'lucide-react';

interface Tier1Data {
  SECURE_SDK_INIT: boolean;
  WEBHOOK_VERIFY: boolean;
  IDEMPOTENCY: boolean;
}

interface Tier2Data {
  REACT_STATE_POLISH: number;
  ERROR_HANDLING: number;
  TYPE_SAFETY: number;
}

interface VerifiedEngineeringReportProps {
  isHumanWritten: boolean;
  tier1: Tier1Data;
  tier2: Tier2Data;
  hireRecommendation: 'STRONG_HIRE' | 'HIRE' | 'NO_HIRE';
  plagiarismFlags?: string[];
  evaluationSummary?: string;
}

export function VerifiedEngineeringReport({
  isHumanWritten,
  tier1,
  tier2,
  hireRecommendation,
  plagiarismFlags = [],
  evaluationSummary
}: VerifiedEngineeringReportProps) {
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Trigger the reveal animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRecommendation(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-amber-500';
    return 'text-rose-500';
  };

  const calculateTier2Average = () => {
    // Weighted Average: REACT_STATE_POLISH (40%), ERROR_HANDLING (30%), TYPE_SAFETY (30%)
    const avg = (tier2.REACT_STATE_POLISH * 0.4) + (tier2.ERROR_HANDLING * 0.3) + (tier2.TYPE_SAFETY * 0.3);
    return Math.round(avg);
  };

  const getRecommendationStyles = () => {
    if (hireRecommendation === 'STRONG_HIRE') {
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)]',
        text: 'text-emerald-400',
        icon: <CheckCircle2 className="w-12 h-12 text-emerald-400" />,
        label: 'STRONG HIRE'
      };
    }
    if (hireRecommendation === 'HIRE') {
      return {
        bg: 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)]',
        text: 'text-blue-400',
        icon: <CheckCircle2 className="w-12 h-12 text-blue-400" />,
        label: 'HIRE'
      };
    }
    return {
      bg: 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.15)]',
      text: 'text-rose-400',
      icon: <XCircle className="w-12 h-12 text-rose-400" />,
      label: 'NO HIRE'
    };
  };

  const recommendationStyle = getRecommendationStyles();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 bg-zinc-950 text-zinc-100 rounded-2xl border border-zinc-800 shadow-2xl font-sans tracking-tight">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">
            Verified Engineering Report
          </h1>
          <p className="text-zinc-400 text-sm">
            Unified Checkout Architecture Challenge • High-Stakes Evaluation
          </p>
        </div>
        <div className={`px-4 py-1.5 rounded-full border text-sm font-medium flex items-center gap-2 ${isHumanWritten ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
          {isHumanWritten ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
          {isHumanWritten ? 'Authenticity Guaranteed' : 'Zero-AI Policy Violated'}
        </div>
      </div>

      {/* Matrix Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Tier 1: Kill Switches */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 border-b border-zinc-800 pb-2">
            <AlertOctagon className="w-5 h-5 text-zinc-400" />
            <h2 className="text-lg font-medium text-zinc-200">Tier 1: Kill Switches</h2>
          </div>
          <p className="text-xs text-zinc-500 mb-4">Binary validation. Any failure results in an automatic NO HIRE.</p>
          
          <ul className="space-y-3">
            {[
              { key: 'SECURE_SDK_INIT', label: 'Secure SDK Initialization', passed: tier1.SECURE_SDK_INIT },
              { key: 'WEBHOOK_VERIFY', label: 'Webhook Signature Verification', passed: tier1.WEBHOOK_VERIFY },
              { key: 'IDEMPOTENCY', label: 'Idempotency Key Usage', passed: tier1.IDEMPOTENCY }
            ].map((item) => (
              <li key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/50">
                <span className="text-sm font-medium text-zinc-300">{item.label}</span>
                {item.passed ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PASS
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-400/10 px-2 py-1 rounded">
                    <XCircle className="w-3.5 h-3.5" /> FAIL
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Tier 2: Scaling Factors */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2 border-b border-zinc-800 pb-2">
            <Layers className="w-5 h-5 text-zinc-400" />
            <h2 className="text-lg font-medium text-zinc-200">Tier 2: Scaling Factors</h2>
          </div>
          <div className="flex justify-between items-center mb-4">
             <p className="text-xs text-zinc-500">Weighted scores (0-100) determining the final caliber.</p>
             <span className="text-xs font-bold text-zinc-400 bg-zinc-800 px-2 py-1 rounded">AVG: {calculateTier2Average()}</span>
          </div>
         

          <div className="space-y-4">
            {[
              { key: 'REACT_STATE_POLISH', label: 'React State Polish', score: tier2.REACT_STATE_POLISH, weight: '40%' },
              { key: 'ERROR_HANDLING', label: 'Error Handling', score: tier2.ERROR_HANDLING, weight: '30%' },
              { key: 'TYPE_SAFETY', label: 'Type Safety', score: tier2.TYPE_SAFETY, weight: '30%' }
            ].map((item) => (
              <div key={item.key} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-300 flex items-center gap-2">
                    {item.label} <span className="text-[10px] text-zinc-600 bg-zinc-900 px-1 rounded">{item.weight}</span>
                  </span>
                  <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}/100</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${item.score >= 90 ? 'bg-emerald-500' : item.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                    style={{ width: `${item.score}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Flagged Issues */}
      {!isHumanWritten && plagiarismFlags.length > 0 && (
        <div className="mb-8 p-6 rounded-xl border border-rose-500/30 bg-rose-500/5">
          <h3 className="text-rose-400 font-medium flex items-center gap-2 mb-4">
            <ShieldAlert className="w-5 h-5" />
            Zero-AI Policy Violations Detected
          </h3>
          <ul className="space-y-2">
            {plagiarismFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-rose-200/80">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500/50 mt-1.5 shrink-0" />
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      {evaluationSummary && (
        <div className="mb-8 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
          <h3 className="font-medium mb-3 text-zinc-300 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Architect's Summary
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {evaluationSummary}
          </p>
        </div>
      )}

      {/* Reveal Final Recommendation */}
      <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col items-center justify-center min-h-[160px]">
        {!showRecommendation ? (
          <div className="flex flex-col items-center gap-3 text-zinc-500">
            <div className="w-6 h-6 border-2 border-zinc-500 border-t-zinc-800 rounded-full animate-spin" />
            <span className="text-sm animate-pulse">Computing final matrix resolution...</span>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`w-full max-w-sm p-6 rounded-2xl flex flex-col items-center justify-center text-center border-2 ${recommendationStyle.bg}`}
          >
            <div className="mb-3">
              {recommendationStyle.icon}
            </div>
            <h2 className={`text-2xl font-bold tracking-tight mb-1 ${recommendationStyle.text}`}>
              {recommendationStyle.label}
            </h2>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
              Matrix Final Verdict
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
