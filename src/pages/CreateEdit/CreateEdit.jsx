import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
    Button,
    Stack,
    Typography
} from '@mui/material';

// project imports
import { api } from 'actions/api';
import CustomTextField from 'components/CustomTextField/CustomTextField';
import { HOME } from 'routes/paths';

export default function CreateEdit() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    let task;
    let edit;
    if (state) {
        task = state.task;
        edit = state.edit;
    }

    const defValues = {
        user: '',
        email: '',
        desc: ''
    };
    const initialValues = task ?? defValues;

    async function handleCreate() {
        try {
            await api.createTask(
                formik.values.user,
                formik.values.email,
                formik.values.desc
            );
            enqueueSnackbar('Задача создана', { variant: 'success' });
            navigateToHomePage();
        } catch (error) {
            enqueueSnackbar(error.response.data, { variant: 'error' });
        }
    }

    async function handleEdit() {
        try {
            await api.editTask(task.id, formik.values.desc);
            enqueueSnackbar('Текст изменен', { variant: 'success' });
            navigateToHomePage();
        } catch (error) {
            enqueueSnackbar(error.response.data, { variant: 'error' });
        }
    }

    async function handleSave() {
        edit ? handleEdit() : handleCreate();
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            user: Yup.string().required('Имя пользователя обязательно'),
            email: Yup.string().email('Некорректный email').required('Email обязателен'),
            desc: Yup.string().required('Текст задачи обязателен')
        })
    });

    function navigateToHomePage() {
        navigate(HOME);
    }

    return (
        <>
            <Typography variant="h4" >
                {(edit ? 'Изменить' : 'Создать') + ' задачу'}
            </Typography>

            <CustomTextField name="user" label="Имя пользователя" formik={formik} disabled={edit} />
            <CustomTextField name="email" label="Email" formik={formik} disabled={edit} />
            <CustomTextField name="desc" label="Текст задачи" formik={formik} />


            <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Button
                    onClick={handleSave}
                    disabled={!(formik.isValid && formik.dirty)}
                >
                    Сохранить
                </Button>
                <Button onClick={navigateToHomePage}>Вернуться на главную</Button>
            </Stack>
        </>
    );
}
