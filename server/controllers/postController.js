const Post = require('../models/Post');

exports.getAll = async (req, res, next) => {
    try {
        // Destructure query params with defaults
        const { page = 1, limit = 10, q, category } = req.query;

        // Build filter object
        const filter = {};
        if (q) filter.$text = { $search: q }; // text search
        if (category) filter.categories = category; // filter by category ID

        // Query database
        const posts = await Post.find(filter)
            .populate('author', 'name')
            .populate('categories', 'name')
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });

        // Count total matching documents
        const total = await Post.countDocuments(filter);

        // Send response
        res.json({
            data: posts,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
            },
        });
    } catch (err) {
        next(err);
    }
};
exports.getOne = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
            .populate('author', 'name')
            .populate('categories', 'name');
        if (!post) return res.status(404).json({ message: 'Not found' });
        res.json(post);
    } catch (err) { next(err); }
};


exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { title, body, excerpt, categories } = req.body;
        const featuredImage = req.file ? req.file.path : undefined;
        const post = await Post.create({ title, body, excerpt, categories, featuredImage, author: req.user._id });
        res.status(201).json(post);
    } catch (err) { next(err); }
};


exports.update = async (req, res, next) => {
    try {
        const { title, body, excerpt, categories } = req.body;
        const featuredImage = req.file ? req.file.path : undefined;
        const update = { title, body, excerpt, categories };
        if (featuredImage) update.featuredImage = featuredImage;
        update.updatedAt = new Date();
        const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!post) return res.status(404).json({ message: 'Not found' });
        res.json(post);
    } catch (err) { next(err); }
};


exports.remove = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
};