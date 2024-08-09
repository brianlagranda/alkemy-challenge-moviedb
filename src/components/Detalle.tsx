import { Navigate } from 'react-router-dom';

const Detalle = () => {
    const Token = sessionStorage.getItem('token');

    return (
        <>
            {!Token && <Navigate to="/" />}
            <h2>Detalle de la película</h2>
        </>
    );
};

export default Detalle;
