import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';

// project imports
import Router from 'routes/Router';

export default function App() {
    return (
        <SnackbarProvider maxSnack={3}>
            <StyledEngineProvider injectFirst>
                <CssBaseline />
                <Router />
            </StyledEngineProvider>
        </SnackbarProvider>
    );
}
