import Movie from './Movie';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';

const Favourites = () => {
    const Token = sessionStorage.getItem('token');
    const favorites = useSelector(
        (state: RootState) => state.favourite.favourites,
    );

    return (
        <>
            {!Token && <Navigate to="/" />}
            <div className="my-4 grid grid-cols-1 gap-6 p-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                    ))
                ) : (
                    <div className="col-span-5 flex h-full items-center justify-center text-2xl">
                        <span>No tienes películas en favoritos</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Favourites;
