import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import React from 'react';
import { useTypedSelector } from './redux/store'

function App() {
  const { isAuth } = useTypedSelector(state => state.auth);

  return (
    <Routes>
      {/* {!isAuth ? */}
      <Route path={`/`} element={<AuthPage />} />
      {/* : */}
      <Route path={`/app/*`} element={<AdminPage />} />
      {/* } */}
      {/* <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>Error 404</p>
          </main>
        }

      /> */}
    </Routes>
  );
}

export default App;
