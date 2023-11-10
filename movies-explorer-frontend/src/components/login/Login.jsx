import React, { useRef, useState } from "react";
import logoPath from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../utils/AuthApi";
import Preloader from '../preloader/Preloader';
import { validate } from 'react-email-validator';

function Login({handleLogin, isActiveButton, setIsActiveButton}) {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passRef = useRef();

    const [isPreloader, setIsPreolader] = useState(false);
    const [isDefaultError, setIsDefaultError] = useState(false);
    const [isUnauthorizedError, setIsUnauthorizedError] = useState(false);

    const [isEmailValid, setIsEmailValid] = useState(false); //valid1
    const [isPasswordValid, setIsPasswordValid] = useState(false); //valid2

    const [isInputActivePass, setIsInputActivePass] = useState(false); //input1
    const [isInputActiveEmail, setIsInputActiveEmail] = useState(false); //input 2

    const activeInputFuncPass = () => {
        setIsInputActivePass(true);
    };
    
    const activeInputFuncEmail = () => {
        setIsInputActiveEmail(true);
    };

    const validateEmail = (email) => {
        return validate(email);
    };

    const validatePassword = (password) => {
        return password.length >= 2 && password.length <= 30;
    };

    const validationFunction = () => {
        const email = emailRef.current.value;
        const password = passRef.current.value;
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        setIsEmailValid(isEmailValid);
        setIsPasswordValid(isPasswordValid);
        setIsActiveButton(isEmailValid && isPasswordValid);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsPreolader(true);

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
    }
    
    return (
        <section className="login">
            <Link className="logo-link" to="/">
                <img className="logo logo_register" src={logoPath} alt="лого сайта" />
            </Link>
            <h2 className="form-title">Рады видеть!</h2>
            <form className="form" action="#" onSubmit={handleSubmit} noValidate>
                <label className="form__label">E-mail</label>
                <input className="form__input" onFocus={activeInputFuncEmail} onChange={validationFunction} type="email" required ref={emailRef} name="email"/>
                {(isInputActiveEmail && !isEmailValid) && <p className='error error__email-login'>Поле "email" должно содержать валидный email-адрес</p>}

                <label className="form__label">Пароль</label>
                <input className="form__input" onFocus={activeInputFuncPass} onChange={validationFunction} type="password" required ref={passRef} name="password"/>
                {(isInputActivePass && !isPasswordValid) && <p className='error error__password-login'>Поле "пароль" должно содержать от 2 до 30 символов</p>}

                {isUnauthorizedError ? <p className='error'>Вы ввели неправильный логин или пароль!</p> : ''}
                {isDefaultError ? <p className='error'>При авторизации пользователя произошла ошибка!</p> : ''}

                <button className={isActiveButton ? 'form__button' : 'form__button_profile_active' } type='submit'>Войти</button>
                <div className="form__text-container">
                    <p className="form__description">Ещё не зарегистрированы?</p>
                    <Link className="form__link" to="/sign-up">
                        Регистрация
                    </Link>
                </div>
            </form>
            {isPreloader ? <Preloader/> : '' }
        </section>
    );
}

export default Login;