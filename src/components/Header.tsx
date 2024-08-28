import { Link } from 'react-router-dom';

const Header = () => {
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
                <button onClick={() => sessionStorage.clear()}>Log Out</button>
            </nav>
        </header>
    );
};

export default Header;
