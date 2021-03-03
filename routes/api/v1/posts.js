const express = require('express');
const router = express.Router();
const postsApi = require('../../../controller/api/v1/post_api');

router.get('/',postsApi.index);
router.delete('/:id',postsApi.destroy);
module.exports = router;