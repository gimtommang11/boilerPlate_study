const express = require("express"); //익스프레스 모듈 가져옴
const app = express(); //함수를 이용해 새로운 익스프래스 앱 생성
const port = 5000; //포트번호

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://suhalee:suha2002!@cluster0-1e0mz.mongodb.net/test?retryWrites=true&w=majority",
    {
      //안써주면 에러 남
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  ).then(() => console.log("MongoDB Connected,,,"))
  .catch((err) => console.log(err));

//두트 디랙토리 보면 hello world 출력하게
app.get("/", (req, res) => res.send("Hello World!!안녕"));

//5000번 포트에서 실행하도록, listen하면 exampel...이 출력됨 
app.listen(port, () => console.log(`Example app listening on port ${port}`));
