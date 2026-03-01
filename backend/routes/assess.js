const express = require('express');
const router = express.Router();
const { computeScore } = require('../logic/scoring');
const { buildRecommendations } = require('../logic/recommendations');
const { validateAssessment } = require('../middleware/validate');

// POST /api/assess-risk
router.post('/assess-risk', validateAssessment, (req, res) => {
  try {
    const result = computeScore(req.body);
    const recommendations = buildRecommendations(req.body, result.score);
    res.json({ ...result, recommendations });
  } catch (err) {
    console.error('Scoring error:', err);
    res.status(500).json({ error: 'Internal server error during risk calculation.' });
  }
});

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Heart Risk API v2.0 is running.', timestamp: new Date().toISOString() });
});

module.exports = router;
