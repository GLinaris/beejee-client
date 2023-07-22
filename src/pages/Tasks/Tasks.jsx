import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import {
    AddCircle as AddIcon,
    Login as LoginIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import {
    IconButton,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';

// project imports
import { api } from "actions/api";
import { signout } from "actions/user";
import TaskTable from "components/TaskTable/TaskTable";
import { getTasks, setTasks } from "reducers/globalReducer";
import { getIsAuth } from 'reducers/userReducer';
import { CREATE_EDIT, SIGNIN } from "routes/paths";

export default function Tasks() {
    const navigate = useNavigate();
    const isAuth = useSelector(getIsAuth);
    const tasks = useSelector(getTasks);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchTasks() {
            const res = await api.getTasks();
            dispatch(setTasks(res.data));
        }

        fetchTasks();
    }, [dispatch]);

    function handleCreateTask() {
        navigate(CREATE_EDIT);
    }

    function handleLogin() {
        navigate(SIGNIN);
    }

    function handleLogout() {
        dispatch(signout());
    }

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                pb={2}
            >
                <Typography variant="h4" >Задачи</Typography>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                >
                    <Tooltip title="Создать задачу">
                        <IconButton onClick={handleCreateTask}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isAuth ? 'Выйти' : 'Войти'}>
                        <IconButton onClick={isAuth ? handleLogout : handleLogin}>
                            {isAuth ? <LogoutIcon /> : <LoginIcon />}
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>

            <TaskTable tasks={tasks} isAuth={isAuth} />
        </>
    );
}
