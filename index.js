const express = require("express"); //익스프레스 모듈 가져옴
const app = express(); //함수를 이용해 새로운 익스프래스 앱 생성
const port = 5000; //포트번호
const bodyParser = require('body-parser');
const config = require('./config/key');
const {
  User
} = require('./models/User')
//applications/x-www-form-urlencoded 으로 된 데이터를 분석해서 가져올수 있게 함
app.use(bodyParser.urlencoded({ //applications
  extended: true
}));
//json 형식으로 된 것 분석해서 가져올수 있게 함
app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    //안써주면 에러 남
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(() => console.log("MongoDB Connected,,,"))
  .catch((err) => console.log(err));

//두트 디랙토리 보면 hello world 출력하게
app.get("/", (req, res) => res.send("Hello World!!안녕"));

//회원가입을 위한 라우트
app.post('/register', (req, res) => {
  //회원 가입할때 필요한 정보 받으면 db에 넣어줌
  //user 스키마 가져오기

  const user = new User(req.body)
  user.save((err, userInfo) => {
    if (err) return res.json({
      success: false,
      err
    }) //실패했을때
    //성공했을때
    return res.status(200).json({
      success: true,
    })
  })
})

//5000번 포트에서 실행하도록, listen하면 exampel...이 출력됨 
app.listen(port, () => console.log(`Example app listening on port ${port}`));