const { body } = require('express-validator');
module.exports.createPost = [
    body('title').isLength({ min: 3 }).withMessage('Title too short'),
    body('body').isLength({ min: 10 }).withMessage('Body too short')
];