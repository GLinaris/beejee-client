import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Edit as EditIcon } from '@mui/icons-material';
import {
    Checkbox,
    IconButton,
    TableCell,
    TableRow
} from '@mui/material';

// project imports
import { api } from 'actions/api';
import { setDone } from 'reducers/globalReducer';
import { CREATE_EDIT } from 'routes/paths';

export default function TaskTableRow({ task, isAuth, }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    function handleEdit() {
        navigate(CREATE_EDIT, { state: { edit: true, task } });
    }

    async function handleChange(event) {
        try {
            const done = event.target.checked;
            await api.setTaskDone(task.id, done);
            dispatch(setDone({ id: task.id, done }));
            enqueueSnackbar('Стату успешно изменен', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.response.data, { variant: 'error' });
        }
    }

    return (
        <>
            <TableRow
                hover
                sx={{
                    backgroundColor: 'white',
                }}
            >
                <TableCell>{task.user}</TableCell>
                <TableCell>{task.email}</TableCell>
                <TableCell>{task.desc}</TableCell>
                <TableCell align="center">
                    <Checkbox
                        checked={task.done}
                        onChange={handleChange}
                        disabled={!isAuth}
                    />
                </TableCell>
                <TableCell align="center">{task.edited ? 'Да' : 'Нет'}</TableCell>
                <TableCell align="center">
                    <IconButton
                        onClick={handleEdit}
                        disabled={!isAuth}
                    >
                        <EditIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}
