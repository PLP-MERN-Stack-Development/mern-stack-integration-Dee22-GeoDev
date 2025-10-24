const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const auth = require('../middleware/auth');
const { createPost, updatePost } = require('../validators/postValidator');
const postController = require('../controllers/postController');

router.get('/', postController.getAll);

router.get('/:id', postController.getOne);
router.post('/', auth, upload.single('featuredImage'), createPost, postController.create);
// console.log({
//     auth: typeof auth,
//     upload: typeof upload,
//     uploadSingle: typeof upload.single,
//     updatePost: typeof updatePost,
//     controllerUpdate: typeof postController.update
// });

// router.put('/:id', auth, upload.single('featuredImage'), updatePost, postController.update);

router.delete('/:id', auth, postController.remove);

module.exports = router;
