// ═══════════════════════════════════════════════════════════════
//  INPUT VALIDATION MIDDLEWARE
// ═══════════════════════════════════════════════════════════════

function validateAssessment(req, res, next) {
  const { age, sex } = req.body;
  const errors = [];

  const age_n = parseInt(age);
  if (isNaN(age_n) || age_n < 18 || age_n > 110) {
    errors.push('Age must be a number between 18 and 110.');
  }

  if (!['male', 'female', 'other'].includes(sex)) {
    errors.push("Sex must be 'male', 'female', or 'other'.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  next();
}

module.exports = { validateAssessment };
