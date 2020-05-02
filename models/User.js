const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //스페이스바 없애줌
    unique: 1 //똑같은 이메ㅣㄹ 쓰지 못하게
  },
  password: {
    type: String,
    maxlength: 50
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: { //토큰, 유효성 검증
    type: String
  },
  tokenExp: { //토큰 유효기간
    type: Number
  }
})

//스키마를 모델로 감싸줌
const User = mongoose.model('User', userSchema);
module.exports = {
  User
}