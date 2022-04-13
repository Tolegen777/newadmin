import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../assets/styles/auth.module.css';
import { login } from '../../store/auth/auth.action';
import { useTypedSelector } from '../../store/index';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useTypedSelector(state => state.auth);

  const formik = useFormik({
    initialValues: {
      email: 'shop@email.com',
      password: '123456'
    },
    onSubmit: async (values) => {
      dispatch(login(values));
    }
  })

  const { values, handleChange, handleSubmit } = formik;
  const { email, password } = values;

  return (
    <div className={styles.formContainer}>
      <Typography
        variant="h4"
        color="primary"
        gutterBottom>
        Добро пожаловать!
      </Typography>
      <Typography
        variant="h5"
        gutterBottom>
        Войдите чтобы продолжить!
      </Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          name="email"
          label="Email"
          variant="standard"
          value={email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="password"
          type="password"
          label="Пароль"
          variant="standard"
          value={password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required />
        <Button
          variant="outlined"
          type="submit"
          fullWidth
          color="primary"
          size="large"
          disabled={isLoading}
        >
          Войти
        </Button>
        {error && <Typography variant="caption" gutterBottom>Возникла ошибка. Попробуйте позже!</Typography>}
      </form>
    </div>

  )
}

export default LoginForm
