const { body, validationResult } = require('express-validator/check');

exports.create = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const post = await req.post.addContribution(req.user, req.body.role, req.body.contribution);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.validate = [
  body('role')
    .exists()
    .withMessage('is required')

    .isLength({ min: 1 })
    .withMessage('cannot be blank')

    .isLength({ max: 100 })
    .withMessage('must be at most 100 characters long'),
  body('contribution')
    .exists()
    .withMessage('is required')

    .isLength({ min: 1 })
    .withMessage('cannot be blank')

    .isLength({ max: 1000 })
    .withMessage('must be at most 100 characters long') 
];
