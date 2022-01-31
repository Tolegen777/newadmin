import React from 'react';
import styles from '../assets/styles/auth.module.css';
import LoginPaper from '../components/auth/LoginPaper';

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <LoginPaper />
    </div>
  )
}

export default AuthPage