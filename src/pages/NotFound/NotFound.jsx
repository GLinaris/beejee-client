import { NavLink } from 'react-router-dom';

// project imports
import { HOME } from 'routes/paths';

export default function NotFound() {
    return (
        <>
            <NavLink to={HOME}><h1>Go back to Home</h1></NavLink>
            <h1>Not Found</h1>
        </>
    );
}
