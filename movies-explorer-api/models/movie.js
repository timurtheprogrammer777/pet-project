const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "Директор" должно быть заполнено'],
  },
  duration: {
    type: String,
    required: [true, 'Поле "Длительность" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "Год" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "Описание" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "Ссылка на постер" должно быть заполнено'],
    validate: {
      validator(v) {
        return /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm.test(v);
      },
      message: 'Некоректный URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "Ссылка на трейлер" должно быть заполнено'],
    validate: {
      validator(v) {
        return /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm.test(v);
      },
      message: 'Некоректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "Миниатюрное изображение постера к фильму" должно быть заполнено'],
    validate: {
      validator(v) {
        return /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm.test(v);
      },
      message: 'Некоректный URL',
    },
  },
  owner: {
    type: String,
    required: [true, 'Владелец" должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'id фильма" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "Название фильма на русском языке" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "Название фильма на английском языке" должно быть заполнено'],
  },
  // isSaved: {
  //   type: Array,
  //   required: false,
  //   default: [],
  //   ref: 'user',
  // },

});

const Movie = mongoose.model('movie', movieSchema);

module.exports = {
  Movie,
};
