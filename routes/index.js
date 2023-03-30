const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    console('사용자가 1번 포트로 연결되었습니다.')
    res.render('index');
});

module.exports = router;