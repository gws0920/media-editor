const express = require('express')
const Mock = require('mockjs')
const app = express()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

app.get('/test', (req, res) => {
  console.log('请求参数', req);
  const data = {
    code: 200,
    "data|20": [{
      "duration|1000000-20000000": 20000000,
      "url": "@image(480x270, @color, #FFF, +1)",
      "name": "@name",
      "id": "@guid"
    }]
  }
  res.json(Mock.mock(data))
})

app.listen(3000, () => {
  console.log('服务启动: http://localhost:3000');
})