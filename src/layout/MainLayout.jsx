import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    return (
        <Container style={{ padding: "24px" }}>
            <Outlet />
        </Container>
    );
};
