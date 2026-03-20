import { useState, useCallback, useEffect } from 'react';
import { calculateGigScore, getTier, getScoreBreakdown, GIGSCORE_TIERS } from '../utils/gigScoreCalc';

export const useGigScore = (worker) => {
  const [score, setScore] = useState(worker?.gigScore || 720);
  const [tier, setTier] = useState(getTier(worker?.gigScore || 720));
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (worker?.gigScore) {
      setScore(worker.gigScore);
      setTier(getTier(worker.gigScore));
    }
  }, [worker]);

  useEffect(() => {
    // Generate mock history
    const mockHistory = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2026, 2, 17);
      date.setDate(date.getDate() - (11 - i) * 7);
      const baseScore = (worker?.gigScore || 720) - 200 + (i * 18) + Math.floor(Math.random() * 30);
      return {
        date: date.toISOString().split('T')[0],
        score: Math.max(100, Math.min(1000, baseScore)),
        event: i === 8 ? 'Claim approved (+15)' : i === 5 ? 'On-time renewal (+10)' : null,
      };
    });
    setHistory(mockHistory);
  }, [worker]);

  const recalculate = useCallback((params) => {
    setLoading(true);
    const result = getScoreBreakdown(params);
    setTimeout(() => {
      setScore(result.score);
      setTier(result.tier);
      setLoading(false);
    }, 500);
    return result;
  }, []);

  const updateScore = useCallback((delta) => {
    setScore(prev => {
      const newScore = Math.max(0, Math.min(1000, prev + delta));
      setTier(getTier(newScore));
      return newScore;
    });
  }, []);

  return { score, tier, history, loading, recalculate, updateScore, GIGSCORE_TIERS };
};
