const express = require('express');
const { addLike, deleteLike } = require('../controller/likesController');

const router = express.Router();

router.use(express.json());

router.post('/:liked_book_id', addLike);

router.delete('/:liked_book_id', deleteLike);

module.exports = router;
