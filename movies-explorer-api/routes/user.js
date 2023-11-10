const userRouter = require('express').Router();
const { getUserInfo, editUserInfo } = require('../controllers/users');
const {editProfileSchemaJoi} = require('../middlewares/joiSchemas/userSchemaJoi');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', editProfileSchemaJoi, editUserInfo);

module.exports = {
  userRouter,
};
