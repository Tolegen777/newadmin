import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/styles/auth.module.css';
import LoginPaper from '../components/auth/LoginPaper';
import { useTypedSelector } from '../store';

import {useDispatch} from "react-redux";




const AuthPage = () => {
  const { isAuth } = useTypedSelector(state => state.auth);
  const navigate = useNavigate();




  React.useEffect(() => {
    if (isAuth) {
      navigate('/app')

    }

  }, [isAuth])
  return (
    <div className={styles.container}>
      <LoginPaper />

    </div>
  )
}

export default AuthPage