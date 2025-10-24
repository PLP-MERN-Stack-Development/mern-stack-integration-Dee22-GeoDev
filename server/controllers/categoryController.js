const Category = require('../models/Category');

//get all categories
exports.getAll = async (req, res, next) => {
    try {
        const cats = await Category.find();
        res.json(cats);
    } catch (err) { next(err); }
};

//create categories
exports.create = async (req, res, next) => {
    try {
        const { name, slug } = req.body;
        const cat = await Category.create({ name, slug });
        res.status(201).json(cat);
    } catch (err) { next(err); }
};