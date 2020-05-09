const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt가 몇글자인가(10은 10자리인 salt만들음)
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //스페이스바 없애줌
    unique: 1, //똑같은 이메ㅣㄹ 쓰지 못하게
  },
  password: {
    type: String,
    maxlength: 50,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    //토큰, 유효성 검증
    type: String,
  },
  tokenExp: {
    //토큰 유효기간
    type: Number,
  },
});

//저장하기 전에 무엇(함수)을 한다는 것
userSchema.pre("save", function (next) {
  var user = this; //userSchema 가르킴
  //pw가 변환될때만 바꿔준다.
  if (user.isModified('password')) {
    //할 동작(비밀번호 암호화)
    //genSalt : salt를 만듦
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) { //hash는 암호화된 비밀번호
        if (err) return next(err)
        user.password = hash
        next()
      });
    });
  } else { //비밀번호가 아닌 다른 것을 바꿀 때
    next(); //들어온 이후 나간다(없으면 이 메서드 내에서 머뭄)
  }
});

//받은 비밀번호와 db 비밀번호 비교하는 메서드 생성
userSchema.method.comparePassword = function (plainPassword, callback) {
  //plainPw와 암호화된 pw비교해야함(bcrypt 사용)
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err), //비밀번호가 틀리면 err 리턴
      callback(null, isMatch) //비밀번호가 맞다면 err는 null, isMatch(true)리턴
  })
}

userSchema.method.generateToken = function (callback) {
  var user = this;
  //jsonwebToken이용해서 토큰 생성
  let token = jwt.sign(user._id, 'secretToken')
  user.token = token;
  user.save(function(err,user){
  })
}


//스키마를 모델로 감싸줌
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};