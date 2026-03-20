import express from 'express';

const router = express.Router();

router.get('/:workerId', (req, res) => {
  res.json({
    score: 720,
    tier: 'Trusted',
    lastUpdated: new Date().toISOString(),
    history: [
      { week: -4, score: 680 },
      { week: -3, score: 695 },
      { week: -2, score: 710 },
      { week: -1, score: 720 }
    ],
    factors: {
      renewals: 100, // 100% on time
      claims: 3,
      fraudFlags: 0,
      platformRating: 4.8,
      experience: 14 // months
    }
  });
});

export default router;
