const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Имя" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "Имя" - 2 символа'],
    maxlength: [30, 'Макисмальная длина поля "Имя" - 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Поле "Почта" должно быть заполнено'],
    unique: [true, 'Поле "Почта" должно быть уникальным'],
    validate: {
      validator(v) {
        return /[A-Za-z0-9]+@[A-Za-z0-9]+\.[a-z]{2,}/.test(v);
      },
      message: (props) => `${props.value} некорректный адрес электронной почты!`,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "Пароль" должно быть заполнено'],
    select: false,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
};
