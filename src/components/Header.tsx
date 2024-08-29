import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { clearToken } from '../features/auth/authSlice';

const Header = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = token !== null;

    const handleLogout = () => {
        dispatch(clearToken());
        navigate('/');
    };

    return (
        <header className="flex h-14 items-center gap-4 bg-gradient-to-r from-black via-black via-40% to-cyan-800 p-4 text-white">
            <Link to="/" className="text-2xl font-bold">
                AlkeFlix
            </Link>
            <nav className="flex w-full items-center justify-between md:text-xl">
                <ul className="flex gap-2 transition-all duration-300 ease-in-out">
                    <li className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out hover:bg-[length:100%_2px]">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out visited:border-b-2 hover:bg-[length:100%_2px]">
                        <Link to="/movieList">Listado</Link>
                    </li>
                    <li className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-all duration-500 ease-out visited:border-b-2 hover:bg-[length:100%_2px]">
                        <Link to="/favourites">Favoritos</Link>
                    </li>
                </ul>
                {isLogged && <button onClick={handleLogout}>Log Out</button>}
            </nav>
        </header>
    );
};

export default Header;
