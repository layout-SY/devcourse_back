const express = require('express');

const router = express.Router();

router.use(express.json());

router.post('/:bookId', (req, res) => {
	res.json('좋아요 추가');
});

router.delete('/:bookId', (req, res) => {
	res.json('좋아요 취소');
});

module.exports = router;
