import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex h-12 items-center justify-between bg-black p-4 text-white">
            <Link to="/" className="text-xl font-bold">
                AlkeFlix
            </Link>
            <nav className="">
                <ul className="flex gap-2">
                    <li className="hover:bg-white hover:text-black">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li className="hover:bg-white hover:text-black">
                        <Link to="/listado">Listado</Link>
                    </li>
                    <li className="hover:bg-white hover:text-black">
                        <Link to="/contacto">Contacto</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
