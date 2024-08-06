import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className=''>
            <nav className=''>
                <ul className=''>
                    <li className=''>
                        <Link to='/' />
                    </li>
                    <li className=''>
                        <Link to='/listado' />
                    </li>
                    <li className=''>
                        <Link to='/contacto' />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
