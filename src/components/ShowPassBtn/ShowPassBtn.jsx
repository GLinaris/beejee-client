import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function ShowPassBtn(props) {
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <IconButton
            onClick={props.onClick}
            onMouseDown={handleMouseDownPassword}
            edge="end"
        >
            {props.showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
    );
}
