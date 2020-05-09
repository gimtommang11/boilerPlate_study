const express = require("express"); //익스프레스 모듈 가져옴
const app = express(); //함수를 이용해 새로운 익스프래스 앱 생성
const port = 5000; //포트번호
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const {
  User
} = require("./models/User");
//applications/x-www-form-urlencoded 으로 된 데이터를 분석해서 가져올수 있게 함
app.use(
  bodyParser.urlencoded({
    //applications
    extended: true,
  })
);
//json 형식으로 된 것 분석해서 가져올수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    //안써주면 에러 남
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected,,,"))
  .catch((err) => console.log(err));

//두트 디랙토리 보면 hello world 출력하게
app.get("/", (req, res) => res.send("Hello World!!안녕"));

//회원가입을 위한 라우트
app.post("/register", (req, res) => {
  //회원 가입할때 필요한 정보 받으면 db에 넣어줌
  //user 스키마 가져오기
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err)
      return res.json({
        success: false,
        err,
      }); //실패했을때
    //성공했을때
    return res.status(200).json({
      success: true,
    });
  });
});

//로그인 위한 라우트
app.post("/login", (req, res) => {
  //요청한 email db에서 찾기
  User.findOne({
      //db에서 {}안에 들어간 것 찾기(findOne)
      email: req.body.email,
    },
    (err, userInfo) => {
      //콜백 함수
      if (!userInfo) {
        //이메일 가진 유저 없다면
        return req.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다.",
        });
      }
    }
  );
  //요청한 email 있다면 pw 맞는지 확인
  //comparePassword 매서드 만들기
  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!isMatch)
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다",
      });
  });
  //비밀번호까지 맞다면 토큰 생성
  user.generateToken((err, user) => {
    if (err) return res.status(400).send(err);
    //토큰을 쿠키, 로컬스토리지, 어쩌구에 저장한다
    res.cookie("x_auth", user.token) //x_auth 라는 쿠키에 token 넣어줌
      .status(200)
      .json({
        loginSuccess: turn,
        userId: user._id
      })
  });
});
//5000번 포트에서 실행하도록, listen하면 exampel...이 출력됨
app.listen(port, () => console.log(`Example app listening on port ${port}`));