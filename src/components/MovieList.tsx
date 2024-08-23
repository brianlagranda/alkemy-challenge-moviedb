import { Navigate } from 'react-router-dom';
import Movie from './Movie';
import { useFetchMovies } from '../hooks/useFetchMovies';

const MovieList = () => {
    const Token = sessionStorage.getItem('token');

    const {
        data: moviesList,
        loading,
        error,
    } = useFetchMovies('discover/movie', 'language=es-ES&page=1');

    if (!Token) return <Navigate to="/" />;

    if (loading) {
        return (
            <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="my-4 grid grid-cols-1 gap-6 p-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {moviesList.length > 0 ? (
                moviesList.map((movie, idx) => (
                    <Movie key={idx} movie={movie} />
                ))
            ) : (
                <div className="col-span-4 my-auto flex h-full items-center justify-center">
                    <span>No se encontraron resultados</span>
                </div>
            )}
        </div>
    );
};

export default MovieList;
