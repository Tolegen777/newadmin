import {Navigate, Route, Routes} from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import React from 'react';
import {useTypedSelector} from './store/index'
import {useDispatch} from 'react-redux';
import {refresh} from './store/auth/auth.action';
import {useMediaQuery, useTheme} from "@mui/material";

function App() {
    const {isAuth} = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(refresh())
    }, [])
    return (
        <>
            <Routes>
                <Route path={`/auth/*`} element={<AuthPage/>}/>
                <Route path={`/app/*`} element={isAuth ? <AdminPage/> : <Navigate to="/auth"/>}/>
                <Route
                    path="*"
                    element={<Navigate to='/app'/>}
                />
            </Routes>
        </>


    );
}

export default App;
