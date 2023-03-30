// @ts-check

const express = require('express');

const server = express();

server.set('view engine', 'ejs');
server.set('views', 'views'); // 공식화
server.use(express.static('public'));


server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const index = require('./routes/index');


server.use('/', index);


server.listen(3006, () => {
  console.log(`서버가 3006번 포트에서 작동중입니다.`);
});
