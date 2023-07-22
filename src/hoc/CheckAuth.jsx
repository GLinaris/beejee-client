import { useEffect } from 'react';
import { useDispatch } from "react-redux";

// project imports
import { checkAccess, signout } from 'actions/user';

export default function CheckAuth({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAccess());
    }, [dispatch]);

    useEffect(() => {
        const handleInvalidToken = e => {
            if (e.key === 'accessToken' && e.oldValue && !e.newValue) {
                dispatch(signout());
            }
        }
        window.addEventListener('storage', handleInvalidToken)
        return function cleanup() {
            window.removeEventListener('storage', handleInvalidToken)
        }
    }, [dispatch]);

    return children;
}
