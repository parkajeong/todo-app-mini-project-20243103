require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('서버 정상 작동');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}`);
});