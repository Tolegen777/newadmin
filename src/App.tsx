import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import React from 'react';
import { useTypedSelector } from './store/index'

function App() {
  const { isAuth } = useTypedSelector(state => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      navigate('/app')
    }
  }, [isAuth])

  return (
    <Routes>
      {!isAuth ?
        <Route path={`/auth/*`} element={<AuthPage />} />
        :
        <Route path={`/app/*`} element={<AdminPage />} />
      }
      <Route
        path="*"
        element={<Navigate to='/auth' />}
      />
    </Routes>
  );
}

export default App;
