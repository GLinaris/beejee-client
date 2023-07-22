import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import { LoadingButton } from '@mui/lab';
import {
    Box,
    Container,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

// project imports
import ShowPassBtn from 'components/ShowPassBtn/ShowPassBtn';

import { signin } from 'actions/user';
import { getIsAuth } from 'reducers/userReducer';
import { HOME } from 'routes/paths';

export default function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = useSelector(getIsAuth);
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const fromPage = location.state?.from?.pathname || HOME;
    let enterDelay = 500;
    let leaveDelay = 10;

    async function handleSubmit({ login, password }) {
        try {
            await dispatch(signin(login, password));
            navigate(fromPage, { replace: true });
        } catch (error) {
            enqueueSnackbar(error.response.data, { variant: 'error' });
        }
    }

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validationSchema: Yup.object({
            login: Yup
                .string()
                .max(255)
                .required('Логин обязателен'),
            password: Yup
                .string()
                .max(255)
                .required('Пароль обязателен')
        }),
        onSubmit: handleSubmit
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (isAuth) return <Navigate to={fromPage} />;
    return (
        <Container maxWidth="sm">
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ my: 3 }}>
                    <Typography
                        color="primary.main"
                        variant="h4"
                    >
                        Вход
                    </Typography>
                </Box>

                <Tooltip title="Введите логин" placement="right" enterDelay={enterDelay} leaveDelay={leaveDelay}>
                    <TextField
                        error={Boolean(formik.touched.login && formik.errors.login)}
                        fullWidth
                        helperText={formik.touched.login && formik.errors.login}
                        label="Логин"
                        margin="normal"
                        name="login"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="login"
                        value={formik.values.login}
                        variant="outlined"
                    />
                </Tooltip>

                <Tooltip title="Введите пароль" placement="right" enterDelay={enterDelay} leaveDelay={leaveDelay}>
                    <TextField
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        fullWidth
                        helperText={formik.touched.password && formik.errors.password}
                        label="Пароль"
                        margin="normal"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        value={formik.values.password}
                        variant="outlined"

                        autoComplete="on"
                        InputProps={{
                            endAdornment: <ShowPassBtn
                                onClick={handleClickShowPassword}
                                showPassword={showPassword}
                            />
                        }}
                    />
                </Tooltip>

                <Box sx={{ py: 2 }}>
                    <LoadingButton
                        loading={formik.isSubmitting}
                        variant="contained"
                        type="submit"

                        color="primary"
                        disabled={!(formik.isValid && formik.dirty)}
                        fullWidth
                        size="large"
                        sx={{ backgroundImage: 'linear-gradient(to right, #33ccff 0%, #80ffff  100%)' }}
                    >
                        Войти
                    </LoadingButton>
                </Box>
            </form>
        </Container>
    );
}
