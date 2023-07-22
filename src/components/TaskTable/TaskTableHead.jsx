import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel
} from '@mui/material';

export default function TaskTableHead(props) {
    const {
        order,
        orderBy,
        onRequestSort,
    } = props;

    const headCells = [
        {
            id: 'user',
            label: 'Имя пользователя'
        },
        {
            id: 'email',
            label: 'Email'
        },
        {
            id: 'desc',
            label: 'Текст задачи',
            diasbleSort: true
        },
        {
            id: 'done',
            label: 'Выполнено',
            align: 'center'
        },
        {
            id: 'edited',
            label: 'Изменено админом',
            align: 'center',
            diasbleSort: true
        },
        {
            id: 'change',
            label: 'Изменить',
            align: 'center',
            diasbleSort: true
        }
    ];

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.diasbleSort
                            ? headCell.label
                            : <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
