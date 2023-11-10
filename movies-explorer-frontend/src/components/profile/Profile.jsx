import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext'; 
import Preloader from '../preloader/Preloader';

function Profile({editProfile, isLoggedIn, handleLogout, isConflictError, isDefaultError, isPreloader, setIsPreolader}) {

    const currentUserActual = useContext(CurrentUserContext); 
    const [isProfileButtonActive, setIsProfileButtonActive] = useState(false);
    const [currentUser, setCurrentUser] = useState(currentUserActual);

    const nameInput = useRef();
    const emailInput = useRef();

    const [isInputsActive, setIsInputsActive] = useState(false);
    const [isFormReadyForSubmit, setIsFormReadyForSubmit] = useState(false);


    function makeEditActive() {
        setIsInputsActive(!isInputsActive);
        setIsProfileButtonActive(true);
        setIsFormReadyForSubmit(false);
    }

    function changeButtonCuzOfInputsName(e) {
        setIsFormReadyForSubmit(nameInput.current.value !== currentUser.name);
        setName(e.target.value);
    }

    function changeButtonCuzOfInputsEmail(e) {
        setIsFormReadyForSubmit(emailInput.current.value !== currentUser.email);
        setEmail(e.target.value);
    }

    const [name, setName] = useState(currentUserActual ? currentUserActual.name : '');
    const [email, setEmail] = useState(currentUserActual ? currentUserActual.email : '');

    useEffect(() => {
    if (currentUserActual) {
        setName(currentUserActual.name);
        setEmail(currentUserActual.email);
        }
    }, [currentUserActual, editProfile]);

    function onSubmit(e) {
        e.preventDefault();
        editProfile({name, email});
        setIsPreolader(true);
        setIsProfileButtonActive(false);
        setIsInputsActive(false);
    }

    console.log(isPreloader);

    return(
        <>
            <Header isLoggedIn={isLoggedIn}/>
            <section className="profile">
                <h2 className='form-title form-title_profile'>Привет, {currentUserActual.name}!</h2>
                    <form className='form' action="#" onSubmit={onSubmit} noValidate>
                        <label className='form__label form__label_profile form__label-first'>Имя</label>
                        <input value={name} className={isInputsActive ? 'form__input form__input_profile form__input_profile-active form__input-first' : 'form__input form__input_profile form__input-first'} type="text" ref={nameInput} onChange={changeButtonCuzOfInputsName} minLength='2' maxLength='30'/>
                        <label className='form__label form__label_profile form__label-second'>E-mail</label>
                        <input value={email} className={isInputsActive ? 'form__input form__input_profile form__input_profile-active form__input-second' : 'form__input form__input_profile form__input-second' } type="email"  ref={emailInput} onChange={changeButtonCuzOfInputsEmail} minLength='2' maxLength='30'/>

                        {isConflictError ? <p className='error'>Пользователь с таким email уже существует!</p> : ''}
                        {isDefaultError ? <p className='error'>При обновлении пользователя произошла ошибка!</p> : ''}

                        {isProfileButtonActive ? 
                        isFormReadyForSubmit 
                        ?  
                        <button type='submit' className='form__button form__button_profile form__button_profile_active-save'>сохранить</button>
                        : 
                        <button className='form__button form__button_profile form__button_profile_active'>сохранить</button>
                        :
                        <input className='form__button form__button_profile' type="button" onClick={makeEditActive} value="редактировать" />}

                        <Link className='profile__link' to='/sign-in' onClick={handleLogout }>Выйти из аккаунта</Link>
                    </form>

                    {isPreloader ? <Preloader/> : '' }

            </section>
        </>
    );
}

export default Profile;