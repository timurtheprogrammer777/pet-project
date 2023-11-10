import React, { useEffect, useRef, useState } from 'react';
import logoPath from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../utils/AuthApi';
import { validate } from 'react-email-validator';
import Preloader from '../preloader/Preloader';

function Register({ isActiveButton, setIsActiveButton, handleLogin }) {
  const [isPreloader, setIsPreolader] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();

  const [isConflictError, setIsConflictError] = useState(false);
  const [isDefaultError, setIsDefaultError] = useState(false);
  const [success, setSuccess] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUnauthorizedError, setIsUnauthorizedError] = useState(false);
//   const [isInputActive, setIsInputActive] = useState(false);

  const [isInputActivePass, setIsInputActivePass] = useState(false); //input1
  const [isInputActiveEmail, setIsInputActiveEmail] = useState(false); //input 2    
  const [isInputActiveName, setIsInputActiveName] = useState(false); //input 3

    const activeInputFuncPass = () => {
        setIsInputActivePass(true);
    };

    const activeInputFuncEmail = () => {
        setIsInputActiveEmail(true);
    };

    const activeInputFuncName = () => {
        setIsInputActiveName(true);
    };

  const validateName = (name) => {
    return name.length >= 2 && name.length <= 30;
  };

  const validateEmail = (email) => {
    return validate(email);
  };

  const validatePassword = (password) => {
    return password.length >= 2 && password.length <= 30;
  };

  function validationFunction() {
    // activeInputFunc();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setIsNameValid(isNameValid);
    setIsEmailValid(isEmailValid);
    setIsPasswordValid(isPasswordValid);

    setIsActiveButton(isNameValid && isPasswordValid && isEmailValid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsPreolader(true);

    authApi
      .signup({ email: emailRef.current.value, password: passRef.current.value, name: nameRef.current.value })
      .then(() => {
        setIsPreolader(false);
        setSuccess(true);
        authApi
          .signin({ email: emailRef.current.value, password: passRef.current.value })
          .then((data) => {
            if (data.token) {
              handleLogin(data.token);
              setIsPreolader(false);
              navigate("/movies");
            }
          })
          .catch((err) => {
            if (err === "Ошибка 401") {
              setIsUnauthorizedError(true);
              setIsPreolader(false);
            } else {
              setIsDefaultError(true);
              setIsPreolader(false);
            }
          });
      })
      .catch((err) => {
        setSuccess(false);
        if (err === "Ошибка 409") {
          setIsConflictError(true);
          setIsPreolader(false);
        } else {
          setIsDefaultError(true);
          setIsPreolader(false);
        }
        console.log(err);
      });
  }

  return (
    <section className='register'>
      <Link className='logo-link' to='/'><img className='logo logo_register' src={logoPath} alt="лого сайта" /></Link>
      <h2 className='form-title'>Добро пожаловать!</h2>
      <form className='form' action="#" onSubmit={handleSubmit} noValidate>
        <label className='form__label'>Имя</label>
        <input onChange={validationFunction} className='form__input' type="text" required minLength="2" maxLength="30" ref={nameRef} onFocus={activeInputFuncName}/>
        {isInputActiveName && !isNameValid && <p className='error error__name'>Поле "имя" должно содержать от 2 до 30 символов</p>}

        <label className='form__label'>E-mail</label>
        <input onChange={validationFunction} className='form__input' type="email" required ref={emailRef} onFocus={activeInputFuncEmail}/>
        {(isInputActiveEmail && !isEmailValid) && <p className='error error__email'>Поле "email" должно содержать валидный email-адрес</p>}

        <label className='form__label'>Пароль</label>
        <input onChange={validationFunction} className='form__input' type="password" required ref={passRef} onFocus={activeInputFuncPass}/>
        {(isInputActivePass && !isPasswordValid) && <p className='error error__password'>Поле "пароль" должно содержать от 2 до 30 символов</p>}

        {isConflictError ? <p className='error'>Пользователь с таким email уже существует!</p> : ''}
        {isDefaultError ? <p className='error'>При регистрации пользователя произошла ошибка!</p> : ''}

        <button className={isActiveButton ? 'form__button' : 'form__button_profile_active'} type='submit'>Зарегистрироваться</button>
        <div className='form__text-container'>
          <p className='form__description'>Уже зарегистрированы?</p>
          <Link className='form__link' to='/sign-in'>Войти</Link>
        </div>
      </form>
      {isPreloader ? <Preloader /> : ''}
    </section>
  );
}

export default Register;