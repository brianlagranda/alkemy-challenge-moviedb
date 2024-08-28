import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Movie from './Movie';
import { useFetchMovies } from '../hooks/useFetchMovies';
import LoadMoreButton from './LoadMoreButton';
import LoadingSpinner from './LoadingSpinner';

const MovieList = () => {
    const [page, setPage] = useState(1);
    const Token = sessionStorage.getItem('token');

    const {
        data: moviesList,
        loading,
        error,
    } = useFetchMovies('discover/movie', 'language=es-ES', page);

    if (!Token) return <Navigate to="/" />;

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex justify-center">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 p-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {moviesList.length > 0 ? (
                moviesList.map((movie, id) => <Movie key={id} movie={movie} />)
            ) : (
                <div className="col-span-4 my-auto flex h-full items-center justify-center">
                    <span>No se encontraron resultados</span>
                </div>
            )}
            <LoadMoreButton
                onClick={() => setPage((prevPage) => prevPage + 1)}
                buttonTitle="Load More"
            />
        </div>
    );
};

export default MovieList;
