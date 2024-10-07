const express = require('express');
const { allBooks, bookDetail } = require('../controller/booksController');

const router = express.Router();

router.use(express.json());

router.get('/:bookId', bookDetail);

router.get('/', allBooks);

module.exports = router;
